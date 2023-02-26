'use client'

import { Button, DropdownMenu, Icons, Row } from "core/components";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardNav } from "./nav";
import { dashboardConfig } from "../../../config/dashboard";
import { useUIController } from "../../context/UIControllerContext";
import PrivateList from "./Private";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { siteConfig } from "config/site";
import SettingsDialog from "../../dialog/SettingsDialog";
import { wordInString } from "core/helpers";
import SettingsList from "./SettingsList";

export default function SidebarDashboard({ notebooks, user, workspace }) {
  const { showSidebar, setShowSidebar } = useUIController()
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (!showSidebar) {
    return null
  }

  const domain = pathname.slice(1).split('/')[0]
  const isSettingPage = wordInString(pathname, 'settings')

  if (isSettingPage) {
    return (
      <aside className="w-[330px] flex-col md:flex bg-[#fafafa] h-screen group">
        <Row
          align='center' justify='between'
          classes='hover:bg-[#ecebea] p-3 rounded-sm max-h-[45px] cursor-pointer mb-4'
        >
          <Row align='center' gap={3}>
            <Link href={`/${domain}`}>
              <Icons.arrowLeftSline size={12} className='btn-icon'/>
            </Link>
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
        <SettingsList domain={domain} notebooks={notebooks}/>
      </aside>
    );
  }

  return (
    // <aside className="w-[330px] flex-col md:flex px-4 py-3 bg-[#fafafa] h-screen space-y-4">
    <aside className="w-[330px] flex-col md:flex bg-[#fafafa] h-screen group">

      <SettingsDialog open={open} setOpen={setOpen}/>

      {/*<DropdownMenu open={openDialog}>*/}
      <DropdownMenu>
        <DropdownMenu.Trigger className="mb-2">
          <Row
            align='center' justify='between'
            // classes='hover:bg-[#ecebea] py-4 px-3 rounded-sm'
            classes='hover:bg-[#ecebea] p-3 rounded-sm max-h-[45px] cursor-pointer'
          >
            <Row align='center' gap={3}>
              {/*<div className='avatar bg-[#e9e9e8] px-1.5 rounded text-[#777572]'>*/}
              <div className='avatar bg-[#ecebea] group-hover:bg-[#dcdbda] h-5 w-5 rounded text-sm text-[#777572] flex justify-center'>
                {workspace.name.charAt(0)}
              </div>
              <div className='flex flex-col'>
                <p className='text-sm text-[#373530] font-semibold'>{workspace.name}</p>
                {/*<p className='text-xs text-[#7b7a76]'>{user?.email}</p>*/}
              </div>
            </Row>

            {/*<div className='visible group-hover:invisible'>*/}
            <Icons.doubleArrowLeft
              size={30}
              className='text-md group-hover:text-[#92918d] hover:bg-[#dedddb] rounded invisible group-hover:visible p-2'
              onClick={() => setShowSidebar(!showSidebar)}
            />
            {/*</div>*/}

            {/*<Icons.doubleArrowLeft className='text-sm hover:bg-[#efefef] rounded'/>*/}
          </Row>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="mt-2 md:w-[240px]" align="end">
            {/*<div className="flex items-center justify-start gap-2 p-4">*/}
            {/*  <div className="flex flex-col space-y-1 leading-none">*/}
            {/*    {user.name && <p className="font-medium">{user.name}</p>}*/}
            {/*    {user.email && (*/}
            {/*      <p className="w-[200px] truncate text-sm text-slate-600">*/}
            {/*        {user.email}*/}
            {/*      </p>*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*</div>*/}

            <DropdownMenu.Separator/>
            <DropdownMenu.Item>
              <Link href="/dashboard" className="w-full">
                Dashboard
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/dashboard/billing" className="w-full">
                {/*<Link onClick={() => setOpenDialog(false)} href="/dashboard/billing" className="w-full">*/}
                Billing
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/dashboard/settings" className="w-full">
                Settings
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator/>

            <DropdownMenu.Item>
              <Link href="/workspace" className="w-full">
                Join or create workspace
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link
                href={siteConfig.links.github}
                className="w-full"
                target="_blank"
              >
                Workspace settings
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link
                href={siteConfig.links.github}
                className="w-full"
                target="_blank"
              >
                Add an account
              </Link>
            </DropdownMenu.Item>

            {/*<DropdownMenu.Item>*/}
            {/*  <Link href="/docs" target="_blank" className="w-full">*/}
            {/*    Documentation*/}
            {/*  </Link>*/}
            {/*</DropdownMenu.Item>*/}
            {/*<DropdownMenu.Item>*/}
            {/*  <Link*/}
            {/*    href={siteConfig.links.github}*/}
            {/*    className="w-full"*/}
            {/*    target="_blank"*/}
            {/*  >*/}
            {/*    GitHub*/}
            {/*  </Link>*/}
            {/*</DropdownMenu.Item>*/}

            <DropdownMenu.Separator/>
            <DropdownMenu.Item
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault()
                signOut({
                  callbackUrl: `${window.location.origin}/login`,
                })
              }}
            >
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>

      <div className='px-1 mb-5'>
        <Row align='center' gap={2} classes='hover:bg-[#ecebea] rounded px-3 py-2 cursor-pointer'>
          <Icons.search className='h-5 w-5 font-semibold rounded text-sm text-[#777572] flex justify-center'/>
          <p className='text-sm font-semibold text-[#73726e] tracking-wider'>Search</p>
        </Row>
        <Link href={`/${domain}/settings `}>
          {/*<Link href='/dashboard/settings'>*/}
          <Row align='center' gap={2} classes='hover:bg-[#ecebea] rounded px-3 py-2 cursor-pointer'>
            <Icons.setting className='h-5 w-5 font-semibold rounded text-sm text-[#777572] flex justify-center'/>
            <p className='text-sm font-semibold text-[#73726e] tracking-wider'>Settings</p>
          </Row>
        </Link>

        {/*<SettingsDialog*/}
        {/*  trigger={*/}
        {/*    <Row align='center' gap={2} classes='hover:bg-[#ecebea] rounded px-3 py-2 cursor-pointer'>*/}
        {/*      <Icons.setting className='h-5 w-5 font-semibold rounded text-sm text-[#777572] flex justify-center'/>*/}
        {/*      <p className='text-sm font-semibold text-[#73726e] tracking-wider'>Settings</p>*/}
        {/*    </Row>*/}
        {/*  }*/}
        {/*/>*/}

        {/*<Row align='center' gap={2} classes='hover:bg-[#ecebea] rounded px-3 py-2 cursor-pointer' onClick={() => setOpen(true)}>*/}
        {/*  <Icons.setting className='h-5 w-5 font-semibold rounded text-sm text-[#777572] flex justify-center'/>*/}
        {/*  <p className='text-sm font-semibold text-[#73726e] tracking-wider'>Settings</p>*/}
        {/*</Row>*/}
      </div>
      {/*<DashboardNav items={dashboardConfig.sidebarNav}/>*/}
      <PrivateList notebooks={notebooks}/>
    </aside>
  );
}
