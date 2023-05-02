import { TrackingUserAccessOnWorkspace } from "@prisma/client";
import { db } from "lib/db";

export async function getTrackingUserAccess(
  workspaceId: string, userId
): Promise<TrackingUserAccessOnWorkspace> {
  // const data = await db.trackingUserAccessOnWorkspace.findFirstOrThrow({
  const data = await db.trackingUserAccessOnWorkspace.findFirst({
    where: {
      AND: [
        { userId },
        { workspaceId },
        // { lastAccessWorkspaceId: workspaceId },
      ]
    }
  })
  return JSON.parse(JSON.stringify(data))
}
