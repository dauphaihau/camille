'use client'

import { fetcher } from "core/helpers";
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

export async function updateNotebook(id: string, values) {
  return fetcher(`/api/notebook/${id}`,
    values,
    'PATCH'
  )
}

export async function deleteNotebook(id: string) {
  return fetcher(`/api/notebook/${id}`, null, 'DELETE')
}

export async function createNotebook(payload) {
  return fetcher(`/api/notebook/`, payload)
}

export async function createNotebookOnTeamspace(payload) {
  return fetcher(`/api/teamspace/notebook`, payload)
}
