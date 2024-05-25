import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Row, toast } from 'core/components';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';
import { useDeletePage, useGetCurrentPage } from 'services/query-hooks/page';
import { DELETE_PAGE_TYPE } from 'config/const';
import { freePlan } from 'config/subscriptions';
import { useStoreMulti } from 'stores/layout-store';

export function TrashedPageBar() {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  const { data: page, refetch } = useGetCurrentPage();
  const queryClient = useQueryClient();

  const {
    workspace: wsTemp,
    setWorkspace,
    setShowLimitedPagesBar,
  } = useStoreMulti('setWorkspace', 'workspace', 'setShowLimitedPagesBar');

  const {
    mutateAsync: deletePage,
    isError: isErrorDeletePage,
  } = useDeletePage();

  const handleDelete = async (type = DELETE_PAGE_TYPE.HARD_DELETE) => {
    if (!page?.id || !workspace || !wsTemp) return;

    if (
      type === DELETE_PAGE_TYPE.RECOVER &&
      workspace.isLimitedPages &&
      wsTemp.totalPages >= freePlan.limitedPages
    ) {
      setShowLimitedPagesBar(true);
      return;
    }

    await deletePage({
      workspaceId: workspace.id,
      pageId: page.id,
      type,
    });

    if (isErrorDeletePage) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not deleted. Please try again.',
        type: 'error',
      });
      return;
    }

    if (type === DELETE_PAGE_TYPE.RECOVER) {
      if (workspace.isLimitedPages) {
        setWorkspace({ ...wsTemp, totalPages: wsTemp.totalPages + 1 });
      }
      if (page.teamspaceId) {
        await queryClient.invalidateQueries({
          queryKey: ['teamspace-pages', page.teamspaceId],
        });
      }
      else {
        await queryClient.invalidateQueries({
          queryKey: ['private-pages', workspace?.id],
        });
      }
      await refetch();
    }
  };

  if (page?.deletedAt) {
    return (
      <Row
        justify='center'
        align='center'
        gap={ 2 }
        classes='text-white text-center py-2 text-sm font-medium bg-red-500/80 h-10'
      >
        <div>This page is in trash .</div>
        <div
          onClick={ () => handleDelete(DELETE_PAGE_TYPE.RECOVER) }
          className='text-white text-sm py-0.5 px-2 rounded cursor-pointer flex items-center gap-2 border border-white'
        >
          Restore page
        </div>
        <div
          onClick={ () => handleDelete(DELETE_PAGE_TYPE.HARD_DELETE) }
          className='text-white text-sm py-0.5 px-2 rounded cursor-pointer flex items-center gap-2 border border-white'
        >
          Delete from trash
        </div>
      </Row>
    );
  }
  return null;
}
