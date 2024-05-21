import { notFound } from 'next/navigation';

import { DashboardHeader } from 'components/dashboard/header';
import { DashboardShell } from 'components/dashboard/shell';
import { PageItem } from 'components/dashboard/page/page-item';
import { getDetailNotebook } from 'lib/request-server/notebook';

interface NotebookPageProps {
  params: { notebookId: string };
}

export default async function NotebookPage({ params }: NotebookPageProps) {
  const notebook = await getDetailNotebook(params.notebookId);
  if (!notebook) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={ notebook?.title }
        text={ notebook?.description }
      />
      <div>
        {
          notebook && notebook.pages.length > 0 &&
          notebook.pages.map((page) => (
            <PageItem key={ page.id } page={ page } />
          ))
        }
      </div>
    </DashboardShell>
  );
}
