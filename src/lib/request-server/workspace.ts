'use server';

import { Workspace } from '@prisma/client';
import { db } from 'lib/db';
import { freePlan, standardPlan } from 'config/subscriptions';
import { getCurrentUser } from '../session';
import { getInfoUserOnWorkspace } from './user';
import { getFavoritePages } from './page';

export const getDetailWorkspace = async (
  domain: Workspace['domain'] = ''
) => {

  const user = await getCurrentUser();
  if (!domain || !user?.id) return;

  const workspace = await db.workspace.findFirst({
    where: { domain },
    select: {
      id: true,
      name: true,
      domain: true,
      notebooks: {
        where: { teamspaceId: null, createdBy: user.id },
      },
      teamspaces: {
        where: { archivedAt: null },
      },
      userOnWorkspace: true,
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeWorkspaceId: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!workspace) return;

  let isStandard: boolean = false;
  if (workspace?.stripeCurrentPeriodEnd) {
    isStandard = (
      workspace.stripePriceId &&
      workspace.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
    ) as boolean;
  }

  let totalNotebooks = workspace.notebooks.length;
  if (!isStandard) {
    // all notebooks in private + teamspaces
    totalNotebooks = await db.notebook.count({
      where: {
        workspace: { domain },
      },
    });
  }

  const plan = isStandard ? standardPlan : freePlan;
  const totalMembers = workspace.userOnWorkspace.length;

  const userOnWorkspace = await getInfoUserOnWorkspace(workspace.id);
  const favoritePages = await getFavoritePages(workspace.id);

  const track = await db.trackingUserAccessOnWorkspace.findFirst({
    where: {
      AND: [
        { userId: user.id },
        { workspaceId: workspace.id },
      ],
    },
  });

  return {
    workspace: {
      ...plan,
      ...workspace,
      isStandard,
      totalMembers,
      totalNotebooks,
    },
    user: {
      ...user,
      userOnWorkspace,
      privateNotebooks: workspace?.notebooks,
      favoritePages,
    },
    track,
  };
};

export const getWorkspacesByUser = async () => {

  const user = await getCurrentUser();
  const workspaces = await db.workspace.findMany({
    where: {
      userOnWorkspace: {
        some: {
          user: { id: user?.id },
        },
      },
    },
    include: {
      _count: {
        select: {
          userOnWorkspace: true,
        },
      },
    },
  });

  const workspacesMapped = workspaces.map((w) => ({
    name: w.name,
    domain: w.domain,
    id: w.id,
    isStandard: w.stripePriceId &&
      w.stripeCurrentPeriodEnd &&
      w.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now(),
    totalMembers: w._count.userOnWorkspace,
  }));
  return { workspaces: workspacesMapped };
};
