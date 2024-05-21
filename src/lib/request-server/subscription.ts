import { Workspace } from '@prisma/client';
import { freePlan, standardPlan } from 'config/subscriptions';
import { db } from 'lib/db';

export async function getWorkspaceSubscriptionPlan(
  params: string | Partial<Workspace>
) {

  const workspace = await db.workspace.findFirst({
    where: typeof params === 'object' ? { domain: params.domain } : { id: params },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeWorkspaceId: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!workspace) return null;

  let isStandard: boolean = false;
  if (workspace?.stripeCurrentPeriodEnd) {
    isStandard = (
      workspace.stripePriceId &&
      workspace.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
    ) as boolean;
  }

  const plan = isStandard ? standardPlan : freePlan;

  return {
    ...plan,
    ...workspace,
    stripeCurrentPeriodEnd: workspace.stripeCurrentPeriodEnd?.getTime(),
    isStandard,
  };
}
