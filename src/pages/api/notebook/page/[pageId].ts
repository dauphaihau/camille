import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'

import { withMethods } from 'lib/api-middlewares/with-methods'
import { withPage } from 'lib/api-middlewares/with-page'
import { db } from 'lib/db'
import { pagePatchSchema } from 'lib/validations/page'
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  if (req.method === 'GET') {
    try {
      // const { notebookId } = req.query

      const page = await db.page.findFirst({
        where: {
          id: req.query.pageId as string,
        },
      })

      return res.json(page)
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { type } = JSON.parse(req.body)

      switch (type) {
        case 0:
          await db.page.update({
            where: {
              id: req.query.pageId as string,
            },
            data: {
              // deletedBy: session.user.email,
              deletedAt: new Date()
            }
          })
          break
        case 1:
          await db.page.delete({
            where: {
              id: req.query.pageId as string,
            },
          })
          break
        case 2:
          await db.page.update({
            where: {
              id: req.query.pageId as string,
            },
            data: {
              // deletedBy: session.user.email,
              deletedAt: null
            }
          })
      }

      return res.status(204).end()
    } catch (error) {
      console.log('dauphaihau debug: error', error)
      return res.status(500).end()
    }
  }

  if (req.method === 'PATCH') {
    try {
      const pageId = req.query.pageId as string

      const page = await db.page.findUnique({
        where: {
          id: pageId,
        },
      })

      const body = pagePatchSchema.parse(req.body)

      // TODO: Implement sanitization for content.

      await db.page.update({
        where: {
          id: page.id,
        },
        data: {
          title: body.title || page.title,
          content: body.content,
          // updatedBy: session.user.email
        },
      })

      return res.end()
    } catch (error) {
      console.log('dauphaihau debug: error', error)
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(422).end()
      // return res.status(500).end()
    }
  }
}

export default withMethods(['GET', 'DELETE', 'PATCH'], withPage(handler))
