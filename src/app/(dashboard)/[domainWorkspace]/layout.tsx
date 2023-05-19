import React from "react";
import { notFound, redirect } from "next/navigation";

import { getInfoUserOnWorkspace } from "lib/request/user";
import { getDetailWorkspace } from "lib/request/workspace";
import { getFavoritePages } from "lib/request/page";
import { WorkspaceWrapper } from "components/context/workspace-wrapper";
import { getCurrentUser } from "lib/session";
import PermissionAccessWorkspace from "components/dashboard/permission-access-workspace";
import PageShareToWeb from "components/share-page/page-share-to-web";
import { PATH, SUFFIX_DOMAIN_SHARE_TO_WEB } from "config/const";

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

  if (params && params.domainWorkspace.includes(SUFFIX_DOMAIN_SHARE_TO_WEB)) {
    return <PageShareToWeb/>
  }

  if (!user) {
    redirect(PATH.HOME)
  }

  const workspace = await getDetailWorkspace(params?.domainWorkspace ?? '', user.id)

  if (!workspace) {
    return notFound()
  }

  const favoritePages = await getFavoritePages(user.id, workspace.id)

  const userOnWorkspace = await getInfoUserOnWorkspace(user.id, { id: workspace.id })

  if (workspace && !userOnWorkspace) {
    return <PermissionAccessWorkspace workspace={workspace} user={user}/>
  }

  return (
    <WorkspaceWrapper
      workspace={workspace}
      user={{
        ...user,
        userOnWorkspace,
        privateNotebooks: workspace?.notebooks,
        favoritePages
      }}
    >
      {children}
    </WorkspaceWrapper>
  )
}
