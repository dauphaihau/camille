import { TrackingUserAccess } from "@prisma/client";
import { db } from "lib/db";

export async function getTrackingUserAccess(
  workspaceId: string, userId
): Promise<TrackingUserAccess> {
  const data = await db.trackingUserAccess.findFirstOrThrow({
    where: {
      AND: [
        { userId },
        { lastAccessWorkspaceId: workspaceId },
      ]
    }
  })
  return JSON.parse(JSON.stringify(data))
}
