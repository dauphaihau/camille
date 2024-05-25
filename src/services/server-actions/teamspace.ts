'use server';

import { StatusCodes } from 'http-status-codes';
import * as z from 'zod';
import { Teamspace } from '@prisma/client';
import { ICreateTeamspace } from 'types/teamspace';
import { getCurrentUser } from '../../lib/session';
import { db } from '../../lib/db';
import { createTeamspaceSchema } from '../../validations/teamspace';

export async function createTeamspace(values: ICreateTeamspace) {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const validatedValues = createTeamspaceSchema.parse(values);

    await db.teamspace.create({
      data: {
        workspaceId: validatedValues.workspaceId,
        name: validatedValues.name,
        createdBy: user.email as string,
        description: validatedValues.description ?? '',
      },
    });
    return { code: StatusCodes.CREATED };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
}

export async function archiveTeamspace(teamspaceId: Teamspace['id']) {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const deletePages = db.page.deleteMany({
      where: { teamspaceId },
    });

    const deleteTeamspace = db.teamspace.delete({
      where: {
        id: teamspaceId,
      },
    });

    await db.$transaction([deletePages, deleteTeamspace]);

    // switch (validatedValues.status) {
    //   case ARCHIVED_TEAMSPACE.SOFT_DELETE: {
    //     const teamspace = await db.teamspace.update({
    //       where: { id: validatedValues.teamspaceId },
    //       data: {
    //         // deletedBy: session.user.email,
    //         archivedAt: new Date(),
    //       },
    //       select: { name: true },
    //     });
    //     return { code: StatusCodes.OK, message: `Archived ${teamspace.name}` };
    //   }
    //   case ARCHIVED_TEAMSPACE.HARD_DELETE:
    //     await db.teamspace.delete({
    //       where: {
    //         id: validatedValues.teamspaceId,
    //       },
    //     });
    //     break;
    //   case ARCHIVED_TEAMSPACE.RECOVER:
    //     await db.teamspace.update({
    //       where: {
    //         id: validatedValues.teamspaceId,
    //       },
    //       data: {
    //         // deletedBy: null,
    //         archivedAt: null,
    //       },
    //     });
    // }

    return { code: StatusCodes.OK };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
}
