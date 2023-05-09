import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'
import { getServerSession } from 'next-auth/next';

import { withMethods } from 'lib/api-middlewares/with-methods'
import { db } from 'lib/db'
import { pagePatchSchema } from 'lib/validations/page'
import { authOptions } from 'lib/auth';

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

export default withMethods(['GET', 'PATCH'], handler)
