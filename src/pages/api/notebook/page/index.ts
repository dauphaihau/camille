import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { getUserSubscriptionPlan } from "lib/subscription"
import { RequiresProPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"
import { pagePatchSchema } from "lib/validations/page"

const pageCreateSchema = z.object({
  notebookId: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  if (req.method === "GET") {
    try {
      const { notebookId } = req.query
      const notebook = await db.notebook.findFirst({
        where: {
          id: notebookId.toString(),
        },
        select: {
          id: true,
          title: true,
          description: true,
          pages: true,
          published: true,
          createdAt: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      })

      return res.json(notebook)
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "POST") {
    try {
      const body = pageCreateSchema.parse(req.body)

      console.log('dauphaihau debug: body', body)

      const page = await db.page.create({
        data: {
          title: body.title,
          content: body.content,
          notebookId: body.notebookId,
          // updatedBy: session.user.email,
          // updatedAt: new Date(),
          // deletedBy: session.user.email
        },
        select: {
          id: true,
        },
      })

      return res.json(page)
    } catch (error) {
      console.log('dauphaihau debug: error', error)
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      if (error instanceof RequiresProPlanError) {
        return res.status(402).end()
      }

      return res.status(500).end()
    }
  }
}

export default withMethods(["GET", "POST"], handler)
