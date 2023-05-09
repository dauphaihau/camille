import { redirect } from "next/navigation"

import { getCurrentUser } from "lib/session"
import { authOptions } from "lib/auth"
import { DashboardSettingsShell } from "components/dashboard/settings/shell"
import { DashboardSettingsHeader } from "components/dashboard/settings/header";
import { PATH } from "config/const";

export default async function SettingsPage({ params }) {
  // const user = await getCurrentUser()
  //
  // if (!user) {
  //   redirect(PATH.LOGIN)
  // }

  redirect(`/${params.domainWorkspace}/settings/workspace`)

  // return (
  //   <DashboardSettingsShell>
  //     <DashboardSettingsHeader
  //       heading="Workspace"
  //       // text="Manage your workspace settings"
  //     />
  //     <p>Overview settings</p>
  //   </DashboardSettingsShell>
  // )
}
