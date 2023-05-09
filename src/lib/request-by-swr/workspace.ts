'use client'

import { fetcher } from "core/helpers";
import useSWR from "swr";

export async function deleteWorkspace(id: string) {
  return fetcher(`/api/settings/workspace/${id}`, null, 'DELETE')
}

export function useGetWorkspacesByUser(showDropdown) {
  const fetcher = (input, init) => fetch(input, init).then(res => res.json())
  const {
    data,
    error,
    mutate
  } = useSWR(showDropdown ? '/api/user/workspaces' : null, fetcher, {
    revalidateOnFocus: false
  })
  return {
    workspaces: data?.workspaces,
    isLoading: !data?.workspaces,
    isError: !!error,
    mutate
  };
}


export async function updateInfoGeneralWorkspace(payload) {
  return fetcher(`/api/settings/workspace`, payload, 'PATCH')
}

