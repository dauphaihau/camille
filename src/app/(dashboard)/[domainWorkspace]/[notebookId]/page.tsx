import { getCurrentUser } from "lib/session";
import { redirect } from "next/navigation";

import { DashboardHeader } from "components/dashboard/header";
import { EmptyPlaceholder } from "components/dashboard/empty-placeholder";
import { DashboardShell } from "components/dashboard/shell";
import { PageItem } from "components/dashboard/page/page-item";
import { getDetailNotebook } from "lib/request/notebook";
import { PATH } from "config/const";

interface NotebookPageProps {
  params: {notebookId: string}
}

// export const revalidate = 300 // revalidate every ..
// export const dynamic = 'force-dynamic'
// export const dynamicParams = false // true | false,

export default async function NotebookPage({ params }: NotebookPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(PATH.LOGIN)
  }

  const notebook = await getDetailNotebook(params.notebookId, user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading={notebook?.title} text={notebook?.description}/>
      <div>
        {
          notebook && notebook.pages?.length ?
            notebook.pages.map((page) => (
                <PageItem key={page.id} page={page}/>
              )
            )
            : null
          // : (
          //   <EmptyPlaceholder>
          //     <EmptyPlaceholder.Icon name="book"/>
          //     <EmptyPlaceholder.Description>
          //       You don&apos;t have any pages yet.
          //     </EmptyPlaceholder.Description>
          //   </EmptyPlaceholder>
          // )
        }
      </div>
    </DashboardShell>
  );
}

