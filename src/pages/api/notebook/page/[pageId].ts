import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'
import { getServerSession } from 'next-auth/next';

import { withMethods } from 'lib/api-middlewares/with-methods'
import { db } from 'lib/db'
import { pagePatchSchema } from 'lib/validations/page'
import { authOptions } from 'lib/auth';
import { DELETE_PAGE_TYPE } from "config/const";

async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  // get detail page
  if (req.method === 'GET') {
    try {
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

  // update delete status page
  if (req.method === 'DELETE') {
    try {
      // const { type } = JSON.parse(req.body)
      const { type } = req.body

      switch (type) {
        case DELETE_PAGE_TYPE.SOFT_DELETE:
          await db.page.update({
            where: {
              id: req.query.pageId as string,
            },
            data: {
              deletedBy: session.user.id,
              deletedAt: new Date()
            }
          })
          break
        case DELETE_PAGE_TYPE.HARD_DELETE:
          await db.page.delete({
            where: {
              id: req.query.pageId as string,
            },
          })
          break
        case DELETE_PAGE_TYPE.RECOVER:
          await db.page.update({
            where: {
              id: req.query.pageId as string,
            },
            data: {
              deletedBy: null,
              deletedAt: null
            }
          })
      }

      return res.send({ code: '200', message: 'Delete success' })

      // return res.status(204).end()
    } catch (error) {
      return res.status(500).end()
    }
  }

  // update title, content page
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

      if (!page) return

      await db.page.update({
        where: {
          id: page.id,
        },
        data: {
          title: body.title || page.title,
          content: body.content,
          updatedBy: session.user.id
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

export default withMethods(['GET', 'DELETE', 'PATCH'], handler)
