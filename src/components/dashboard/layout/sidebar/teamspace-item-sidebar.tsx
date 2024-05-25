import { Teamspace } from '@prisma/client';
import * as React from 'react';
import { useState } from 'react';

import { Box, Icons, Row } from 'core/components';
import { cn } from 'core/helpers';
import { useGetPagesByTeamspace } from 'services/query-hooks/page';
import { AddPageButtonSidebar } from './add-page-button-sidebar';
import { TeamspaceOperationsSidebar } from './teamspace-operations-sidebar';
import { PageItemSidebar } from './page-item-sidebar';
import { PageOperationsSidebar } from './page-operations-sidebar';

interface TeamspaceItemProps {
  teamspace: Pick<Teamspace, 'id' | 'name' | 'isOrigin'>;
}

export default function TeamspaceItemSidebar({ teamspace }: TeamspaceItemProps) {
  const [showPages, setShowPages] = useState(false);
  const {
    isLoading,
    data: pages,
  } = useGetPagesByTeamspace(showPages ? teamspace.id : undefined);

  return (
    <div className='group/teamspace'>
      <Row
        align='center'
        justify='center'
        classes={ cn('item-sidebar pr-2 pl-[1px]') }
      >
        <div
          className='flex flex-1 gap-1 items-center pl-1.5'
          onClick={ () => setShowPages(!showPages) }
        >
          <Box
            classes={ ['avatar h-5 w-5 rounded text-sm text-primary-medium flex justify-center font-medium',
              teamspace.isOrigin ? 'text-[#cc782f] bg-[#f5dfcc]' : 'bg-[#dcdbda] text-primary-medium',
            ] }
          >
            { teamspace && teamspace.name.charAt(0) }
          </Box>
          <div className={ cn('font-semibold text-sm text-primary truncate w-fit') }>
            { teamspace.name }
          </div>
          <Icons.arrowRightSline
            size={ 12 }
            className={ cn(
              'btn-icon hover:bg-accent invisible group-hover/teamspace:visible',
              showPages ? 'rotate-90' : 'rotate-0'
            ) }
          />
        </div>

        <div className='flex gap-1 group-hover/teamspace:visible invisible'>
          <TeamspaceOperationsSidebar teamspace={ teamspace } />
          <AddPageButtonSidebar teamspaceId={ teamspace.id } />
        </div>
      </Row>

      {
        showPages &&
        <div className='pl-1'>
          {
            isLoading ?
              <PageItemSidebar.Skeleton notebook /> :
              pages && pages.length > 0 ?
                pages.map((page) => (
                  <PageItemSidebar
                    key={ page.id }
                    page={ page }
                  >
                    <PageOperationsSidebar
                      teamspaceId={ teamspace.id }
                      page={ page }
                    />
                  </PageItemSidebar>
                )) :
                <p className='font-semibold text-sm text-[#999895] pl-8'>No teamspaces inside</p>
          }
        </div>
      }
    </div>
  );
}
