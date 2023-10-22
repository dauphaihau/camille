import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'
import { getServerSession } from 'next-auth/next'

import { db } from 'lib/db'
import { withMethods } from 'lib/api-middlewares/with-methods'
import { getWorkspaceSubscriptionPlan } from 'lib/request/subscription'
import { RequiresStandardPlanError } from 'lib/exceptions'
import { authOptions } from 'lib/auth'
import { withNotebook } from "lib/api-middlewares/with-notebook";
import { pagePatchSchema } from "../../../lib/validations/page";
import { ARCHIVED_TEAMSPACE, DELETE_PAGE_TYPE } from "../../../config/const";

const notebookCreateSchema = z.object({
  workspaceId: z.string(),
  // domain: z.string(),
  title: z.string(),
  description: z.string().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  if (req.method === 'GET') {
    try {
      const { teamspaceId } = req.query

      const notebooks = await db.teamspace.findFirst({
        where: {
          id: teamspaceId as string,
        },
        select: {
          notebooks: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return res.json(notebooks)
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === 'POST') {
    try {
      const body = notebookCreateSchema.parse(req.body)
      const subscriptionPlan = await getWorkspaceSubscriptionPlan(body.workspaceId)

      // if (!subscriptionPlan?.isPro) {
      //   const count = await db.notebook.count({
      //     where: { workspaceId: body.workspaceId }
      //   })
      //
      //   if (count >= 3) {
      //     throw new RequiresProPlanError()
      //   }
      // }

      const notebook = await db.notebook.create({
        data: {
          workspaceId: body.workspaceId,
          title: body.title,
          description: body.description as string,
        },
        select: {
          id: true,
        },
      })

      return res.json(notebook)
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

  if (req.method === 'DELETE') {
    try {
      const { status } = req.body

      switch (status) {
        case ARCHIVED_TEAMSPACE.SOFT_DELETE:
          const teamspace = await db.teamspace.update({
            where: { id: req.query.teamspaceId as string },
            data: {
              // deletedBy: session.user.email,
              archivedAt: new Date()
            },
            select: { name: true }
          })
          return res.json({ code: '200', message: `Archived ${teamspace.name}` })
        case ARCHIVED_TEAMSPACE.HARD_DELETE:
          await db.teamspace.delete({
            where: {
              id: req.query.teamspaceId as string,
            },
          })
          break
        case ARCHIVED_TEAMSPACE.RECOVER:
          await db.teamspace.update({
            where: {
              id: req.query.teamspaceId as string,
            },
            data: {
              // deletedBy: null,
              archivedAt: null
            }
          })
      }

      res.end()
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === 'PATCH') {
    try {
      const teamspaceId = req.query.teamspaceId as string

      const page = await db.notebook.findUnique({
        where: { id: teamspaceId },
      })

      const body = pagePatchSchema.parse(req.body)

      // TODO: Implement sanitization for content.

      if (!page) return

      await db.page.update({
        where: {
          id: page.id,
        },
        data: {
          title: body.title || page.title,
          content: body.content,
          // updatedBy: session.user.id
          updatedBy: session.user.email
        },
      })

      return res.send({ code: '200', message: 'update page success' })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(422).end()
      // return res.status(500).end()
    }
  }
}

export default withMethods(['DELETE', 'GET', 'POST', 'PATCH'], handler)
// export default withMethods(['DELETE', 'GET', 'POST', 'PATCH'], withNotebook(handler))
