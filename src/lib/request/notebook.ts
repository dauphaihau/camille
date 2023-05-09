import { cache } from "react";
import { Notebook, User, Workspace } from "@prisma/client";
import { db } from "lib/db";
import { fetcher } from "../../core/helpers";

export const omitFieldNullish = (obj) => {
  return Object.entries(obj)
  .filter(([_, v]) => v || v === 0)
  .reduce(
    (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? omitFieldNullish(v) : v }),
    {}
  );
}

export const getListNotebooks = cache(async (workspaceId: Workspace["id"]) => {
  return await db.notebook.findMany({
    where: {
      workspaceId,
    },
    select: {
      id: true,
      title: true,
      // Page: true,
      pages: true,
      description: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

export const getDetailNotebook = cache(async (notebookId: Notebook["id"], userId: User['id']) => {
  const res = await db.notebook.findFirst({
    where: {
      id: notebookId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      pages: {
        where: {
          deletedAt: null
        },
        select: {
          id: true,
          title: true,
          updatedAt: true,
          // updatedBy: true,
          createdByUser: {
            select: { email: true}
          },
          notebookId: true,
          favorites: {
            // Favorite: {
            where: {
              userId
            }
          }
        },
      },
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return JSON.parse(JSON.stringify(res))
})

