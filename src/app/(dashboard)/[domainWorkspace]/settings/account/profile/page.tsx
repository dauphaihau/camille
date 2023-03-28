import { DashboardSettingsHeader } from "components/dashboard/settings/header";
import { DashboardSettingsShell } from "components/dashboard/settings/shell"

export default function ProfilePage() {
  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading="Profile"
        text="Manage your Camille account"
      />
    </DashboardSettingsShell>
  )
}
