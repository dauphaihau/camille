import { notFound, redirect } from "next/navigation";

import { DashboardSettingsHeader } from "components/dashboard/settings/header";
import { DashboardSettingsShell } from "components/dashboard/settings/shell"
import { getInfoUserOnWorkspace } from "lib/request/user";
import { getCurrentUser } from "lib/session";
import { PATH } from "config/const";

export default async function PreferencesPage({ params }) {
  const user = await getCurrentUser()
  if (!user) redirect(PATH.HOME)

  const userOnWorkspace = await getInfoUserOnWorkspace(user.id, { domain: params.domainWorkspace })
  if (!userOnWorkspace) {
    return notFound()
  }

  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading="Preferences"
        text="Manage your preferences"
      />
    </DashboardSettingsShell>
  )
}
