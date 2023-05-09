'use client'

import useSWR from "swr";


import { fetcher } from "core/helpers";
import { DELETE_PAGE_TYPE } from "config/const";

export function useGetNotebooksInTeamspace(teamspaceId) {
  const fetcher = (input, init) => fetch(input, init).then(res => res.json())
  const {
    data,
    error,
    mutate
  } = useSWR(teamspaceId ? `/api/teamspace/${teamspaceId}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return {
    // pageList: data?.pages,
    notebooks: data?.notebooks,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

// export function useGetPages(notebookId) {
//   const fetcher = (input, init) => fetch(input, init).then(res => res.json())
//   const {
//     data,
//     error,
//     mutate
//   } = useSWR(notebookId ? `/api/notebook/${notebookId}` : null, fetcher, {
//     revalidateOnFocus: false
//   })
//   return {
//     pageList: data?.pages,
//     pages: data?.pages,
//     isLoading: !data?.pages,
//     isError: !!error,
//     mutate
//   };
// }

export function useGetPagesDeleted(workspaceId) {
  const fetcher = (input, init) => fetch(input, init).then(res => res.json())
  const {
    data, error, mutate
  } = useSWR(workspaceId ? `/api/notebook/page/deleted?workspaceId=${workspaceId}` : null, fetcher)

  return {
    pages: data?.data,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export function useSearchPage(params) {
  console.log('dauphaihau debug: params', params)
  // const fetcher = url => api.get(url, { params }).then(res => res.data)
  const fetcher = (input, init) => fetch(input, init).then(res => res.json())
  const {
    data, error, mutate
    // } = useSWR(params ? [`/api/notebook/page/search`, params] : null, fetcher)
  } = useSWR(params?.workspaceId ?
    `/api/notebook/page/search?searchValue=${params.searchValue}&workspaceId=${params.workspaceId}`
    : null, fetcher
  )

  console.log('dauphaihau debug: data', data)

  return {
    // pages: data?.data,
    type: data?.type,
    data: data?.data,
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

export function addToFavorite(payload) {
  return fetcher(`/api/notebook/page/favorite`, payload)
}
