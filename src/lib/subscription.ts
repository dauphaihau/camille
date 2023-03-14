import { UserSubscriptionPlan, WorkspaceSubscriptionPlan } from "types"
import { freePlan, proPlan } from "config/subscriptions"
import { db } from "lib/db"

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  }
}

export async function getWorkspaceSubscriptionPlan(
  workspaceId: string
): Promise<WorkspaceSubscriptionPlan> {
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

  // Check if workspace is on a pro plan.
  const isPro =
    workspace.stripePriceId &&
    workspace.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    ...workspace,
    stripeCurrentPeriodEnd: workspace.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  }
}
