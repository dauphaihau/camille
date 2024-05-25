'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { User } from '@prisma/client';
import { IAddMember, IUpdateRoleMember } from 'types/member';
import { DashboardSlugs } from 'types/workspace';
import {
  addMember, deleteMember, leaveWorkspace, updateRoleMember
} from 'services/server-actions/member';
import { getListMembersByWorkspace } from 'services/server-actions/settings';
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
    mutationFn: (payload: IUpdateRoleMember) => updateRoleMember(payload),
  });
}

export function useAddMember() {
  return useMutation({
    mutationFn: (payload: IAddMember) => addMember(payload),
  });
}

export function useDeleteMember(userId: User['id']) {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  return useMutation({
    mutationFn: () => deleteMember({
      workspaceId: workspace?.id as string,
      userId,
    }),
  });
}

export function useLeaveWorkspace() {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  return useMutation({
    mutationFn: () => leaveWorkspace(workspace?.id),
  });
}
