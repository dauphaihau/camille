import { Notebook } from '@prisma/client';
import Link from 'next/link';
import { useParams, useSelectedLayoutSegments } from 'next/navigation';
import { ReactNode, useState } from 'react';

import { Icons, Row, Tooltip } from 'core/components';
import { cn } from 'core/helpers';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { useGetDetailNotebook } from 'lib/request-client/notebook';
import { DashboardSlugs } from 'types/workspace';
import { PageCreateButton } from '../../page-create-button';
import { NotebookOperations } from '../../notebook-operations';
import { PageItemSidebar } from './page-item-sidebar';
import { PageOperationsSidebar } from './page-operations-sidebar';

interface NotebookItemProps {
  notebook: Pick<Notebook, 'id' | 'title'>;
  classes?: string;
  children?: ReactNode;
}

export function NotebookItemSidebar({
  notebook, classes, children,
}: NotebookItemProps) {
  const segments = useSelectedLayoutSegments();
  const [showPages, setShowPages] = useState(false);
  const params = useParams<DashboardSlugs>();
  const {
    isLoading, data: notebookData,
  } = useGetDetailNotebook(showPages ? notebook.id : undefined);

  const { data: { workspace } = {} } = useGetDetailWorkspace();

  return (
    <div className='group/notebook'>
      <Row
        align='center'
        justify='between'
        classes={ [
          'item-sidebar pr-0 group-hover/notebook:pr-2 pl-[5px]',
          { ['bg-accent-light-active']: segments.length === 1 && params?.notebookId && params.notebookId === notebook.id },
          classes,
        ] }
      >
        <Row
          align='center'
          gap={ 1 }
          classes='w-full'
        >
          <Row classes='flex-0 flex-shrink-0'>
            <div
              className='btn-icon-sidebar'
              onClick={ () => setShowPages(!showPages) }
            >
              <Icons.arrowRightSline className={ `${showPages ? 'rotate-90' : 'rotate-0'}` } />
            </div>
            <Tooltip>
              <Tooltip.Trigger asChild>
                <div className='btn-icon-sidebar'>
                  <Icons.notebook />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content className='ml-1.5'>
                Change icon are developing
              </Tooltip.Content>
            </Tooltip>
          </Row>

          <Link
            href={ `/${workspace?.domain}/${notebook.id}` }
            className={ cn('font-semibold text-sm text-primary flex-auto min-w-0',
              'truncate overflow-hidden',
              { ['text-secondary']: segments.length === 1 && params?.notebookId && params.notebookId === notebook.id }
            ) }
          >
            { notebook.title }
          </Link>

          <Row classes='flex-0 flex-shrink-0'>
            <Row
              gap={ 1 }
              classes='invisible w-0 group-hover/notebook:visible group-hover/notebook:w-auto'
            >
              {
                children ||
                <NotebookOperations
                  placeOnSidebar
                  notebook={ { id: notebook.id, title: notebook.title } }
                />
              }
              <PageCreateButton notebookId={ notebook.id }>
                <Tooltip>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Icons.plus
                        size={ 15 }
                        className='btn-icon text-[#686662]'
                      />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <div>Add a page</div>
                  </Tooltip.Content>
                </Tooltip>
              </PageCreateButton>
            </Row>
          </Row>
        </Row>
      </Row>

      {
        showPages &&
        <div>
          {
            isLoading ?
              <PageItemSidebar.Skeleton /> :
              notebookData?.pages && notebookData.pages.length > 0 ?
                notebookData.pages.map((page) => (
                  <>
                    <PageItemSidebar
                      key={ page.id }
                      page={ page }
                      notebook={ notebook }
                    >
                      <PageOperationsSidebar
                        page={ page }
                        notebook={ notebook }
                      />
                    </PageItemSidebar>
                  </>
                )) :
                <p className='font-semibold h-7 text-sm text-[#999895] pl-8'>No page inside</p>
          }
        </div>
      }
    </div>
  );
}
