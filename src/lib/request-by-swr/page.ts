'use client'

import useSWR from "swr";

import { fetcher } from "core/helpers";
import { DELETE_PAGE_TYPE } from "config/const";

export function useGetPages(notebookId) {
  const fetcher = (input, init) => fetch(input, init).then(res => res.json())
  const {
    data,
    error,
    mutate
  } = useSWR(notebookId ? `/api/notebook/${notebookId}` : null, fetcher, {
    revalidateOnFocus: false
  })
  return {
    pageList: data?.pages,
    pages: data?.pages,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export function useGetPagesDeleted(workspaceId) {
  const fetcher = (input, init) => fetch(input, init).then(res => res.json())
  const {
    data,
    error,
    mutate
  } = useSWR(workspaceId ? `/api/notebook/page/deleted?workspaceId=${workspaceId}` : null, fetcher)

  return {
    pages: data?.data,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export async function updatePage(id: string, values) {
  return fetcher(`/api/notebook/page/${id}`,
    values,
    'PATCH'
  )
}

export function createPage(payload) {
  return fetcher(`/api/notebook/page`, payload)
}

export function deletePage(pageId: string, type = DELETE_PAGE_TYPE.SOFT_DELETE) {
  return fetcher(`/api/notebook/page/${pageId}`,
    { type },
    'DELETE'
  )
}
