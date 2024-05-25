import React from 'react';
import { redirect } from 'next/navigation';

import Navigate from 'components/marketing/header/navigate';
import { getCurrentUser } from 'lib/session';
import { Col } from 'core/components';
import { PATH } from 'config/const';
import { getTrackingUserByWorkspace } from 'services/server-actions/user';

interface MarketingProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingProps) {

  const user = await getCurrentUser();

  if (user) {
    if (!user.workspaceLastVisited) {
      redirect(PATH.WORKSPACE);
    }
    const response = await getTrackingUserByWorkspace(user.workspaceLastVisited.id);

    const domain = user.workspaceLastVisited.domain;

    if (response?.data?.lastAccessPageId) {
      redirect(`/${domain}/${response.data.lastAccessPageId}`);
    }
    redirect(`/${domain}`);
  }

  return (
    <Col className='min-h-screen max-w-5xl mx-auto'>
      <header className='w-full bg-white'>
        <Navigate />
      </header>
      <main className='pb-20'>{ children }</main>
    </Col>
  );
}
