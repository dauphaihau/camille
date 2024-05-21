import React from 'react';
import { redirect } from 'next/navigation';

import Navigate from 'components/marketing/header/navigate';
import { getCurrentUser } from 'lib/session';
import { getTrackingUserAccess } from 'lib/request-server/tracking';
import { Col } from 'core/components';
import { PATH } from 'config/const';

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

    const track = await getTrackingUserAccess(user.workspaceLastVisited.id as string, user.id);
    const domain = user.workspaceLastVisited.domain;

    if (track) {
      if (track.lastAccessNotebookId && !track.lastAccessPageId) {
        return redirect(`/${domain}/${track.lastAccessNotebookId}`);
      }
      if (track.lastAccessPageId && track.lastAccessNotebookId) {
        return redirect(`/${domain}/${track.lastAccessNotebookId}/${track.lastAccessPageId}`);
      }
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
