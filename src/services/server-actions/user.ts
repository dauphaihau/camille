'use server';

import { Workspace } from '@prisma/client';
import * as z from 'zod';
import { StatusCodes } from 'http-status-codes';
import { db } from 'lib/db';
import { IUpdateProfile, IUpdateTrackingUser } from 'types/user';
import { getCurrentUser } from '../../lib/session';
import { updateProfileSchema, updateUserTrackingSchema } from '../../validations/user';

export async function getInfoUserOnWorkspace(
  workspaceId?: Workspace['id']
) {
  const user = await getCurrentUser();
  if (!user) return;
  return db.userOnWorkspace.findFirst({
    where: {
      workspaceId,
      userId: user?.id,
    },
    select: {
      user: true,
      role: true,
      workspaceId: true,
    },
  });
}

export async function updateProfile(values: IUpdateProfile) {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const validatedValues = updateProfileSchema.parse(values);

    await db.user.update({
      where: { id: user.id },
      data: validatedValues,
    });

    return { code: StatusCodes.OK };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }

    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
}

export async function getTrackingUserByWorkspace(workspaceId: Workspace['id']) {
  const user = await getCurrentUser();
  if (!user) return;

  const tracking = await db.trackingUserAccessOnWorkspace.findFirst({
    where: {
      AND: [
        { userId: user.id },
        { workspaceId },
      ],
    },
    select: {
      lastAccessPageId: true,
    },
  });
  if (!tracking) return { code: StatusCodes.NOT_FOUND };

  return { code: StatusCodes.OK, data: tracking };
}

export async function updateTracking(values: IUpdateTrackingUser) {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const validatedValues = updateUserTrackingSchema.parse(values);

    if (!validatedValues.lastAccessWorkspaceId) return { code: StatusCodes.BAD_REQUEST };

    await db.user.update({
      where: { id: user.id },
      data: { lastAccessWorkspaceId: validatedValues.lastAccessWorkspaceId },
    });

    const isTrackingUserAccessExist = await db.trackingUserAccessOnWorkspace.findFirst({
      where: {
        AND: [
          { userId: user.id },
          { workspaceId: validatedValues.lastAccessWorkspaceId },
        ],
      },
    });

    if (isTrackingUserAccessExist) {
      await db.trackingUserAccessOnWorkspace.update({
        where: { id: isTrackingUserAccessExist.id },
        data: {
          lastAccessPageId: validatedValues.lastAccessPageId ?? '',
        },
      });
    } else {
      await db.trackingUserAccessOnWorkspace.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          workspace: {
            connect: { id: validatedValues.lastAccessWorkspaceId },
          },
          lastAccessPageId: validatedValues.lastAccessPageId ?? '',
        },
      });
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }

    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
}
