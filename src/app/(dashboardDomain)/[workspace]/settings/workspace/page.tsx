import { redirect } from "next/navigation"

import { getCurrentUser } from "lib/session"
import { authOptions } from "lib/auth"
import { DashboardHeader } from "components/dashboard/header"
import { DashboardShell } from "components/dashboard/shell"
import React from "react";
import Forms from "components/dashboard/settings/forms-update-workspace";
import { Button } from "core/components"
import { getDetailWorkspace } from "services/notebook";
import { DashboardSettingsHeader } from "../../../../../components/dashboard/settings/header";
import { DashboardSettingsShell } from "components/dashboard/settings/shell"

export default async function WorkspacePage({ params }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }
  const workspace = await getDetailWorkspace(params.workspace)

  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading="Workspace"
        text="Manage your workspace setting."
      />

      <div className="grid gap-8 max-w-[600px] mx-auto">
        <div className='space-y-3'>
          <div>Logo</div>
          <div className='avatar bg-[#ecebea] group-hover:bg-[#dcdbda] h-16 w-16 rounded text-md text-[#777572] grid place-items-center'>
            {workspace.name.charAt(0)}
          </div>
          <div className='text-sm text-[#6b6f7c]'>Pick a logo for your workspace. Recommend size is 256x256</div>
        </div>

        <div className='border-gray-200 border-b'/>

        <div className='space-y-3 w-1/2'>
          <div className='text-base'>General</div>
          <Forms workspace={workspace}/>
        </div>
        <div className='border-gray-200 border-b'/>

        <div className='space-y-4'>
          <div>Delete workspace</div>
          <div className='text-sm text-[#6b6f7c]'>If you want to permanently delete this workspace and all of its data,
            including but not limited to users,
            issues, and comments, you can do so below.
          </div>
          <Button color='red'>Delete this workspace</Button>
        </div>
      </div>
    </DashboardSettingsShell>
  )
}
