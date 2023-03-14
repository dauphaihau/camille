'use client'

import { Button, Icons, Row } from "core/components";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUIController } from "../context/UIControllerContext";
import { useWorkspaceContext } from "../context/WorkspaceContext";
import NotebookPageBreadcrumb from "./header/notebook-page-breadcrumb";

export default function HeaderDashboard() {
  const { showSidebar, setShowSidebar } = useUIController()
  return (
    <header className="sticky top-0 z-40 bg-white px-4">
      <div className="h-11 flex items-center justify-between">

        <div className='flex items-center gap-2'>
          {
            !showSidebar &&
            <Icons.doubleArrowRight
              size={30}
              className='text-md hover:bg-[#efefef] rounded p-2' onClick={() => setShowSidebar(!showSidebar)}
            />
          }
          {/*<Icons.menu className='hover:bg-[#efefef] rounded'/>*/}

          {/*<Icons.arrowLeftSline className='hover:bg-[#efefef] rounded' onClick={() => router.back()}/>*/}
          {/*<Icons.arrowRightSline className='hover:bg-[#efefef] rounded'/>*/}
          <NotebookPageBreadcrumb/>
        </div>

        <Row align='center' gap={4}>
          <Button color='gray' variant='text' size='xs'>Share</Button>
          <div className='btn-icon-header'>
            <Icons.starOutline className='h-5 w-5'/>
          </div>
          <div className='btn-icon-header'>
            <Icons.clock className='h-5 w-5'/>
          </div>
          <div className='btn-icon-header'>
            <Icons.threeDotVertical className='h-5 w-5'/>
          </div>
        </Row>
      </div>
    </header>

  );
}
