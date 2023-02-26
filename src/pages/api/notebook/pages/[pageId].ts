import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"

import { withMethods } from "lib/api-middlewares/with-methods"
import { withPage } from "lib/api-middlewares/with-page"
import { db } from "lib/db"
import { pagePatchSchema } from "lib/validations/page"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {

      console.log('dauphaihau debug: req-query-page-id', req.query.pageId)
      await db.page.delete({
        where: {
          id: req.query.pageId as string,
        },
      })

      return res.status(204).end()
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "PATCH") {
    try {
      console.log('dauphaihau debug: run before')
      const postId = req.query.pageId as string

      const page = await db.page.findUnique({
        where: {
          id: postId,
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
        },
      })

      return res.end()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(422).end()
      // return res.status(500).end()
    }
  }
}

export default withMethods(["DELETE", "PATCH"], withPage(handler))
