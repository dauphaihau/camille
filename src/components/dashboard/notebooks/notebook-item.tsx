'use client';

import Link from 'next/link';
import { Notebook } from '@prisma/client';

import { Skeleton } from 'core/components/skeleton';
import { Grid, Row } from 'core/components';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { NotebookOperations } from '../notebook-operations';

interface NotebookItemProps {
  notebook: Pick<Notebook, 'id' | 'title' | 'description' | 'published' | 'createdAt'>;
}

export function NotebookItem({ notebook }: NotebookItemProps) {
  const { data: { workspace } = {} } = useGetDetailWorkspace();

  return (
    <Row align='center' justify='between'>
      <Grid gap={ 1 }>
        {
          workspace?.domain && notebook.id &&
          <Link
            href={ `/${workspace?.domain}/${notebook.id}` }
            className='font-semibold hover:underline text-[14px]'
          >
            { notebook.title }
          </Link>
        }
      </Grid>
      <NotebookOperations notebook={ { id: notebook.id, title: notebook.title } } />
    </Row>
  );
}

NotebookItem.Skeleton = function NotebookItemSkeleton() {
  return (
    <div className='mb-4'>
      <div className='space-y-3'>
        <Skeleton className='h-5 w-4/5' />
      </div>
    </div>
  );
};
