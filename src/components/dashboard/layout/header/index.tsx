'use client'

import React from "react";

import { Button, Icons, Row } from "core/components";
import { useUIController } from "components/context/UIControllerContext";
import NotebookPageBreadcrumb from "./notebook-page-breadcrumb";

export default function Index() {
  const { showSidebar, setShowSidebar } = useUIController()
  return (
    <header className="sticky top-0 z-40 bg-white px-4">
      <Row align='center' justify='between' classes="h-11">
        <Row align='center' gap={2}>
          {
            !showSidebar &&
            <Icons.doubleArrowRight
              size={30}
              className='text-md hover:bg-[#efefef] rounded p-2'
              onClick={() => setShowSidebar(!showSidebar)}
            />
          }
          <NotebookPageBreadcrumb/>
        </Row>
        <Row align='center' gap={2}>
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
      </Row>
    </header>
  );
}
