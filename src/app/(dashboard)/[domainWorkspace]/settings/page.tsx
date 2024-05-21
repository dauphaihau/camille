import { redirect } from 'next/navigation';

export default async function SettingsPage({ params }) {
  redirect(`/${params.domainWorkspace}/settings/workspace`);
}
