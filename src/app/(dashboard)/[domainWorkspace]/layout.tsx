import React from "react";
import { notFound, redirect } from "next/navigation";

import { getInfoUserOnWorkspace } from "lib/request/user";
import { getListWorkspaceByUser, getDetailWorkspace, getWorkspaceUserAreAvailable } from "lib/request/workspace";
import { getFavoritePages } from "lib/request/page";
import { WorkspaceProvider } from "components/context/workspace-context";
import { getCurrentUser } from "lib/session";
import { PATH } from "config/const";
import PermissionAccessWorkspace from "components/dashboard/permission-access-workspace";

interface DashboardLayoutProps {
  children?: React.ReactNode
  params?: {domainWorkspace: string}
}

// export const fetchCache = 'auto'
// export const revalidate = 10
// export const revalidate = false

export default async function DashboardLayout({
  children, params,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    // return notFound()
    redirect(PATH.HOME)
    // redirect(PATH.LOGIN)
  }

  console.log('dauphaihau debug: user at layout', user)

  const workspaces = await getListWorkspaceByUser(user.id)

  const workspace = await getDetailWorkspace(params?.domainWorkspace ?? '', user.id)
  // const workspace = await getDetailWorkspace(params?.domainWorkspace ?? '', undefined, user.id)

  if (!workspace) {
    // const res = await getWorkspaceUserAreAvailable(user.id)
    // if (res.workspace) {
    //   return redirect(`/${res.workspace.domain}`)
    // }
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
      workspace={workspace}
      workspaces={workspaces}
      pagesFavorite={pages}

      user={user}
      userOnWorkspace={userOnWorkspace}
      notebooks={workspace?.notebooks}
    >
      {children}
    </WorkspaceProvider>
  )
}
