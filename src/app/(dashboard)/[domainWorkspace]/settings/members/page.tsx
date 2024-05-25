import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import React from 'react';
import { DashboardSettingsHeader } from 'components/dashboard/settings/header';
import { DashboardSettingsShell } from 'components/dashboard/settings/shell';
import { Col } from 'core/components';
import { getListMembersByWorkspace } from 'services/server-actions/settings';
import { MemberList } from 'components/dashboard/settings/member/member-list';
import { DashboardSlugs } from 'types/workspace';

interface MembersPageProps {
  children: React.ReactNode;
  params?: DashboardSlugs;
}

export default async function MembersPage({ params }: MembersPageProps) {
  const queryClient = new QueryClient();

  const members = await queryClient.fetchQuery({
    queryKey: ['members', params?.domainWorkspace],
    queryFn: () => getListMembersByWorkspace(params?.domainWorkspace),
  });
  if (!members) notFound();

  return (
    <HydrationBoundary state={ dehydrate(queryClient) }>
      <DashboardSettingsShell>
        <DashboardSettingsHeader
          heading='Members'
          text='Manage who has access to this workspace'
        />
        { /*<Col classes='gap-6'>*/ }
        { /*  <Col>*/ }
        { /*    <p>Allowed email domains</p>*/ }
        { /*    <p className='text-[#6b6f76] text-[13px]'>Anyone with an email address at these domains is allowed to sign up*/ }
        { /*      for this workspace.</p>*/ }
        { /*  </Col>*/ }
        { /*</Col>*/ }

        { /*<div className='border-b border-[#fafafa] my-3'/>*/ }

        <Col classes='gap-6'>
          <Col>
            <p>Manage members</p>
            <p className='text-[#6b6f76] text-sm'>
              Anyone with an email address at these domains is allowed to sign up
            for this workspace.
            </p>
          </Col>
          <MemberList />
        </Col>
      </DashboardSettingsShell>
    </HydrationBoundary>
  );
}
