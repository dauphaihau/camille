'use client';

import { ReactNode, useCallback, useEffect } from 'react';
import { useParams, useSelectedLayoutSegments } from 'next/navigation';

import { SidebarDashboard } from 'components/dashboard/layout/sidebar';
import { Col, Row } from 'core/components';
import { cn } from 'core/helpers';
import { useDebounce, useKeyboardShortcut } from 'core/hooks';
import { useStoreMulti } from 'stores/layout-store';
import { LimitedPagesBar } from 'components/dashboard/layout/limited-pages-bar';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';
import { DashboardSlugs } from 'types/workspace';
import { useUpdateTrackingUser } from 'services/query-hooks/user';
import { PublishedPageBar } from '../dashboard/layout/published-page-bar';
import { TrashedPageBar } from '../dashboard/layout/trashed-page-bar';

type WorkspaceProps = {
  children: ReactNode
}

export const WorkspaceWrapper = ({ children }: Partial<WorkspaceProps>) => {
  const segments = useSelectedLayoutSegments();
  const slugs = useParams<DashboardSlugs>();

  const {
    showSidebar,
    setShowSidebar,
    showLimitedPagesBar,
    setShowLimitedPagesBar, setPage, setWorkspace,
  } = useStoreMulti('showSidebar', 'setShowLimitedPagesBar', 'setShowSidebar', 'setPage', 'setWorkspace', 'showLimitedPagesBar');

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
    lastAccessPageId: slugs?.pageId ?? '',
  };

  const debouncedUpdatePage = useDebounce(() => updateTrackingUser(paramsUpdateTracking), 1000);

  useEffect(() => {
    if (workspace) {
      setWorkspace(workspace);
    }
  },[]);

  useEffect(() => {
    if (isSettingPage) return;

    if (segments.length === 1) {
      setPage(null);
    }
    debouncedUpdatePage();

    if (showLimitedPagesBar) {
      setShowLimitedPagesBar(false);
    }
  }, [
    paramsUpdateTracking.lastAccessWorkspaceId,
    paramsUpdateTracking.lastAccessPageId,
  ]);

  return (
    <Col classes='mx-auto space-y-6'>
      <Row>
        <SidebarDashboard />
        <div className='w-full'>
          <PublishedPageBar />
          <LimitedPagesBar />
          <TrashedPageBar />
          <main
            className={ cn('flex mx-auto flex-1 flex-col',
              { 'max-w-[708px] mt-[60px]': isSettingPage }
            ) }
          >
            { children }
          </main>
        </div>

      </Row>
    </Col>
  );
};
