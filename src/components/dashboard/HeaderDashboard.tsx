'use client'

import { Button, Icons, Row } from "core/components";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUIController } from "../context/UIControllerContext";

export default function HeaderDashboard({ notebooks }) {
  const pathName = usePathname();
  const router = useRouter();
  const { showSidebar, setShowSidebar } = useUIController()

  // console.log('dauphaihau debug: path-name', pathName)
  const partList = pathName.split('/');

  // console.log('dauphaihau debug: notebooks', notebooks)

  // console.log('dauphaihau debug: part-list', partList)
  const notebookSelected = notebooks.find((notebook) => notebook.id === partList[3])
  // console.log('dauphaihau debug: notebook-selected', notebookSelected)
  const pageSelected = partList[4] ? notebookSelected.pages.find((notebook) => notebook.id === partList[4]) : ''

  // console.log('dauphaihau debug: title', titleNotebook)
  // console.log('dauphaihau debug: page-selected', pageSelected.title)

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

          <p className='text-sm'>
            {/*IT - Developer / News, Exp, Blog ... / Experience*/}
            {/*{partList[2]}*/}
            {notebookSelected?.title}
            {/*{pageSelected.title}*/}
            {pageSelected.title ? ` / ${pageSelected.title}` : ''}
            {/*{titlePage ? ` / ${titlePage}` : ''}*/}
            {/*{partList[4] ? ` / ${partList[4]}` : ''}*/}
          </p>
        </div>

        <Row align='center' gap={4}>
          {/*<Button color='red' variant='filled'>Share</Button>*/}
          <Button color='gray' variant='text'>Share</Button>
          <Icons.starOutline className='h-4 w-4'/>
          <Icons.clock className='h-4 w-4'/>
          <Icons.threeDotVertical className='h-4 w-4'/>
        </Row>
        {/*<MainNav items={dashboardConfig.mainNav}/>*/}
        {/*<UserAccountNav*/}
        {/*  user={{*/}
        {/*    name: user.name,*/}
        {/*    image: user.image,*/}
        {/*    email: user.email,*/}
        {/*  }}*/}
        {/*/>*/}
      </div>
    </header>

  );
}
