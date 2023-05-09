import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'
import { getServerSession } from 'next-auth/next';

import { withMethods } from 'lib/api-middlewares/with-methods'
import { db } from 'lib/db'
import { authOptions } from 'lib/auth';
import { RequiresStandardPlanError } from "lib/exceptions";
import { DELETE_PAGE_TYPE } from "config/const";

const deletePageSchema = z.object({
  pageId: z.string(),
  type: z.nativeEnum(DELETE_PAGE_TYPE),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(403).end()
  }

  // get pages deleted
  if (req.method === "GET") {
    try {
      const workspaceId = req.query.workspaceId as string

      const pagesPrivate = await db.page.findMany({
        where: {
          notebook: { workspaceId, teamspaceId: null },
          deletedAt: { not: null },
          createdBy: session.user.id
        }
      })

      let pagesInTeamspace = await db.page.findMany({
        where: {
          notebook: { workspaceId, teamspaceId: { not: null } },
          deletedAt: { not: null }
        },
        include: {
          notebook: {
            select: {
              title: true,
              teamspace: {
                select: {
                  name: true
                }
              }
            }
          }
        },
      })

      pagesInTeamspace = pagesInTeamspace.map(p => ({
        ...p,
        url: `${p?.notebook?.teamspace?.name} / ${p.notebook.title}`
      }))

      let pages = [...pagesPrivate, ...pagesInTeamspace]
      pages.sort((a, b) => new Date(b.deletedAt as Date).valueOf() - new Date(a.deletedAt as Date).valueOf())

      res.send({ code: '200', pages })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      if (error instanceof RequiresStandardPlanError) {
        return res.status(402).end()
      }

      return res.status(500).end()
    }
  }

  // delete page by status
  if (req.method === 'POST') {
    try {
      const body = deletePageSchema.parse(req.body)

      switch (body.type) {
        case DELETE_PAGE_TYPE.SOFT_DELETE:
          await db.page.update({
            where: {
              id: body.pageId
            },
            data: {
              deletedBy: session.user.id,
              deletedAt: new Date()
            }
          })
          break
        case DELETE_PAGE_TYPE.HARD_DELETE:
          await db.page.delete({
            where: { id: body.pageId },
          })
          break
        case DELETE_PAGE_TYPE.RECOVER:
          await db.page.update({
            where: {
              id: body.pageId
            },
            data: {
              deletedBy: null,
              deletedAt: null
            }
          })
      }

      return res.send({ code: '200', message: 'Delete success' })
    } catch (error) {
      console.log('dauphaihau debug: error', error)
      return res.status(500).end()
    }
  }

}

export default withMethods(['GET', 'POST'], handler)
