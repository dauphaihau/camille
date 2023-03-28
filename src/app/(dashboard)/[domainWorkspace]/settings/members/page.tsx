import { DashboardSettingsHeader } from "components/dashboard/settings/header";
import { DashboardSettingsShell } from "components/dashboard/settings/shell"

export default function MembersPage() {
  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading="Members"
        text="Manage who has access to this workspace"
      />
    </DashboardSettingsShell>
  )
}
