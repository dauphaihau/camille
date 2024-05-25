import { Page } from '@prisma/client';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useParams } from 'next/navigation';

import { Skeleton } from 'core/components/skeleton';
import {
  Col, Icons, Row, Tooltip
} from 'core/components';
import { cn, getRandomInt } from 'core/helpers';
import { useStoreMulti } from 'stores/layout-store';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';
import { DashboardSlugs } from 'types/workspace';

interface PageItemProps {
  page: Pick<Page, 'id' | 'title' | 'content' | 'updatedAt' | 'updatedBy'>;
  children: ReactNode;
}

export function PageItemSidebar({
  page, children,
}: PageItemProps) {
  const slugs = useParams<DashboardSlugs>();
  const { page: pageContext, setPage } = useStoreMulti('setPage', 'page');
  const { data: { workspace } = {} } = useGetDetailWorkspace();

  return (

    <Row
      align='center'
      justify='between'
      classes={ [
        'group/page item-sidebar pr-2 mb-0.5 pl-[7px]',
        { ['bg-accent-light-active']: slugs?.pageId === page?.id },
      ] }
    >
      <Row
        align='center'
        gap={ 1 }
        classes='w-full'
      >
        <Row classes='flex-0 flex-shrink-0'>
          <Tooltip>
            <Tooltip.Trigger>
              <div className='btn-icon-sidebar'>
                <Icons.arrowRightSline />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content className='ml-2.5'>
              Nested page not available
            </Tooltip.Content>
          </Tooltip>

          <div className='btn-icon-sidebar'>
            <Tooltip>
              <Tooltip.Trigger>
                { page?.content ? <Icons.pageText /> : <Icons.page /> }
              </Tooltip.Trigger>
              <Tooltip.Content className='ml-1.5'>
                Change icon are developing
              </Tooltip.Content>
            </Tooltip>
          </div>
        </Row>

        <Link
          onClick={ () => setPage(null) }
          href={ `/${workspace?.domain}/${page.id}` }
          className={ cn('font-semibold text-sm text-primary flex-auto min-w-0',
            'truncate overflow-hidden',
            { ['text-secondary']: slugs?.pageId === page?.id }
          ) }
        >
          { pageContext?.id === page?.id ? pageContext?.title : page?.title }
        </Link>

        <Row classes='flex-0 flex-shrink-0'>
          <Row
            gap={ 1 }
            classes='invisible w-0 group-hover/page:visible group-hover/page:w-auto'
          >
            { children }
          </Row>
        </Row>
      </Row>
    </Row>
  );
}

PageItemSidebar.Skeleton = function PageItemSkeleton({ notebook }: { notebook?: boolean }) {
  return (
    <Col
      gap={ 1 }
      classes='my-1.5'
    >
      {
        new Array(getRandomInt(1, 3)).fill('').map((_, i) => (
          <Row
            key={ i }
            align='center'
            classes={ notebook ? 'pl-[5px]' : 'pl-5' }
          >
            <div className='w-5 h-5 flex justify-center items-center'>
              <Icons.arrowRightSline
                size={ 25 }
                className='animate-pulse fill-[#efefed] rounded'
              />
            </div>
            <Skeleton className='h-5 w-5 mr-2' />
            <Skeleton
              width={ Math.floor(Math.random() * 40) + 60 }
              className='h-2.5'
            />
          </Row>
        )
        )
      }
    </Col>
  );
};
