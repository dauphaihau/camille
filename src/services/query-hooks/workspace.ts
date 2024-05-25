'use client';

import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import {
  DashboardSlugs, ICreateWorkspace, IGetDetailWorkspace, IUpdateWorkspace
} from 'types/workspace';
import {
  createWorkspace, deleteWorkspace,
  getDetailWorkspace,
  getWorkspacesByUser,
  updateWorkspace
} from 'services/server-actions/workspace';
import { toast } from 'core/components';

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
    mutationFn: () => deleteWorkspace(workspace?.id),
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
    mutationFn: (payload: IUpdateWorkspace) => updateWorkspace(payload),
  });
}

export function useCreateWorkspace() {
  return useMutation({
    mutationFn: (payload: ICreateWorkspace) => createWorkspace(payload),
  });
}

export function useUpdatePlanWorkspace() {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.get<{url: string}>(
        '/api/settings/workspace/stripe?' + new URLSearchParams({
          workspaceId: workspace?.id ?? '',
          domainWorkspace: workspace?.domain ?? '',
        })
      );
      return res.data;
    },
    onSuccess: (response) => {
      if (response?.url) {
        window.location.href = response.url;
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === StatusCodes.FORBIDDEN) {
        toast({
          message: 'You don\'t have permission to perform this action',
          type: 'error',
        });
        return;
      }
      toast({
        message: 'Something went wrong.',
        type: 'error',
      });
    },
  });
}
