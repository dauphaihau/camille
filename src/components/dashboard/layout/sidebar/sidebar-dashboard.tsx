'use client'

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Box, Icons, Row } from "core/components";
import { useUIController } from "components/context/UIControllerContext";
import Notebooks from "./notebook-list-sidebar";
import { wordInString } from "core/helpers";
import SettingsList from "./settings-list";
import WorkspaceUserDropdown from "./workspace-user-dropdown";
import PagesInTrashPopover from "./pages-in-trash-popover";
import { useWorkspaceContext } from "components/context/WorkspaceContext";

export default function SidebarDashboard() {
  const [urlBeforeNavigateSettingPage, setUrlBeforeNavigateSettingPage] = useState<string>()
  const pathname = usePathname();
  const router = useRouter();
  const { showSidebar, setShowSidebar } = useUIController()
  const { workspace: { domain } } = useWorkspaceContext()

  if (!showSidebar) {
    return null
  }

  const isSettingPage = wordInString(pathname, 'settings')

  const SettingSidebar = () => {
    return (
      <>
        <Row
          align='center' justify='between'
          classes='hover:bg-[#ecebea] p-3 rounded-sm max-h-[45px] cursor-pointer mb-4'
        >
          <Row align='center' gap={3}>
            <Icons.arrowLeftSline
              size={12}
              className='btn-icon'
              onClick={() => router.push(urlBeforeNavigateSettingPage)}
            />
            <div className='flex flex-col'>
              <p className='text-base text-[#373530] font-medium tracking-wide'>Setting</p>
            </div>
          </Row>
          <Icons.doubleArrowLeft
            size={30}
            className='text-md group-hover:text-[#92918d] hover:bg-[#dedddb] rounded invisible group-hover:visible p-2'
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </Row>
        <SettingsList/>
      </>
    )
  }

  return (
    // <aside className="w-[330px] flex-col md:flex bg-[#fafafa] h-screen group">
    <aside className="min-w-[278px] flex-col md:flex bg-[#fafafa] h-screen group">
      {
        isSettingPage ? <SettingSidebar/>
          :
          <>
            <WorkspaceUserDropdown/>

            <Box classes='flex-1'>
              <Box classes='px-1 mb-5'>
                <Row align='center' gap={2} classes='hover:bg-[#ecebea] rounded px-3 py-2 cursor-pointer'>
                  <Icons.search className='h-5 w-5 font-semibold rounded text-sm text-[#777572] flex justify-center'/>
                  <p className='text-sm font-semibold text-[#73726e] tracking-wider'>Search</p>
                </Row>

                <Link
                  href={`/${domain}/settings/workspace`}
                  onClick={() => setUrlBeforeNavigateSettingPage(pathname)}
                >
                  <Row align='center' gap={2} classes='hover:bg-[#ecebea] rounded px-3 py-2 cursor-pointer'>
                    <Icons.settings className='h-5 w-5 font-semibold rounded text-sm text-[#777572] flex justify-center'/>
                    <p className='text-sm font-semibold text-[#73726e] tracking-wider'>Settings</p>
                  </Row>
                </Link>
                <PagesInTrashPopover/>
              </Box>
              <Notebooks/>
            </Box>

            <Box classes='flex-shrink px-4 py-3 inline-flex items-center border-t border-[#e9e9e8] hover:bg-[#ecebea] text-sm text-[#777572] cursor-pointer font-semibold'>
              <Icons.plus className='mr-2 h-5 w-5'/>
              New notebook
            </Box>
          </>
      }
    </aside>
  );
}
