'use client'

import useSWR from "swr";

export function useGetPages(notebookId) {
  const fetcher = (input, init) => fetch(input, init).then(res => res.json())
  const {
    data,
    error,
    mutate
  } = useSWR(notebookId ? `http://localhost:3000/api/notebook/${notebookId}` : null, fetcher)
  return {
    // notebook: data,
    pageList: data?.pages,
    pages: data?.pages,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export async function deletePage(pageId: string, type = 0) {
  // const response = await fetch(`/api/posts/${pageId}`, {
  return await fetch(`/api/notebook/page/${pageId}`, {
    method: "DELETE",
    body: JSON.stringify({ type })
  })
}

export function useGetPagesDeleted(workspaceId) {
  const fetcher = (input, init) => fetch(input, init).then(res => res.json())
  const {
    data,
    error,
    mutate
  } = useSWR(workspaceId ? `http://localhost:3000/api/notebook/page/deleted?workspaceId=${workspaceId}` : null, fetcher)

  console.log('dauphaihau debug: data', data)

  return {
    // notebook: data,
    pages: data?.data,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export async function updatePage(id: string, values) {
  return await fetch(`/api/notebook/page/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
}


// export async function getPagesDeleted(pageId: string) {
//   // const response = await fetch(`/api/posts/${pageId}`, {
//   return  await fetch(`/api/notebook/page/${pageId}`, {
//     method: "DELETE",
//   })
// }
