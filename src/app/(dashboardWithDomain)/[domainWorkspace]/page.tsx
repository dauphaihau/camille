import { getCurrentUser } from "lib/session";
import { redirect } from "next/navigation";

import { authOptions } from "lib/auth";
import { DashboardHeader } from "components/dashboard/header";
import { DashboardShell } from "components/dashboard/shell";
import NewNotebookDialog from "components/dialog/new-notebook-dialog";
import NotebookList from "components/dashboard/notebook-list";

export default async function DashboardPage() {
// export default async function NotebooksPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Notebooks" text="Create and manage notebooks.">
        <NewNotebookDialog/>
      </DashboardHeader>
      <NotebookList/>
    </DashboardShell>
  );
}
