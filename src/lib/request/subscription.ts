import { WorkspaceSubscriptionPlan } from "types"
import { freePlan, standardPlan } from "config/subscriptions"
import { db } from "lib/db"
import { Workspace } from "@prisma/client";

export async function getWorkspaceSubscriptionPlan(
  params: string | Partial<Workspace>
): Promise<WorkspaceSubscriptionPlan | null> {

  const workspace = await db.workspace.findFirst({
    where: typeof params === 'object' ? { domain: params.domain } : { id: params },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeWorkspaceId: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!workspace) return null

  let isStandard
  if (workspace?.stripeCurrentPeriodEnd) {
    isStandard = workspace.stripePriceId && workspace.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
  }

  const plan = isStandard ? standardPlan : freePlan

  return {
    ...plan,
    ...workspace,
    // @ts-ignore
    stripeCurrentPeriodEnd: workspace.stripeCurrentPeriodEnd?.getTime(),
    isStandard
  }
}
