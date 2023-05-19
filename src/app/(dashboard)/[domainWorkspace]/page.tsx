import { getCurrentUser } from "lib/session";
import { redirect } from "next/navigation";

import { DashboardHeader } from "components/dashboard/header";
import { DashboardShell } from "components/dashboard/shell";
import { NewNotebookDialog } from "components/dialog/new-notebook-dialog";
import { NotebookList } from "components/dashboard/notebook-list";
import { PATH } from "config/const";

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(PATH.LOGIN)
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
