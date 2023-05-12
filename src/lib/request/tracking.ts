import { TrackingUserAccessOnWorkspace } from "@prisma/client";
import { db } from "lib/db";

export async function getTrackingUserAccess(
  workspaceId: string, userId
): Promise<TrackingUserAccessOnWorkspace> {
  const data = await db.trackingUserAccessOnWorkspace.findFirst({
    where: {
      AND: [
        { userId },
        { workspaceId },
      ]
    }
  })
  return JSON.parse(JSON.stringify(data))
}
