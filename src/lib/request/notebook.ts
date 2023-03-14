import { cache } from "react";
import useSWR from "swr";
import { Notebook, Page, User, Workspace } from "@prisma/client";

import { db } from "lib/db";
// import { toast } from "core/components";

// export const getListNotebooks = cache(async (userId: User["id"]) => {
//   return await db.notebook.findMany({
//     where: {
//       authorId: userId,
//     },
//     select: {
//       id: true,
//       title: true,
//       // Page: true,
//       pages: true,
//       description: true,
//       published: true,
//       createdAt: true,
//     },
//     orderBy: {
//       updatedAt: "desc",
//     },
//   })
// })

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

export const getDetailNotebook = cache(async (notebookId: Notebook["id"]) => {
  return await db.notebook.findFirst({
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
        }
      },
      // pages: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

// export const getDetailWorkspace = cache(async (domainWorkspace: Workspace["domain"]) => {
export const getDetailWorkspace = cache(async (domainWorkspace: Workspace["domain"], workspaceId?: Workspace["id"]) => {
  const res = await db.workspace.findFirst({
    where: omitFieldNullish({
      domain: domainWorkspace,
      id: workspaceId,
    }),
    // where: {
    //   // domain: workspaceId,
    //   // domain: domainWorkspace,
    //   id: workspaceId,
    // },
    select: {
      id: true,
      name: true,
      domain: true,
      notebooks: true
      // notebooks: true
      // pages: true,
      // published: true,
      // createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return JSON.parse(JSON.stringify(res))
})

export const getListWorkspaceByUser = cache(async (userId: User["id"]) => {
  const res = await db.workspace.findMany({
    where: {
      // domain: domainWorkspace,
      // id: workspaceId,
      users: {
        some: {
          id: userId
        }
      }
    },

    // select: {
    //   id: true,
    //   name: true,
    //   domain: true,
    //   notebooks: true
    //   // pages: true,
    //   // published: true,
    //   // createdAt: true,
    // },
    // orderBy: {
    //   updatedAt: "desc",
    // },
    //
  })
  return JSON.parse(JSON.stringify(res))
})

export const deleteWorkspace = cache(async (domainWorkspace: Workspace["domain"], workspaceId?: Workspace["id"]) => {
  await db.workspace.delete({
    where: omitFieldNullish({
      domain: domainWorkspace,
      id: workspaceId,
    }),
  })

  // return JSON.parse(JSON.stringify(res))
})

export async function getPage(pageId: Page["id"], userId: User["id"]) {
  return await db.page.findFirst({
    where: {
      id: pageId,
      // authorId: userId,
    },
  })
}

export async function deleteNotebook(notebookId: string) {
  // const response = await fetch(`/api/posts/${notebookId}`, {
  return  await fetch(`/api/notebook/${notebookId}`, {
    method: "DELETE",
  })
}
