import { User } from '@prisma/client';
import { db } from 'lib/db';

export async function getTrackingUserAccess(
  workspaceId: string,
  userId: User['id']
) {
  const data = await db.trackingUserAccessOnWorkspace.findFirst({
    where: {
      AND: [
        { userId },
        { workspaceId },
      ],
    },
  });
  return JSON.parse(JSON.stringify(data)) as typeof data;
}
