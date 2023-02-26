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
      pages: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

export const getDetailWorkspace = cache(async (domainWorkspace: Workspace["domain"]) => {
  return await db.workspace.findFirst({
    where: {
      domain: domainWorkspace,
      // id: workspaceId,
    },
    select: {
      id: true,
      name: true,
      domain: true,
      notebooks: true
      // pages: true,
      // published: true,
      // createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

export async function getPages(pageId: Page["id"], userId: User["id"]) {
  return await db.page.findFirst({
    where: {
      id: pageId,
      // authorId: userId,
    },
  })
}

export async function updatePage(id, values) {
  const response = await fetch(`/api/notebook/pages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
  // if (!response?.ok) {
  //   return toast({
  //     title: "Something went wrong.",
  //     message: "Your post was not saved. Please try again.",
  //     type: "error",
  //   })
  // }
  //
  // // router.refresh()
  // //
  // return toast({
  //   message: "Your post has been saved.",
  //   type: "success",
  // })
}

