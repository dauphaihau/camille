'use client';

import { Page, Workspace } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetcher } from 'core/helpers';
import { Response } from 'types';
import {
  IAddPageToFavorite, ICreatePage, IDeletePage, IUpdatePage
} from 'types/page';
import { DashboardSlugs } from 'types/workspace';
import {
  getFavoritePages, getPage, getPagesDeleted, getSearchPage
} from '../request-server/page';
import { useGetDetailWorkspace } from './workspace';

export function useGetCurrentPage() {
  const params = useParams<DashboardSlugs>();
  return useQuery({
    queryKey: ['page', params?.pageId],
    queryFn: () => getPage(params?.pageId),
  });
}

export function useGetPagesDeleted(workspaceId?: Workspace['id']) {
  return useQuery({
    queryKey: ['pages-deleted', workspaceId],
    queryFn: () => getPagesDeleted(workspaceId),
    enabled: Boolean(workspaceId),
  });
}

export function useGetFavoritesPages() {
  const { data: { user, workspace } = {} } = useGetDetailWorkspace();
  return useQuery({
    queryKey: ['favorites-pages', workspace?.id],
    queryFn: () => getFavoritePages(workspace?.id),
    initialData: user?.favoritePages,
  });
}

export function useSearchPage(searchValue?: string) {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  return useQuery({
    queryKey: ['search-page', searchValue, workspace?.id],
    queryFn: () => getSearchPage(workspace?.id, searchValue),
  });
}

export function useUpdatePage(id?: Page['id']) {
  return useMutation({
    mutationFn: (payload: IUpdatePage) => {
      return fetcher<Response>(`/api/notebook/page/${id}`, payload, 'PATCH');
    },
  });
}

export function useCreatePage() {
  return useMutation({
    mutationFn: (payload: ICreatePage) => {
      return fetcher<Response>('/api/notebook/page', payload);
    },
  });
}

export function useDeletePage() {
  return useMutation({
    mutationFn: (payload: IDeletePage) => {
      return fetcher<Response>('/api/notebook/page/delete', payload);
    },
  });
}

export function useAddPageToFavorite() {
  return useMutation({
    mutationFn: (payload: IAddPageToFavorite) => {
      return fetcher<Response>('/api/notebook/page/favorite', payload);
    },
  });
}
