'use server';

import { Workspace } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { StatusCodes } from 'http-status-codes';
import * as z from 'zod';
import { db } from 'lib/db';
import { freePlan, standardPlan } from 'config/subscriptions';
import { createWorkspaceSchema, updateWorkspaceSchema } from 'lib/validations/workspace';
import { ROLE_USER_ON_WORKSPACE } from 'config/const';
import { omitFieldNullish } from 'core/helpers';
import { getCurrentUser } from '../session';
import { authOptions } from '../auth';
import { ICreateWorkspace, IUpdateWorkspace } from '../../types/workspace';
import { RequiresStandardPlanError } from '../exceptions';
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

export const createWorkspace = async (values: ICreateWorkspace) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw Error('Oops');
    }

    const validatedValues = createWorkspaceSchema.parse(values);

    const isDomainExist = !!await db.workspace.findFirst({
      where: {
        domain: validatedValues.domain,
      },
    });

    if (isDomainExist) {
      return { code: StatusCodes.CONFLICT, message: 'That domain is taken' };
    }

    const newWorkspace = await db.workspace.create({
      data: {
        domain: validatedValues.domain,
        name: validatedValues.name,
        createdBy: session.user.id,
      },
    });

    await db.userOnWorkspace.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        workspace: {
          connect: { id: newWorkspace.id },
        },
      },
    });

    await db.notebook.create({
      data: {
        workspaceId: newWorkspace.id,
        createdBy: session.user.id,
        title: 'Untitled notebook',
      },
    });

    return { code: StatusCodes.CREATED };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
};

export const updateWorkspace = async (values: IUpdateWorkspace) => {
  try {

    const session = await getServerSession(authOptions);
    if (!session) {
      throw Error('Oops');
    }

    const validatedValues = updateWorkspaceSchema.parse(values);

    const userRequest = await db.userOnWorkspace.findFirst({
      where: {
        AND: [
          { userId: { equals: session.user.id } },
          { workspaceId: { equals: validatedValues.workspaceId } },
        ],
      },
    });

    if (!userRequest || userRequest.role === ROLE_USER_ON_WORKSPACE.MEMBER) {
      return {
        code: StatusCodes.FORBIDDEN,
        message: 'You don\'t have permission to perform this action',
      };
    }

    if (validatedValues?.domain) {
      const domainExist = !!await db.workspace.findFirst({
        where: {
          domain: validatedValues.domain,
        },
      });

      if (domainExist) {
        return {
          code: StatusCodes.CONFLICT,
          message: 'That domain is taken',
        };
      }
    }

    await db.workspace.update({
      where: { id: validatedValues.workspaceId },
      data: omitFieldNullish({
        name: validatedValues?.name,
        domain: validatedValues?.domain?.toLowerCase(),
      }),
    });

    return { code: StatusCodes.OK };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // return res.status(422).json(error.issues);
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }

    if (error instanceof RequiresStandardPlanError) {
      return { code: StatusCodes.PAYMENT_REQUIRED };
    }

    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }

};
