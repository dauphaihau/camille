import { cache } from "react";
import { Workspace } from "@prisma/client";
import { db } from "lib/db";

export const getListMembers = cache(async (domain: Workspace["domain"]) => {
  const workspaceExists = await db.workspace.findFirst({
    where: { domain }
  })

  if (workspaceExists) {
    const res = await db.userOnWorkspace.findMany({
      where: {
        workspaceId: workspaceExists.id,
      },
      select: {
        user: true,
        role: true
      },
      orderBy: [
        { role: 'asc' }
      ]
    })
    return JSON.parse(JSON.stringify(res))
  }
})
