import { cache } from "react";
import { getCurrentUser } from "lib/session";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

import { db } from "lib/db";
import { authOptions } from "lib/auth";
import { PostCreateButton } from "components/dashboard/post-create-button";
import { DashboardHeader } from "components/dashboard/header";
import { EmptyPlaceholder } from "components/dashboard/empty-placeholder";
import { PostItem } from "components/dashboard/post-item";
import { DashboardShell } from "components/dashboard/shell";
import NewNotebookDialog from "../../components/dialog/NewNotebookDialog";
import { NotebookItem } from "../../components/dashboard/notebooks/note-item";
import { getListNotebooks } from "../../services/notebook";

// const getPostsForUser = cache(async (userId: User["id"]) => {
//   return await db.post.findMany({
//     where: {
//       authorId: userId,
//     },
//     select: {
//       id: true,
//       title: true,
//       published: true,
//       createdAt: true,
//     },
//     orderBy: {
//       updatedAt: "desc",
//     },
//   })
// })

/*
1. load page recent logout -> session or store history into db
2.
 */

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  // const posts = await getPostsForUser(user.id)
  const notebooks = await getListNotebooks(user.id)

  return (
    // <DashboardShell>
    //   <DashboardHeader heading="Posts" text="Create and manage posts.">
    //     <PostCreateButton/>
    //   </DashboardHeader>

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
