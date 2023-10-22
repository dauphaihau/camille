import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'
import { getServerSession } from 'next-auth/next'

import { db } from 'lib/db'
import { withMethods } from 'lib/api-middlewares/with-methods'
import { authOptions } from 'lib/auth'
import { pagePatchSchema } from "lib/validations/page";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  // get detail notebook + pages
  if (req.method === 'GET') {
    try {
      const { notebookId } = req.query

      const notebook = await db.notebook.findFirst({
        where: {
          id: notebookId && notebookId.toString(),
        },
        select: {
          id: true,
          title: true,
          description: true,
          pages: {
            where: {
              deletedAt: null
            },
            select: {
              id: true,
              title: true,
              updatedAt: true,
              updatedBy: true,
              deletedAt: true,
              notebookId: true,
              content: true,
              createdByUser: {
                select: {
                  email: true
                }
              },
              favorites: {
                where: {
                  userId: session.user.id
                }
              }
              // deletedBy: null,
              // deletedAt: null,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          // published: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return res.json(notebook)
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === 'DELETE') {
    try {
      await db.notebook.delete({
        where: {
          id: req.query.notebookId as string,
        },
      })
      return res.send({ code: '200', message: 'delete notebook success' })
      // return res.status(204).end()
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === 'PATCH') {
    try {
      const notebookId = req.query.notebookId as string

      const page = await db.notebook.findUnique({
        where: { id: notebookId },
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

export default withMethods(['DELETE', 'GET', 'PATCH'], handler)
