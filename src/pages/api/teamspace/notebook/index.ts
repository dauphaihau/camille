import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { getWorkspaceSubscriptionPlan } from "lib/request/subscription"
import { RequiresStandardPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"
import { pagePatchSchema } from "lib/validations/page"
import { freePlan } from "../../../../config/subscriptions";

const notebookCreateSchema = z.object({
  workspaceId: z.string(),
  teamspaceId: z.string(),
  title: z.string(),
  description: z.string().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  const { user } = session

  if (req.method === "GET") {
    try {
      const notebooks = await db.notebook.findMany({
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
        },
        where: {
          authorId: user.id,
        },
      })

      return res.json(notebooks)
    } catch (error) {
      return res.status(500).end()
    }
  }



  if (req.method === "POST") {
    try {
      const body = notebookCreateSchema.parse(req.body)
      const subscriptionPlan = await getWorkspaceSubscriptionPlan(body.workspaceId)

      if (!subscriptionPlan?.isStandard) {
        const count = await db.notebook.count({
          where: { workspaceId: body.workspaceId, teamspaceId: { not: null } },
        })
        if (count >= freePlan.limitedNotebooks) {
          throw new RequiresStandardPlanError()
        }
      }

      await db.notebook.create({
        data: {
          workspaceId: body.workspaceId,
          teamspaceId: body.teamspaceId,
          title: body.title,
          // description: body.description,
        },
      })
      return res.send({ code: '200', message: 'create notebook success' })
    } catch (error) {
      console.log('dauphaihau debug: error', error)
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      if (error instanceof RequiresStandardPlanError) {
        return res.status(402).send({
          code: '402', message: 'This action requires a standard plan'
        })
        // return res.status(402).end()
      }
      return res.status(500).end()
    }
  }
}

export default withMethods(["GET", "POST"], handler)
