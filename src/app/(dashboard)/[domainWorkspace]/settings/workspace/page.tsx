import React from "react";
import { redirect } from "next/navigation"

import { getCurrentUser } from "lib/session"
import { FormUpdateWorkspace } from "components/dashboard/settings/workspace/form-update-workspace";
import { getDetailWorkspace } from "lib/request/workspace";
import { DashboardSettingsHeader } from "components/dashboard/settings/header";
import { DashboardSettingsShell } from "components/dashboard/settings/shell"
import { DeleteWorkspaceButton } from "components/dashboard/settings/workspace/delete-workspace-button";
import { Grid } from "core/components";
import { PATH } from "config/const";
import { UpdateLogo } from "components/dashboard/settings/workspace/upload-logo";

export default async function WorkspaceSettingPage({ params }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(PATH.LOGIN)
  }

  const workspace = await getDetailWorkspace(params.domainWorkspace)

  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading="Workspace"
        text="Manage your workspace setting."
      />

      <Grid classes="gap-8 max-w-[600px] mx-auto">
        <div className='space-y-3'>
          <div>Logo</div>
          <UpdateLogo/>
          <div className='text-sm text-[#6b6f7c]'>Pick a logo for your workspace. Recommend size is 256x256</div>
        </div>

        <div className='border-gray-200 border-b'/>

        <div className='space-y-3 w-1/2'>
          <div className='text-base'>General</div>
          <FormUpdateWorkspace workspace={workspace}/>
        </div>
        <div className='border-gray-200 border-b'/>

        <div className='space-y-4'>
          <div>Danger zone</div>
          <div className='text-sm text-[#6b6f7c]'>If you want to permanently delete this workspace and all of its data,
            including but not limited to users,
            issues, and comments, you can do so below.
          </div>
          <DeleteWorkspaceButton workspaceId={workspace.id}/>
        </div>
      </Grid>
    </DashboardSettingsShell>
  )
}
