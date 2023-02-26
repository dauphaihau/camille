import { cache } from "react";
import { getCurrentUser } from "lib/session";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

import { db } from "lib/db";
import { authOptions } from "lib/auth";
import { PostCreateButton } from "components/dashboard/post-create-button";
import { DashboardHeader } from "components/dashboard/header";
import { EmptyPlaceholder } from "components/dashboard/empty-placeholder";
import { DashboardShell } from "components/dashboard/shell";
import NewNotebookDialog from "components/dialog/NewNotebookDialog";
import { NotebookItem } from "components/dashboard/notebooks/note-item";
import { getListNotebooks } from "services/notebook";

export default async function NotebooksPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  const notebooks = await getListNotebooks(user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Notebooks" text="Create and manage notebooks.">
        <NewNotebookDialog/>
      </DashboardHeader>

      <div>
        {
          notebooks?.length ? (
            // <div className="divide-y divide-neutral-200 rounded-md border border-slate-200 mb-4">
            <div className="">
              {notebooks.map((notebook) => (
                <NotebookItem key={notebook.id} notebook={notebook}/>
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post"/>
              <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any posts yet. Start creating content.
              </EmptyPlaceholder.Description>
              <PostCreateButton className="border-slate-200 bg-white text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"/>
            </EmptyPlaceholder>
          )}
      </div>

    </DashboardShell>
  );
}
