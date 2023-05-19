'use client'

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Box, Col, Icons, Row, Tooltip } from "core/components";
import { PrivateNotebooksSidebar } from "./private-notebooks-sidebar";
import { wordInString } from "core/helpers";
import { WorkspaceUserDropdown } from "./workspace-user-dropdown";
import { PagesInTrashPopover } from "./pages-in-trash-popover";
import { PATH } from "config/const";
import { FavoritePagesSidebar } from "./favorite-pages-sidebar";
import { SearchAllDialog } from "components/dialog/search-all-dialog";
import { TeamspaceListSidebar } from "./teamspace-list-sidebar";
import { useKeyboardShortcut } from "core/hooks";
import { NewNotebookDialog } from "components/dialog/new-notebook-dialog";
import { CalcLimitNotebooks } from "./calc-limit-notebooks";
import { SettingsSidebar } from "./settings-sidebar";
import useStore from "lib/store";

export function SidebarDashboard() {
  const [urlBeforeNavigateSettingPage, setUrlBeforeNavigateSettingPage] = useState<string>('')
  const [scrollTop, setScrollTop] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const shortcutOverrideSystem = useStore(state => state.shortcutOverrideSystem)

  const showSidebar = useStore(state => state.showSidebar)
  const workspace = useStore(state => state.workspace)

  const isSettingPage = wordInString(pathname, 'settings')

  const shortcutSettings = ['Meta', '.']
  const handleShortcutSettings = useCallback(() => {
    router.push(workspace?.domain ? `/${workspace.domain}/settings/workspace` : PATH.HOME)
  }, [router.push])
  useKeyboardShortcut(shortcutSettings, handleShortcutSettings, { overrideSystem: shortcutOverrideSystem })

  // or skeleton
  if (!showSidebar) {
    return null
  }

  return (
    <aside className="group w-[240px] flex-col  flex-grow-0 flex-shrink-0 md:flex bg-[#fafafa] h-screen overflow-hidden">
      {
        isSettingPage ?
          <SettingsSidebar urlBeforeNavigateSettingPage={urlBeforeNavigateSettingPage}/> :
          <>
            <WorkspaceUserDropdown/>

            <Box classes='px-1 mb-3'>
              <SearchAllDialog/>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Link
                    prefetch={true}
                    href={`/${workspace.domain}/settings/workspace`}
                    onClick={() => pathname ? setUrlBeforeNavigateSettingPage(pathname) : setUrlBeforeNavigateSettingPage(PATH.HOME)}
                  >
                    <Row align='center' gap={2} classes='hover:bg-[#ecebea] rounded px-3 py-2 cursor-pointer'>
                      <Icons.settings className='h-5 w-5 font-semibold rounded text-sm text-[#777572] flex justify-center'/>
                      <p className='text-sm font-semibold text-[#73726e] tracking-wider'>Settings</p>
                    </Row>
                  </Link>
                </Tooltip.Trigger>
                <Tooltip.Content side='right'>
                  <div>Quickly jump to settings</div>
                  <div className='text-[#82817f]'>⌘ + .</div>
                </Tooltip.Content>
              </Tooltip>
              <PagesInTrashPopover/>
            </Box>
            {scrollTop > 0 && <div className='border-t border-[#e9e9e8]'/>}

            <nav
              onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
              className={'flex-1 overflow-y-scroll overflow-x-hidden'}
            >
              <Col gap={2}>
                <FavoritePagesSidebar/>
                <TeamspaceListSidebar/>
                <PrivateNotebooksSidebar/>
              </Col>
            </nav>

            <CalcLimitNotebooks/>

            <div className='border-t border-[#e9e9e8]'/>
            <NewNotebookDialog
              trigger={
                <Box classes='flex-shrink px-4 py-3 inline-flex items-center hover:bg-[#ecebea] text-sm text-[#777572] cursor-pointer font-semibold w-full'>
                  <Icons.plus className='mr-2 h-5 w-5'/>
                  New notebook
                </Box>
              }
            />
          </>
      }
    </aside>
  );
}
