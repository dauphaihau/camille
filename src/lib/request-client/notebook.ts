'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Notebook } from '@prisma/client';
import { fetcher } from 'core/helpers';
import { getDetailNotebook } from 'lib/request-server/notebook';
import { ICreateNotebook, ICreateNotebookTs, IUpdateNotebook } from 'types/notebook';
import { Response } from 'types';

export function useGetDetailNotebook(notebookId?: Notebook['id']) {
  return useQuery({
    queryKey: ['notebook', notebookId],
    queryFn: () => getDetailNotebook(notebookId),
    enabled: Boolean(notebookId),
  });
}

export function useCreateNotebook() {
  return useMutation({
    mutationFn: (payload: ICreateNotebook) => {
      return fetcher<Response>('/api/notebook/', payload);
    },
  });
}

export function useCreateNotebookOnTeamspace() {
  return useMutation({
    mutationFn: (payload: ICreateNotebookTs) => {
      return fetcher<Response>('/api/teamspace/notebook/', payload);
    },
  });
}

export function useUpdateNotebook(id: Notebook['id']) {
  return useMutation({
    mutationFn: (payload: IUpdateNotebook) => {
      return fetcher<Response>(`/api/notebook/${id}`, payload, 'PATCH');
    },
  });
}

export function useDeleteNotebook(id: Notebook['id']) {
  return useMutation({
    mutationFn: () => {
      return fetcher<Response>(`/api/notebook/${id}`, null, 'DELETE');
    },
  });
}
