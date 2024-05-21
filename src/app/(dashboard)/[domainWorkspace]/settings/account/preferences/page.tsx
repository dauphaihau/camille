import { DashboardSettingsHeader } from 'components/dashboard/settings/header';
import { DashboardSettingsShell } from 'components/dashboard/settings/shell';

export default async function PreferencesPage() {

  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading='Preferences'
        text='Manage your preferences'
      />
    </DashboardSettingsShell>
  );
}
