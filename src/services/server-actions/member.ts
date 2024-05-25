'use server';

import { Workspace } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import * as z from 'zod';
import { db } from 'lib/db';
import { IAddMember, IDeleteMember, IUpdateRoleMember } from 'types/member';
import { getCurrentUser } from '../../lib/session';
import { addMemberSchema, deleteMemberSchema, updateRoleMemberSchema } from '../../validations/member';
import { ROLE_USER_ON_WORKSPACE } from '../../config/const';
import { getWorkspaceSubscriptionPlan } from './subscription';

export const addMember = async (values: IAddMember) => {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const validatedValues = addMemberSchema.parse(values);

    const isUserExist = !!await db.user.findFirst({
      where: { email: validatedValues.email },
    });
    if (!isUserExist) {
      return { code: StatusCodes.NOT_FOUND, message: `User ${validatedValues.email} doesn't exist` };
    }

    const isUserAlreadyInWs = !!await db.userOnWorkspace.findFirst({
      where: {
        workspaceId: validatedValues.workspaceId,
        user: { email: validatedValues.email },
      },
    });
    if (isUserAlreadyInWs) {
      return { code: StatusCodes.CONFLICT, message: `Already an existing user ${validatedValues.email}` };
    }
    if (!validatedValues.email) return { code: StatusCodes.BAD_REQUEST };

    const plan = await getWorkspaceSubscriptionPlan(validatedValues.workspaceId);
    await db.userOnWorkspace.create({
      data: {
        workspace: {
          connect: { id: validatedValues.workspaceId },
        },
        user: {
          connect: { email: validatedValues.email },
        },
        role: plan?.isStandard ? ROLE_USER_ON_WORKSPACE.MEMBER : ROLE_USER_ON_WORKSPACE.ADMIN,
      },
    });

    // create teamspace ( origin ) -> add new member into teamspace ( origin )
    const teamspace = !!await db.teamspace.findFirst({
      where: {
        workspaceId: validatedValues.workspaceId,
      },
    });
    if (!teamspace) {
      const teamspaceOrigin = await db.teamspace.create({
        data: {
          workspaceId: validatedValues.workspaceId,
          name: 'General',
          description: '',
          isOrigin: true,
          createdBy: user.id,
        },
      });
      if (!teamspaceOrigin) return { code: StatusCodes.INTERNAL_SERVER_ERROR };

      await db.page.create({
        data: {
          workspaceId: validatedValues.workspaceId,
          teamspaceId: teamspaceOrigin.id,
          title: 'Teamspace Home',
          createdBy: user.id,
          updatedBy: user.id,
        },
      });

      await db.userOnTeamspace.create({
        data: {
          user: {
            connect: { email: validatedValues.email },
          },
          teamspace: {
            connect: { id: teamspaceOrigin.id },
          },
        },
      });
    }
    return { code: StatusCodes.CREATED };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
};

export const updateRoleMember = async (values: IUpdateRoleMember) => {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const validatedValues = updateRoleMemberSchema.parse(values);

    const record = await db.userOnWorkspace.findFirst({
      where: {
        AND: [
          { userId: { equals: validatedValues.userId } },
          { workspaceId: { equals: validatedValues.workspaceId } },
        ],
      },
    });
    if (!record) return { code: StatusCodes.NOT_FOUND };

    await db.userOnWorkspace.update({
      where: { id: record.id },
      data: { role: validatedValues.role },
    });

    return { code: StatusCodes.OK };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }

    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }

};

export const deleteMember = async (values: IDeleteMember) => {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const validatedValues = deleteMemberSchema.parse(values);

    const record = await db.userOnWorkspace.findFirst({
      where: {
        AND: [
          { userId: { equals: validatedValues.userId } },
          { workspaceId: { equals: validatedValues.workspaceId } },
        ],
      },
    });
    if (!record) return { code: StatusCodes.NOT_FOUND };
    console.log('record', record);

    if (record) {
      await db.userOnWorkspace.delete({
        where: { id: record.id },
      });
    }

    await db.userOnTeamspace.deleteMany({
      where: {
        AND: [
          { userId: { equals: validatedValues.userId } },
          {
            teamspace: {
              workspaceId: {
                equals: validatedValues.workspaceId,
              },
            },
          },
        ],
      },
    });

    return { code: StatusCodes.NO_CONTENT };

  } catch (error) {
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
};

export const leaveWorkspace = async (workspaceId?: Workspace['id']) => {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    if (!workspaceId) return { code: StatusCodes.BAD_REQUEST };

    const userOnWs = await db.userOnWorkspace.findFirst({
      where: {
        AND: [
          { userId: { equals: user.id } },
          { workspaceId: { equals: workspaceId } },
        ],
      },
    });

    if (userOnWs) {
      await db.userOnWorkspace.delete({
        where: { id: userOnWs.id },
      });
    }

    await db.userOnTeamspace.deleteMany({
      where: {
        AND: [
          { userId: { equals: user.id } },
          {
            teamspace: {
              workspaceId: {
                equals: workspaceId,
              },
            },
          },
        ],
      },
    });

    const totalUsers = await db.userOnWorkspace.findMany({
      where: { workspaceId, userId: { not: user.id } },
      select: {
        id: true, userId: true, createdAt: true, role: true,
      },
    });

    // grant admin rights to last user
    if (totalUsers.length === 1) {
      const userOnWorkspace = totalUsers[0];
      await db.userOnWorkspace.update({
        where: { id: userOnWorkspace.id },
        data: { role: ROLE_USER_ON_WORKSPACE.ADMIN },
      });
    }

    if (totalUsers.length > 1) {
      const isStillHaveAdmin = totalUsers.some((o) => o.role === ROLE_USER_ON_WORKSPACE.ADMIN);

      // grant admin rights to last user by createdAt
      if (!isStillHaveAdmin) {
        await db.userOnWorkspace.update({
          where: { id: totalUsers[0].id },
          data: { role: ROLE_USER_ON_WORKSPACE.ADMIN },
        });
      }
    }

    // get domain to redirect another workspace when user leave
    const workspace = await db.userOnWorkspace.findFirst({
      where: { userId: user.id },
      select: { workspace: { select: { domain: true } } },
    });

    return {
      code: StatusCodes.OK,
      data: workspace,
      // redirectToDomain: workspace && workspace.domain
    };

  } catch (error) {
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
};

// const isAdmin = async (workspaceId: Workspace['id']) => {
//   try {
//     const user = await getCurrentUser();
//     if (!user) return { code: StatusCodes.UNAUTHORIZED };
//
//     const userRequest = await db.userOnWorkspace.findFirst({
//       where: {
//         AND: [
//           { userId: { equals: user.id } },
//           { workspaceId: { equals: workspaceId } },
//         ],
//       },
//     });
//
//     if (!userRequest || userRequest.role === ROLE_USER_ON_WORKSPACE.MEMBER) {
//       return {
//         code: StatusCodes.FORBIDDEN,
//         message: 'You don\'t have permission to perform this action',
//       };
//     }
//   } catch (error) {
//     return { code: StatusCodes.INTERNAL_SERVER_ERROR };
//   }
// };
