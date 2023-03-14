import { notFound } from "next/navigation";

import { Col } from "core/components";
import { getDetailWorkspace, getListWorkspaceByUser } from "lib/request/notebook";
import { WorkspaceProvider } from "components/context/WorkspaceContext";
import { getCurrentUser } from "lib/session";

interface DashboardLayoutProps {
  children?: React.ReactNode
  params?: {domainWorkspace: string}
}

export default async function DashboardLayout({
  children, params,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  const workspaces = await getListWorkspaceByUser(user.id)
  const workspace = await getDetailWorkspace(params.domainWorkspace)

  return (
    <Col classes="mx-auto space-y-6">
      <WorkspaceProvider
        workspaces={workspaces}
        workspace={workspace}
        user={user}
        notebooks={workspace?.notebooks}
      >
        {children}
      </WorkspaceProvider>
    </Col>
  )
}
