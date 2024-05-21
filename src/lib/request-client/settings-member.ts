'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { User } from '@prisma/client';
import { fetcher } from 'core/helpers';
import { IAddMember, IUpdateRoleMember } from 'types/member';
import { Response } from 'types';
import { DashboardSlugs } from 'types/workspace';
import { getListMembersByWorkspace } from '../request-server/settings';
import { useGetDetailWorkspace } from './workspace';

export function useGetMembersByCurWorkspace() {
  const params = useParams<DashboardSlugs>();
  const domain = params?.domainWorkspace;

  return useQuery({
    queryKey: ['members', domain],
    queryFn: () => getListMembersByWorkspace(domain),
  });
}

export function useUpdateRoleMember() {
  return useMutation({
    mutationFn: (payload: IUpdateRoleMember) => {
      return fetcher<Response>('/api/settings/member', payload, 'PATCH');
    },
  });
}

export function useAddMember() {
  return useMutation({
    mutationFn: (payload: IAddMember) => {
      return fetcher<Response>(
        '/api/settings/member',
        payload
      );
    },
  });
}

export function useDeleteMember(userId: User['id']) {
  return useMutation({
    mutationFn: () => {
      return fetcher<Response>(
        `/api/settings/member?userId=${userId}`,
        undefined,
        'DELETE'
      );
    },
  });
}

export function useLeaveWorkspace() {
  const { data: { workspace } = {} } = useGetDetailWorkspace();

  return useMutation({
    mutationFn: () => {
      return fetcher<Response>(
        '/api/settings/member/leave',
        { workspaceId: workspace?.id }
      );
    },
  });
}
