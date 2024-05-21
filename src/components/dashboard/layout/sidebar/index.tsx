'use client';

import React, { useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Box, Col } from 'core/components';
import { wordInString } from 'core/helpers';
import { PATH } from 'config/const';
import { SearchAllDialog } from 'components/dialog/search-all-dialog';
import { useKeyboardShortcut } from 'core/hooks';
import { NewNotebookDialog } from 'components/dialog/new-notebook-dialog';
import useStore from 'lib/store';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { PrivateNotebooksSidebar } from './private-notebooks-sidebar';
import { WorkspaceUserDropdown } from './workspace-user-dropdown';
import { PagesInTrashPopover } from './pages-in-trash-popover';
import { FavoritePagesSidebar } from './favorite-pages-sidebar';
import { TeamspaceListSidebar } from './teamspace-list-sidebar';
import { CalcLimitNotebooks } from './calc-limit-notebooks';
import { SettingsSidebar } from './settings-sidebar';
import { ItemSidebar } from './item-sidebar';

export function SidebarDashboard() {
  const pathname = usePathname();
  const router = useRouter();

  const [urlBeforeNavigateSettingPage, setUrlBeforeNavigateSettingPage] = useState('');
  const [scrollTop, setScrollTop] = useState(0);

  const shortcutOverrideSystem = useStore(state => state.shortcutOverrideSystem);
  const showSidebar = useStore(state => state.showSidebar);
  const { data: { workspace } = {} } = useGetDetailWorkspace();

  const isSettingPage = wordInString(pathname, 'settings');

  const shortcutSettings = ['Meta', '.'];
  const handleShortcutSettings = useCallback(() => {
    router.push(workspace?.domain ? `/${workspace.domain}${PATH.SETTINGS}${PATH.WORKSPACE}` : PATH.HOME);
  }, [router.push]);
  useKeyboardShortcut(shortcutSettings, handleShortcutSettings, { overrideSystem: shortcutOverrideSystem });

  if (!showSidebar) return null;

  return (
    <aside
      style={ { boxShadow: 'rgba(0, 0, 0, 0.025) -1px 0px 0px 0px inset' } }
      className='group w-[240px] flex-col flex-grow-0 flex-shrink-0 md:flex bg-[#fafafa] h-screen overflow-hidden'
    >
      {
        isSettingPage ?
          <SettingsSidebar urlBeforeNavigateSettingPage={ urlBeforeNavigateSettingPage } /> :

          <>
            <WorkspaceUserDropdown />
            <Box classes='px-1 mb-3'>
              <SearchAllDialog />
              <ItemSidebar
                onClick={ () => {
                  router.push(`/${workspace?.domain}/settings/workspace`);
                  pathname ?
                    setUrlBeforeNavigateSettingPage(pathname) :
                    setUrlBeforeNavigateSettingPage(PATH.HOME);
                } }
                icon='settings'
                title='Settings'
                titleTooltip='Quickly jump to settings'
                subTitleTooltip='⌘ + .'
              />

              <PagesInTrashPopover />
              <NewNotebookDialog
                trigger={
                  <ItemSidebar
                    title='New notebook'
                    icon='fillPlusCircle'
                    titleTooltip='Create a new notebook'
                  />
                }
              />
            </Box>
            { scrollTop > 0 && <div className='border-t border-primary-light' /> }
            <nav
              onScroll={ (e) => setScrollTop(e.currentTarget.scrollTop) }
              className='flex-1 overflow-y-scroll overflow-x-hidden'
            >
              <Col gap={ 2 }>
                <FavoritePagesSidebar />
                <TeamspaceListSidebar />
                <PrivateNotebooksSidebar />
              </Col>
            </nav>

            <CalcLimitNotebooks />
          </>
      }
    </aside>
  );
}
