import { getCurrentUser } from "lib/session";
import { notFound, usePathname } from "next/navigation";
import React from "react";
import { dashboardConfig } from "../../../config/dashboard";
import { MainNav } from "../../../components/main-nav";
import { DashboardNav } from "../../../components/dashboard/sidebar/nav";
import { Button, Icons, Row } from "core/components";
import HeaderDashboard from "../../../components/dashboard/HeaderDashboard";
import SidebarDashboard from "../../../components/dashboard/sidebar/SidebarDashboard";
import { getDetailWorkspace, getListNotebooks } from "services/notebook";

interface DashboardLayoutProps {
  children?: React.ReactNode
  params?: {workspace: string}
}

export default async function DashboardLayout({
  children, params
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  // console.log('dauphaihau debug: user', user)

  // const pathName = usePathname();
  // console.log('dauphaihau debug: path-name', pathName)

  if (!user) {
    return notFound()
  }

  // const notebooks = await getListNotebooks(user.id)
  // const { notebooks } = await getDetailWorkspace(params.workspace)
  const workspace = await getDetailWorkspace(params.workspace)
  // console.log('dauphaihau debug: notebooks', notebooks)

  return (
    <div className="mx-auto flex flex-col space-y-6">
      {/*<div className="container grid gap-12 md:grid-cols-[200px_1fr]">*/}
      <div className="flex">
        <SidebarDashboard workspace={workspace} notebooks={workspace.notebooks}/>
        <div className='w-full'>
          <HeaderDashboard  notebooks={workspace.notebooks}/>
          <main className="flex w-full flex-1 flex-col overflow-hidden px-16 mt-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
