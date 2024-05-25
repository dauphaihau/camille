'use client';

import { useMutation } from '@tanstack/react-query';
import { Teamspace } from '@prisma/client';
import { ICreateTeamspace } from 'types/teamspace';
import { archiveTeamspace, createTeamspace } from 'services/server-actions/teamspace';

export function useCreateTeamspace() {
  return useMutation({
    mutationFn: (payload: ICreateTeamspace) => createTeamspace(payload),
  });
}

export function useArchiveTeamspace(teamspaceId: Teamspace['id']) {
  return useMutation({
    mutationFn: () => archiveTeamspace(teamspaceId),
  });
}
