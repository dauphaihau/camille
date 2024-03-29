import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"

import { authOptions } from "lib/auth"
import { db } from "lib/db";
import { getWorkspaceSubscriptionPlan } from "../request/subscription";
import { freePlan } from "config/subscriptions";
import { RequiresStandardPlanError } from "lib/exceptions";
import * as z from "zod";

const bodySchema = z.object({
  workspaceId: z.string(),
})

export function withPlan(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(403).end()
    }

    const body = bodySchema.parse(req.body)

    const subscriptionPlan = await getWorkspaceSubscriptionPlan(body.workspaceId)

    if (!subscriptionPlan?.isStandard) {
      const totalMembers = await db.userOnWorkspace.count({
        where: { workspaceId: body.workspaceId }
      })

      if (totalMembers > 1) {
        const total = await db.notebook.count({
          where: { workspace: { id: body.workspaceId } }
        })

        if (total >= freePlan.limitedNotebooks) {
          throw new RequiresStandardPlanError()
        }
      }
    }

    return handler(req, res)
  }
}
