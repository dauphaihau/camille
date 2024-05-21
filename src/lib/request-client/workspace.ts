'use client';

import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetcher } from 'core/helpers';
import {
  DashboardSlugs, ICreateWorkspace, IGetDetailWorkspace, IResponseDeleteWorkspace, IUpdateWorkspace
} from 'types/workspace';
import { getDetailWorkspace, getWorkspacesByUser } from 'lib/request-server/workspace';
import { Response } from 'types';

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
    mutationFn: (payload: IUpdateWorkspace) => {
      return fetcher<Response>('/api/settings/workspace', payload, 'PATCH');
    },
  });
}

export function useCreateWorkspace() {
  return useMutation({
    mutationFn: (payload: ICreateWorkspace) => {
      return fetcher<Response>('/api/settings/workspace', payload);
    },
  });
}
