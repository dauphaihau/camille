'use client';

import { notFound } from 'next/navigation';
import { useGetCurrentPage } from 'lib/request-client/page';
import LoadingFullPage from 'components/common/loading-full-page';
import { Editor } from '../dashboard/editor';
import OperationOnTopSharePage from './operation-on-top-share-page';

export default function PublicPage() {
  const { data: page, isLoading } = useGetCurrentPage();

  if (isLoading) return <LoadingFullPage />;

  if (!page || !page.published) notFound();

  return (
    <>
      <OperationOnTopSharePage page={ page } />
      <Editor readOnly />
    </>
  );
}
