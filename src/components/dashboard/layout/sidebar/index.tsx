'use client'

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Box, Col, Icons, Row, Tooltip } from "core/components";
import NotebooksPrivate from "./notebook-list-sidebar";
import { cn, wordInString } from "core/helpers";
import WorkspaceUserDropdown from "./workspace-user-dropdown";
import PagesInTrashPopover from "./pages-in-trash-popover";
import { useWorkspaceContext } from "components/context/workspace-context";
import { PATH } from "config/const";
import PagesFavoriteListSidebar from "./pages-favorite-list-sidebar";
import SearchAllDialog from "../../../dialog/search-all-dialog";
import TeamspaceListSidebar from "./teamspace-list-sidebar";
import { useKeyboardShortcut } from "core/hooks";
import NewNotebookDialog from "../../../dialog/new-notebook-dialog";
import CalcLimitNotebooks from "./calc-limit-notebooks";
import SettingsSidebar from "./settings-sidebar";
import useStore from "lib/store";
import { shallow } from 'zustand/shallow'

export default function SidebarDashboard() {
  const [urlBeforeNavigateSettingPage, setUrlBeforeNavigateSettingPage] = useState<string>('')
  const [scrollTop, setScrollTop] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  // const {  showSidebar } = useWorkspaceContext()

  const showSidebar = useStore(state => state.showSidebar)
  const workspace = useStore(state => state.workspace)

  // const { showSidebar, workspace } = useStore(state => ({
  //     showSidebar: state.showSidebar,
  //     workspace: state.workspace,
  //   }), shallow
  // )

  // const { workspace, showSidebar } = useWorkspaceContext()

  // if (Object.keys(workspace).length === 0) {
  //   return null
  // }

  const isSettingPage = wordInString(pathname, 'settings')

  const shortcutSettings = ['Meta', 's']
  const handleShortcutSettings = useCallback(() => {
    router.push(workspace?.domain ? `/${workspace.domain}/settings/workspace` : PATH.HOME)
  }, [router.push])
  useKeyboardShortcut(shortcutSettings, handleShortcutSettings, { overrideSystem: true })

  // or skeleton
  if (!showSidebar) {
    return null
  }

  return (
    // <aside className="group min-w-[240px] max-w-[240px] flex-col md:flex bg-[#fafafa] h-screen overflow-hidden">
    <aside className="group w-[240px] flex-col  flex-grow-0 flex-shrink-0 md:flex bg-[#fafafa] h-screen overflow-hidden">
      {
        isSettingPage ? <SettingsSidebar urlBeforeNavigateSettingPage={urlBeforeNavigateSettingPage}/> :
          <>
            <WorkspaceUserDropdown/>

            <Box classes='px-1 mb-3'>
              <SearchAllDialog/>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Link
                    prefetch={true}
                    href={workspace?.domain ? `/${workspace.domain}/settings/workspace` : PATH.HOME}
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
                  <div className='text-[#82817f]'>⌘ + S</div>
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
                <PagesFavoriteListSidebar/>
                <TeamspaceListSidebar/>
                <NotebooksPrivate/>
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
