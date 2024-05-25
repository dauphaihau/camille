import React from 'react';
import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getDetailWorkspace } from 'services/server-actions/workspace';
import { WorkspaceWrapper } from 'components/context/workspace-wrapper';
import PermissionAccessWorkspace from 'components/dashboard/permission-access-workspace';
import PublicPage from 'components/share-page/public-page';
import { SUFFIX_DOMAIN_SHARE_PUBLIC } from 'config/const';
import { DashboardSlugs } from 'types/workspace';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: DashboardSlugs;
}

export default async function DashboardLayout({
  children, params,
}: DashboardLayoutProps) {

  if (params && params.domainWorkspace.includes(SUFFIX_DOMAIN_SHARE_PUBLIC)) {
    return <PublicPage />;
  }

  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ['workspace', params?.domainWorkspace],
    queryFn: () => getDetailWorkspace(params?.domainWorkspace),
  });

  if (!data?.workspace) notFound();

  if (!data.user || !data.user.userOnWorkspace) {
    return <PermissionAccessWorkspace />;
  }

  return (
    <HydrationBoundary state={ dehydrate(queryClient) }>
      <WorkspaceWrapper>
        { children }
      </WorkspaceWrapper>
    </HydrationBoundary>
  );
}
