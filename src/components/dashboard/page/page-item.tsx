'use client';

import Link from 'next/link';

import { Skeleton } from 'core/components/skeleton';
import { PATH } from 'config/const';
import { Row } from 'core/components';
import useStore from 'lib/store';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import Title from 'components/common/title';
// import { PageOperations } from '../page-operations';

export function PageItem({ page }) {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  const pageContext = useStore(state => state.page);

  return (
    <Row
      align='center'
      justify='between'
    >
      <div className='grid gap-1'>
        <Link href={ workspace?.domain ? `/${workspace.domain}/${page.notebookId}/${page.id}` : PATH.HOME }>
          <Title
            maxW={ 400 }
            className='font-semibold hover:underline'
            classesText=' text-base'
          >
            { pageContext?.id === page.id ? pageContext.title : page.title }
          </Title>
        </Link>
      </div>

      { /*<Row>*/ }
      { /*  <PageOperations page={page}/>*/ }
      { /*</Row>*/ }
    </Row>
  );
}

PageItem.Skeleton = function PageItemSkeleton() {
  return (
    <div className='p-4'>
      <div className='space-y-3'>
        <Skeleton className='h-5 w-2/5' />
        <Skeleton className='h-4 w-4/5' />
      </div>
    </div>
  );
};
