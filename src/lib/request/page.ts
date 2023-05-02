import { cache } from "react";
import { Notebook, Page, User, Workspace } from "@prisma/client";
import { db } from "lib/db";

export async function getFavoritePages(userId: User["id"], workspaceId: Workspace['id']) {
  const favorites = await db.favorite.findMany({
    where: { userId, workspaceId },
    select: { pageId: true }
  })
  const arrPageId = favorites.map(item => item.pageId)
  const res = await db.page.findMany({
    where: {
      id: { in: arrPageId },
      deletedAt: null
    }
  })
  return JSON.parse(JSON.stringify(res))
}

export async function getPage(pageId: Page["id"], userId: User["id"]) {
  const res = await db.page.findFirst({
    where: {
      id: pageId,
      // authorId: userId,
    },
    include: {
      notebook: true
    }
    // select: {
    //   favorites: [{}]
    // }
  })
  return JSON.parse(JSON.stringify(res))
}
