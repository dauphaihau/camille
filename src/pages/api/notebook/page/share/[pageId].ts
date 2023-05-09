import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { authOptions } from "lib/auth"

async function handler(req: NextApiRequest, res: NextApiResponse) {

  // get detail page share to web
  if (req.method === "GET") {
    try {
      const { pageId } = req.query
      const page = await db.page.findFirst({
        where: {
          id: pageId as string,
          // shareToWeb: true
        },
      })

      res.send({ code: '200', data: page })
    } catch (error) {
      return res.status(500).end()
    }
  }

  // share page to web
  if (req.method === "PATCH") {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(403).end()
    }

    try {
      const { pageId } = req.query
      const { shareToWeb } = req.body
      await db.page.update({
        where: { id: pageId as string, },
        data: { shareToWeb }
      })

      res.send({ code: '200', message: 'update page successfully' })
    } catch (error) {
      return res.status(500).end()
    }
  }
}

export default withMethods(["GET", "PATCH"], handler)
