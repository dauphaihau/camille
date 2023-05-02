import { WorkspaceSubscriptionPlan } from "types"
import { freePlan, standardPlan } from "config/subscriptions"
import { db } from "lib/db"

export async function getWorkspaceSubscriptionPlan(
  workspaceId: string
): Promise<WorkspaceSubscriptionPlan | null> {
  const workspace = await db.workspace.findFirst({
    where: {
      id: workspaceId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeWorkspaceId: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })
  // if (!workspace || !workspace?.stripeCurrentPeriodEnd) {
  //   return null
  // }

  if (!workspace) {
    return null
  }

  // Check if workspace is on a pro plan.
  // const isPro =
  //   workspace.stripePriceId &&
  //   workspace.stripeCurrentPeriodEnd && workspace.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

  let isStandard
  if (workspace?.stripeCurrentPeriodEnd) {
    isStandard = workspace.stripePriceId && workspace.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
  }

  const plan = isStandard ? standardPlan : freePlan
  // const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    ...workspace,
    stripeCurrentPeriodEnd: workspace.stripeCurrentPeriodEnd?.getTime(),
    // isPro,
    isStandard
  }
}
