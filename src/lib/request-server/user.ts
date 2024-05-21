import { Workspace } from '@prisma/client';
import { db } from 'lib/db';
import { getCurrentUser } from '../session';

export async function getInfoUserOnWorkspace(
  workspaceId?: Workspace['id']
) {
  const user = await getCurrentUser();

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
