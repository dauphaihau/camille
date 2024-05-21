import { notFound } from 'next/navigation';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Editor } from 'components/dashboard/editor';
import { getPage } from 'lib/request-server/page';
import HeaderEditor from 'components/dashboard/page/header/header-editor';
import { DashboardSlugs } from 'types/workspace';

interface EditorPageProps {
  params: DashboardSlugs
}

export default async function EditorPage({ params }: EditorPageProps) {
  const queryClient = new QueryClient();

  const page = await queryClient.fetchQuery({
    queryKey: ['page', params.pageId],
    queryFn: () => getPage(params.pageId),
  });

  if (!page) notFound();

  return (
    <HydrationBoundary state={ dehydrate(queryClient) }>
      <div>
        <HeaderEditor />
        <Editor />
      </div>
    </HydrationBoundary>
  );
}
