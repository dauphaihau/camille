import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "lib/auth"
import { db } from "lib/db"

export const schema = z.object({
  pageId: z.string(),
})

export function withPage(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      console.log('dauphaihau debug: req-query', req.query)
      const query = await schema.parse(req.query)

      // Check if the user has access to this page.
      // const session = await unstable_getServerSession(req, res, authOptions)
      const count = await db.page.count({
        where: {
          id: query.pageId,
          // authorId: session.user.id,
        },
      })

      if (count < 1) {
        return res.status(403).end()
      }

      return handler(req, res)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(500).end()
    }
  }
}
