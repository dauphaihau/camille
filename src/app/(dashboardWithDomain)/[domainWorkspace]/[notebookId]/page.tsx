import { getCurrentUser } from "lib/session";
import { redirect } from "next/navigation";

import { authOptions } from "lib/auth";
import { PostCreateButton } from "components/dashboard/post-create-button";
import { DashboardHeader } from "components/dashboard/header";
import { EmptyPlaceholder } from "components/dashboard/empty-placeholder";
import { DashboardShell } from "components/dashboard/shell";
import { PageCreateButton } from "components/dashboard/page-create-button";
import { PageItem } from "components/dashboard/pages/page-item";
import { getDetailNotebook } from "lib/request/notebook";
import PageList from "components/dashboard/pages/page-list";

interface NotebookPageProps {
  params: {notebookId: string}
}

export const revalidate = 300 // revalidate every ..
export const dynamic = 'force-dynamic'
// export const dynamicParams = false // true | false,

export default async function NotebookPage({ params }: NotebookPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }


  // const notebooks = await getNotebooksForUser(user.id)

  // console.log('dauphaihau debug: params', params)
  const notebook = await getDetailNotebook(params.notebookId)
  // await updateTrackingUserAccess(user.id, { notebookId: params.notebookId})

  // console.log('dauphaihau debug: page-list', pageList)
  console.log('dauphaihau debug: notebook', notebook)

  return (
      <DashboardShell>
        <DashboardHeader heading={notebook?.title} text={notebook?.description}>
          {/*<PageCreateButton notebookId={params.notebookId}/>*/}
        </DashboardHeader>
        <div>
          {
            notebook.pages?.length ? (
              // <div className="divide-y divide-neutral-200 rounded-md border border-slate-200 mb-4">
              <div className="">
                {notebook.pages.map((page) => (
                  <PageItem notebookId={params.notebookId} key={page.id} page={page}/>
                ))}
              </div>
            ) :
              null
              // <EmptyPlaceholder>
              //   {/*<EmptyPlaceholder.Icon name="post"/>*/}
              //   <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
              //   <EmptyPlaceholder.Description>
              //     You don&apos;t have any posts yet. Start creating content.
              //   </EmptyPlaceholder.Description>
              //   <PostCreateButton className="border-slate-200 bg-white text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"/>
              // </EmptyPlaceholder>
            }
        </div>
      </DashboardShell>
  );
}

