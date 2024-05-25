'use client';

import { Teamspace } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  IAddPageToFavorite, ICreatePage, IDeletePage, IUpdatePage
} from 'types/page';
import { DashboardSlugs } from 'types/workspace';
import {
  createPage,
  deletePage,
  getFavoritePages,
  getPage,
  getPagesByTeamspace,
  getPagesDeleted,
  getPrivatePages,
  getSearchPage,
  updateFavoritePage,
  updatePage
} from '../server-actions/page';
import { useGetDetailWorkspace } from './workspace';

export function useGetCurrentPage() {
  const params = useParams<DashboardSlugs>();
  return useQuery({
    queryKey: ['page', params?.pageId],
    queryFn: () => getPage(params?.pageId),
  });
}

export function useGetPagesDeleted(enabled: boolean, search: string) {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  return useQuery({
    queryKey: ['pages-deleted', workspace?.id, search],
    queryFn: () => getPagesDeleted(workspace?.id, search),
    enabled,
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

export function useGetPrivatePages() {
  const { data: { user, workspace } = {} } = useGetDetailWorkspace();
  return useQuery({
    queryKey: ['private-pages', workspace?.id],
    queryFn: () => getPrivatePages(workspace?.id),
    initialData: user?.privatePages,
  });
}

export function useGetPagesByTeamspace(teamspaceId?: Teamspace['id']) {
  return useQuery({
    queryKey: ['teamspace-pages', teamspaceId],
    queryFn: () => getPagesByTeamspace(teamspaceId),
    enabled: Boolean(teamspaceId),
  });
}

export function useSearchPage(searchValue?: string) {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  return useQuery({
    queryKey: ['search-page', searchValue, workspace?.id],
    queryFn: () => getSearchPage(workspace?.id, searchValue),
  });
}

export function useUpdatePage() {
  return useMutation({
    mutationFn: (payload: IUpdatePage) => updatePage(payload),
  });
}

export function useCreatePage() {
  return useMutation({
    mutationFn: (payload: ICreatePage) => createPage(payload),
  });
}

export function useDeletePage() {
  return useMutation({
    mutationFn: (payload: IDeletePage) => deletePage(payload),
  });
}

export function useAddPageToFavorite() {
  return useMutation({
    mutationFn: (payload: IAddPageToFavorite) => updateFavoritePage(payload),
  });
}
