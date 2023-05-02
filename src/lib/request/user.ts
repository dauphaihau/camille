import { cache } from "react";
import { Notebook, Page, User, Workspace } from "@prisma/client";
import { db } from "lib/db";

// export async function getInfoUserOnWorkspace(userId: User["id"], workspaceId: Workspace['id']) {
export async function getInfoUserOnWorkspace(userId: User["id"], workspace) {
  let where;
  if (workspace?.domain) {
    where = { userId, workspace: { domain: workspace.domain } }
  }
  if (workspace?.id) {
    where = { userId, workspaceId: workspace.id }
  }

  const res = await db.userOnWorkspace.findFirst({
    where,
    select: {
      user: true,
      role: true,
      workspaceId: true,
    }
  })
  return JSON.parse(JSON.stringify(res))
}


