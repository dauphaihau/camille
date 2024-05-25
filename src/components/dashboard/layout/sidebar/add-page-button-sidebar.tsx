'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { Teamspace } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import {
  Icons, Loading, Row, toast, Tooltip
} from 'core/components';
import { useCreatePage } from 'services/query-hooks/page';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';
import { cn } from 'core/helpers';
import { useStoreMulti } from 'stores/layout-store';
import { freePlan } from 'config/subscriptions';

interface PageCreateButtonProps {
  teamspaceId?: Teamspace['id'] | null
  children?: React.ReactNode;
}

export function AddPageButtonSidebar(
  { teamspaceId = null, children }: PageCreateButtonProps
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    workspace: wsTemp,
    setWorkspace,
    setShowLimitedPagesBar,
  } = useStoreMulti('setWorkspace', 'workspace', 'setShowLimitedPagesBar');

  const { data: { workspace } = {} } = useGetDetailWorkspace();

  const {
    mutateAsync: createPage,
    isPending: isPendingCreatePage,
  } = useCreatePage();

  async function handleCreatePage() {
    if (!workspace?.id || !wsTemp) return;

    if (workspace.isLimitedPages && wsTemp.totalPages >= freePlan.limitedPages) {
      setShowLimitedPagesBar(true);
      return;
    }

    const response = await createPage({
      workspaceId: workspace.id,
      teamspaceId,
      title: 'Untitled Page',
    });

    if (response.code !== StatusCodes.CREATED) {

      if (response.code === StatusCodes.PAYMENT_REQUIRED) {
        setShowLimitedPagesBar(true);
        return;
      }

      toast({
        title: 'Something went wrong.',
        message: 'Your page was not created. Please try again.',
        type: 'error',
      });
      return;
    }

    if (workspace.isLimitedPages) {
      setWorkspace({ ...wsTemp, totalPages: wsTemp.totalPages + 1 });
    }

    if (teamspaceId) {
      await queryClient.invalidateQueries({
        queryKey: ['teamspace-pages', teamspaceId],
      });
    }
    else {
      await queryClient.invalidateQueries({
        queryKey: ['private-pages', workspace.id],
      });
    }

    if (response && response.data?.pageId) {
      router.push(`/${workspace.domain}/${response.data.pageId}`);
    }
  }


  if (children) {
    return (
      <div onClick={ handleCreatePage }>
        { children }
      </div>
    );
  }
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Row
          justify='end'
          classes={ cn(
            !teamspaceId && 'invisible group-hover/sidebar:visible'
          ) }
          onClick={ handleCreatePage }
        >
          {
            isPendingCreatePage ?
              <Row
                justify='center'
                align='center'
                classes='btn-icon text-[#686662] p-1'
              >
                <Loading />
              </Row> :
              <Icons.plus className='btn-icon stroke-[0.5px]' />
          }
        </Row>
      </Tooltip.Trigger>

      <Tooltip.Content className='ml-14 mt-1'>
        <div>New page</div>
      </Tooltip.Content>
    </Tooltip>
  );
}
