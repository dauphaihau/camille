import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'
import { getServerSession } from 'next-auth/next'

import { db } from 'lib/db'
import { withMethods } from 'lib/api-middlewares/with-methods'
import { getUserSubscriptionPlan, getWorkspaceSubscriptionPlan } from 'lib/subscription'
import { RequiresProPlanError } from 'lib/exceptions'
import { authOptions } from 'lib/auth'
import { pagePatchSchema } from 'lib/validations/page'

const notebookCreateSchema = z.object({
  workspaceId: z.string(),
  // domain: z.string(),
  title: z.string(),
  description: z.string().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  const { user } = session

  if (req.method === 'GET') {
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
          pages: {
            where: {
              deletedAt: null
            }
          },
          // pages: true,
          published: true,
          createdAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      })

      return res.json(notebook)
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === 'POST') {
    try {
      const body = notebookCreateSchema.parse(req.body)
      const subscriptionPlan = await getWorkspaceSubscriptionPlan(body.workspaceId)

      if (!subscriptionPlan?.isPro) {
        const count = await db.notebook.count({
          where: { workspaceId: body.workspaceId }
        })

        if (count >= 3) {
          throw new RequiresProPlanError()
        }
      }

      const notebook = await db.notebook.create({
        data: {
          workspaceId: body.workspaceId,
          title: body.title,
          description: body.description,
        },
        select: {
          id: true,
        },
      })

      return res.json(notebook)
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

  if (req.method === 'DELETE') {
    try {
      await db.notebook.delete({
        where: {
          id: req.query.notebookId as string,
        },
      })
      return res.status(204).end()
    } catch (error) {
      return res.status(500).end()
    }
  }
}

export default withMethods(['DELETE', 'GET', 'POST'], handler)
