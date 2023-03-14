import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { getUserSubscriptionPlan } from "lib/subscription"
import { RequiresProPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"
import { pagePatchSchema } from "lib/validations/page"
import { parseAndGenerateServices } from "@typescript-eslint/typescript-estree";

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
      const { workspaceId } = req.query

      const workspace = await db.workspace.findFirst({
        where: {
          id: workspaceId as string
        },
        select: {
          notebooks: {
            select: {
              id: true
            }
          }
        }
      })

      const pages = await db.page.findMany({
        where: {
          notebookId: {
            in: workspace.notebooks.map((x) => x.id),
          },
          deletedAt: {
            not: null
          }
        },
        orderBy: {
          deletedAt: 'desc'
        }
      })

      console.log('dauphaihau debug: pages', pages)
      // return res.json(pages)
      res.send({code: '200', data: pages})
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
