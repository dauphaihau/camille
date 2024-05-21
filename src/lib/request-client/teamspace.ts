'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Teamspace } from '@prisma/client';
import { fetcher } from 'core/helpers';
import { IArchiveTeamspace, ICreateTeamspace } from 'types/teamspace';
import { getNotebooksByTeamspace } from 'lib/request-server/notebook';

export function useCreateTeamspace() {
  return useMutation({
    mutationFn: (payload: ICreateTeamspace) => {
      return fetcher<Response>('/api/teamspace', payload, 'POST');
    },
  });
}

export function useArchiveTeamspace(teamspaceId: Teamspace['id']) {
  return useMutation({
    mutationFn: (payload: IArchiveTeamspace) => {
      return fetcher<Response>(`/api/teamspace/${teamspaceId}`, payload, 'DELETE');
    },
  });
}

export function useGetNotebooksByTeamspace(teamspaceId?: Teamspace['id']) {
  return useQuery({
    queryKey: ['notebooks-by-teamspace', teamspaceId],
    queryFn: () => getNotebooksByTeamspace(teamspaceId),
  });
}
