'use client';

import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetcher } from 'core/helpers';
import {
  DashboardSlugs, ICreateWorkspace, IGetDetailWorkspace, IResponseDeleteWorkspace, IUpdateWorkspace
} from 'types/workspace';
import {
  createWorkspace,
  getDetailWorkspace,
  getWorkspacesByUser,
  updateWorkspace
} from 'lib/request-server/workspace';

export function useGetDetailWorkspace() {
  const params = useParams<DashboardSlugs>();
  const domain = params?.domainWorkspace;
  return useQuery<IGetDetailWorkspace>({
    queryKey: ['workspace', domain],
    queryFn: () => getDetailWorkspace(domain),
  });
}

export function useDeleteWorkspace() {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  return useMutation({
    mutationFn: () => {
      return fetcher<IResponseDeleteWorkspace>(`/api/settings/workspace/${workspace?.id}`, null, 'DELETE');
    },
  });
}

export function useGetWorkspacesByUser(enabled: boolean) {
  return useQuery({
    queryKey: ['workspaces-by-user'],
    queryFn: () => getWorkspacesByUser(),
    enabled,
  });
}

export function useUpdateInfoGeneralWorkspace() {
  return useMutation({
    // mutationFn: (payload: IUpdateWorkspace) => {
    //   return fetcher<Response>('/api/settings/workspace', payload, 'PATCH');
    // },
    mutationFn: (payload: IUpdateWorkspace) => updateWorkspace(payload),
  });
}

export function useCreateWorkspace() {
  return useMutation({
    mutationFn: (payload: ICreateWorkspace) => createWorkspace(payload),
  });
}

// export function useCreateWorkspace() {
//   return useMutation({
//     mutationFn: (payload: ICreateWorkspace) => {
//       return fetcher<Response>('/api/settings/workspace', payload);
//     },
//   });
// }
