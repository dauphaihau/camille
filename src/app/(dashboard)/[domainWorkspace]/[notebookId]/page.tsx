import { getCurrentUser } from "lib/session";
import { redirect } from "next/navigation";

import { authOptions } from "lib/auth";
import { DashboardHeader } from "components/dashboard/header";
import { EmptyPlaceholder } from "components/dashboard/empty-placeholder";
import { DashboardShell } from "components/dashboard/shell";
import { PageItem } from "components/dashboard/pages/page-item";
import { getDetailNotebook } from "lib/request/notebook";

interface NotebookPageProps {
  params: {notebookId: string}
}

// export const revalidate = 300 // revalidate every ..
// export const dynamic = 'force-dynamic'
// export const dynamicParams = false // true | false,

export default async function NotebookPage({ params }: NotebookPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  const notebook = await getDetailNotebook(params.notebookId)

  return (
    <DashboardShell>
      <DashboardHeader heading={notebook?.title} text={notebook?.description}/>
      <div>
        {
          notebook.pages?.length ?
            notebook.pages.map((page) => (
                <PageItem notebookId={params.notebookId} key={page.id} page={page}/>
              )
            )
            : (
              <EmptyPlaceholder>
                <EmptyPlaceholder.Icon name="book"/>
                <EmptyPlaceholder.Description>
                  You don&apos;t have any pages yet.
                </EmptyPlaceholder.Description>
              </EmptyPlaceholder>
            )
        }
      </div>
    </DashboardShell>
  );
}

