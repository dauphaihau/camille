import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { RequiresStandardPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"

const pageCreateSchema = z.object({
  notebookId: z.string(),
  title: z.string().optional(),
  content: z.any().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  // get detail detail notebook + pages, where usage ???
  if (req.method === "GET") {
    try {
      const { notebookId } = req.query
      const notebook = await db.notebook.findFirst({
        where: {
          id: notebookId as string,
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

  // create page
  if (req.method === "POST") {
    try {
      const body = pageCreateSchema.parse(req.body)
      const page = await db.page.create({
        data: {
          title: body.title as string,
          content: body.content,
          notebookId: body.notebookId,
          updatedBy: session.user.id,
          createdBy: session.user.id,
        },
        select: {
          id: true,
        },
      })

      return res.send({
        code: '200', message: 'create page success', data: {
          pageId: page.id
        }
      })
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
}

export default withMethods(["GET", "POST"], handler)
