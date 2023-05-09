import React from "react";
import { notFound, redirect } from "next/navigation";

import { getInfoUserOnWorkspace } from "lib/request/user";
import { getDetailWorkspace } from "lib/request/workspace";
import { getFavoritePages } from "lib/request/page";
import { WorkspaceProvider } from "components/context/workspace-context";
import { getCurrentUser } from "lib/session";
import PermissionAccessWorkspace from "components/dashboard/permission-access-workspace";
import PageShareToWeb from "components/share-page/page-share-to-web";
import { db } from "lib/db";
import { PATH } from "../../../config/const";

interface DashboardLayoutProps {
  children?: React.ReactNode
  params?: {domainWorkspace: string}
}

// export const fetchCache = 'auto'
// export const revalidate = 10
// export const revalidate = false

export default async function DashboardLayout({
  children, params
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    if (params && params.domainWorkspace.includes('.camille.site')) {
      return <PageShareToWeb/>
    }
    // return notFound()
    redirect(PATH.HOME)
  }

  const workspace = await getDetailWorkspace(params?.domainWorkspace ?? '', user.id)

  if (!workspace) {
    return notFound()
  }

  const pages = await getFavoritePages(user.id, workspace.id)

  const userOnWorkspace = await getInfoUserOnWorkspace(user.id, { id: workspace.id })

  if (workspace && !userOnWorkspace) {
    return <PermissionAccessWorkspace workspace={workspace} user={user}/>
  }

  if (!userOnWorkspace) {
    return notFound()
  }

  return (
    <WorkspaceProvider
      user={user}
      workspace={workspace}
      userOnWorkspace={userOnWorkspace}
      notebooks={workspace?.notebooks}
      pagesFavorite={pages}
    >
      {children}
    </WorkspaceProvider>
  )
}
