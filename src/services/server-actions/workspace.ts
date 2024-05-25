'use server';

import { Workspace } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import * as z from 'zod';
import { redirect } from 'next/navigation';
import { db } from 'lib/db';
import { freePlan, standardPlan } from 'config/subscriptions';
import { createWorkspaceSchema, updateWorkspaceSchema } from 'validations/workspace';
import { PATH, ROLE_USER_ON_WORKSPACE } from 'config/const';
import { omitFieldNullish } from 'core/helpers';
import { getCurrentUser } from '../../lib/session';
import { ICreateWorkspace, IUpdateWorkspace } from '../../types/workspace';
import { RequiresStandardPlanError } from '../../lib/exceptions';
import { getInfoUserOnWorkspace } from './user';
import { getFavoritePages } from './page';

export const getDetailWorkspace = async (
  domain: Workspace['domain'] = ''
) => {
  const user = await getCurrentUser();
  if (!user || !domain) return;

  const workspace = await db.workspace.findFirst({
    where: { domain },
    select: {
      id: true,
      name: true,
      domain: true,
      pages: {
        where: {
          teamspaceId: null,
          createdBy: user.id,
          deletedAt: null,
        },
        include: {
          favorites: {
            where: {
              userId: user.id,
            },
          },
        },
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

  let totalPages = workspace.pages.length;
  if (!isStandard) {
    // all pages in private + teamspaces
    totalPages = await db.page.count({
      where: {
        workspace: { domain },
        deletedAt: null,
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

  const privatePages = workspace.pages.map((page) => {
    const { favorites,...res } = page;
    return { ...res, isFavorite: favorites && favorites.length > 0 };
  });

  return {
    workspace: {
      ...plan,
      ...workspace,
      isStandard,
      isLimitedPages: !isStandard && totalMembers > 1,
      totalMembers,
      totalPages,
    },
    user: {
      ...user,
      userOnWorkspace,
      privatePages,
      favoritePages,
    },
    track,
  };
};

export const getWorkspacesByUser = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

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

  } catch (error) {
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
};

export const createWorkspace = async (values: ICreateWorkspace) => {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const validatedValues = createWorkspaceSchema.parse(values);

    const isDomainExist = !!await db.workspace.findFirst({
      where: {
        domain: validatedValues.domain,
      },
    });
    if (isDomainExist) return { code: StatusCodes.CONFLICT, message: 'That domain is taken' };

    const newWorkspace = await db.workspace.create({
      data: {
        domain: validatedValues.domain,
        name: validatedValues.name,
        createdBy: user.id,
      },
    });

    await db.userOnWorkspace.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        workspace: {
          connect: { id: newWorkspace.id },
        },
      },
    });

    await db.page.create({
      data: {
        workspaceId: newWorkspace.id,
        createdBy: user.id,
        updatedBy: user.id,
        title: 'Untitled page',
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
    const user = await getCurrentUser();
    if (!user) {
      return { code: StatusCodes.UNAUTHORIZED };
    }

    const validatedValues = updateWorkspaceSchema.parse(values);

    const userRequest = await db.userOnWorkspace.findFirst({
      where: {
        AND: [
          { userId: { equals: user.id } },
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

export const deleteWorkspace = async (workspaceId?: Workspace['id']) => {
  let domain: Workspace['domain'] | undefined;

  try {
    const user = await getCurrentUser();
    if (!user) {
      return { code: StatusCodes.UNAUTHORIZED };
    }
    if (!workspaceId) {
      return { code: StatusCodes.BAD_REQUEST };
    }

    const deleteTracks = db.trackingUserAccessOnWorkspace.deleteMany({
      where: {
        workspaceId,
      },
    });

    const deletePages = db.page.deleteMany({
      where: { workspaceId },
    });

    const deleteWorkspace = db.workspace.delete({
      where: { id: workspaceId },
    });

    await db.$transaction([deleteTracks, deletePages, deleteWorkspace]);

    const userOnWorkspace = await db.userOnWorkspace.findFirst({
      where: { userId: user.id },
      select: {
        workspace: {
          select: { domain: true },
        },
      },
    });
    domain = userOnWorkspace?.workspace.domain;

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }

    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }

  if (domain) {
    redirect(`/${domain}`);
  }
  else {
    redirect(PATH.WORKSPACE);
  }

};
