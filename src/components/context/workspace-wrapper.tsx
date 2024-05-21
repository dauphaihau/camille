'use client';

import { ReactNode, useCallback, useEffect } from 'react';
import { useParams, useSelectedLayoutSegments } from 'next/navigation';

import { SidebarDashboard } from 'components/dashboard/layout/sidebar';
import { Col, Row } from 'core/components';
import { cn } from 'core/helpers';
import { useDebounce, useKeyboardShortcut } from 'core/hooks';
import { useStoreMulti } from 'lib/store';
import { LimitedNotebookBar } from 'components/dashboard/layout/limited-notebook-bar';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { DashboardSlugs } from 'types/workspace';
import { useUpdateTrackingUser } from 'lib/request-client/tracking';
import { PublishedPageBar } from '../dashboard/layout/published-page-bar';

type WorkspaceProps = {
  children: ReactNode
}

export const WorkspaceWrapper = ({ children }: Partial<WorkspaceProps>) => {
  const segments = useSelectedLayoutSegments();
  const slugs = useParams<DashboardSlugs>();

  const {
    showSidebar,
    setShowSidebar,
    setShowLimitedNotebookBar, setPage,
  } = useStoreMulti('showSidebar', 'setShowLimitedNotebookBar', 'setShowSidebar', 'setPage');

  const { data: { workspace } = {} } = useGetDetailWorkspace();

  const {
    mutate: updateTrackingUser,
  } = useUpdateTrackingUser();

  const shortcutSidebar = ['Meta', '\\'];
  const handleShortcutSidebar = useCallback(() => {
    setShowSidebar();
  }, [showSidebar]);
  useKeyboardShortcut(shortcutSidebar, handleShortcutSidebar, { overrideSystem: true });

  const isSettingPage = segments.includes('settings');

  const paramsUpdateTracking = {
    lastAccessWorkspaceId: (workspace && workspace?.id) ?? '',
    lastAccessNotebookId: slugs?.notebookId ?? '',
    lastAccessPageId: slugs?.pageId ?? '',
  };

  const debouncedUpdatePage = useDebounce(() => updateTrackingUser(paramsUpdateTracking), 1000);

  useEffect(() => {
    if (isSettingPage) return;
    if (segments.length === 1) {
      setPage(undefined);
    }
    debouncedUpdatePage();
    setShowLimitedNotebookBar(false);
  }, [
    paramsUpdateTracking.lastAccessWorkspaceId,
    paramsUpdateTracking.lastAccessNotebookId,
    paramsUpdateTracking.lastAccessPageId,
  ]);

  return (
    <Col classes='mx-auto space-y-6'>
      <Row>
        <SidebarDashboard />
        <div className='w-full'>
          <PublishedPageBar />
          <LimitedNotebookBar />
          <main
            className={ cn('flex mx-auto flex-1 flex-col',
              { 'max-w-[708px] mt-[60px]': isSettingPage || !slugs?.pageId }
            ) }
          >
            { children }
          </main>
        </div>

      </Row>
    </Col>
  );
};
