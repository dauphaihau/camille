'use client';

import React, { useEffect, useState } from 'react';

import { Page } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { StatusCodes } from 'http-status-codes';
import {
  Alert, Button, Col, Icons, Input, Loading, Popover, Row, toast
} from 'core/components';
import { useDeletePage, useGetPagesDeleted } from 'services/query-hooks/page';
import { DELETE_PAGE_TYPE } from 'config/const';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';
import { useStoreMulti } from 'stores/layout-store';
import { useDebounce } from 'core/hooks';
import { freePlan } from 'config/subscriptions';
import { ItemSidebar } from './item-sidebar';

type PageDelete = Pick<Page, 'id' | 'title' | 'deletedAt'> & Partial<Pick<Page, 'teamspaceId'>>;

export function PagesInTrashPopover() {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    showPopover: false,
    showDeleteAlert: false,
    isDeleteLoading: false,
    pageDeleteAlert: null as PageDelete | null,
  });

  const {
    workspace: wsTemp,
    setWorkspace,
    setShowLimitedPagesBar,
  } = useStoreMulti('setWorkspace', 'workspace', 'setShowLimitedPagesBar');

  const { data: { workspace } = {} } = useGetDetailWorkspace();

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(setSearchValue);

  const {
    isPending: isPendingGetPagesDeleted,
    data: pagesDeleted,
    refetch: refetchGetPagesDeleted,
  } = useGetPagesDeleted(
    state.showPopover,
    searchValue
  );

  const {
    mutateAsync: deletePage,
  } = useDeletePage();

  useEffect(() => {
    if (state.showPopover) {
      (async () => await refetchGetPagesDeleted())();
    }
  }, [refetchGetPagesDeleted, state.showPopover]);

  async function invalidatePage(page: PageDelete) {
    if (!workspace) return;

    if (page?.teamspaceId) {
      await queryClient.invalidateQueries({
        queryKey: ['teamspace-pages', page.teamspaceId],
      });
    }
    else {
      await queryClient.invalidateQueries({
        queryKey: ['private-pages', workspace.id],
      });
    }
  }

  const handleDelete = async (
    event: React.MouseEvent<SVGElement | HTMLButtonElement, MouseEvent>,
    page: PageDelete | null,
    type = DELETE_PAGE_TYPE.HARD_DELETE
  ) => {
    event.preventDefault();
    if (!workspace?.id || !page || !wsTemp) return;

    if (
      type === DELETE_PAGE_TYPE.RECOVER &&
      workspace.isLimitedPages &&
      wsTemp.totalPages >= freePlan.limitedPages
    ) {
      setShowLimitedPagesBar(true);
      return;
    }

    const response = await deletePage({
      workspaceId: workspace?.id,
      pageId: page.id,
      type,
    });

    if (response.code !== StatusCodes.NO_CONTENT) {
      if (response.code === StatusCodes.PAYMENT_REQUIRED) {
        setShowLimitedPagesBar(true);
        return;
      }
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not deleted. Please try again.',
        type: 'error',
      });
      return;
    }
    setState({ ...state, showDeleteAlert: false });

    if (type === DELETE_PAGE_TYPE.RECOVER) {
      await invalidatePage(page);

      if (workspace.isLimitedPages) {
        setWorkspace({ ...wsTemp, totalPages: wsTemp.totalPages + 1 });
      }
    }
    await refetchGetPagesDeleted();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const Pages = () => {
    if (isPendingGetPagesDeleted) {
      return (
        <Col
          classes='h-full'
          justify='center'
          align='center'
        >
          <Loading />
        </Col>
      );
    }

    if (!pagesDeleted || pagesDeleted.length === 0) {
      return (
        <Col
          classes='h-full'
          justify='center'
          align='center'
        >
          <div className='text-[#b2b2af] text-sm font-medium'>not found page</div>
        </Col>
      );
    }

    return (
      <div>
        { pagesDeleted.map((page, index) => (
          <Row
            justify='between'
            align='center'
            key={ index }
            classes='hover:bg-accent-light py-2 px-2 rounded-md cursor-pointer'
          >
            <Link
              href={ `/${workspace?.domain}/${page.id}` }
              onClick={ () => setState({ ...state, showPopover: false }) }
            >
              <Col gap={ 1 }>
                <p className='text-sm font-medium'>{ page.title }</p>
                {
                  page?.teamspace?.name && <p className='text-sm font-medium text-[#a09f9d]'>{ page.teamspace.name }</p>
                }
              </Col>
            </Link>
            <Row
              align='center'
              gap={ 1 }
            >
              <Icons.arrowBack
                className='btn-icon'
                onClick={ (e) => handleDelete(e, page, DELETE_PAGE_TYPE.RECOVER) }
              />
              <Icons.trash
                className='btn-icon'
                onClick={ () => {
                  setState({ ...state, showDeleteAlert: true, pageDeleteAlert: page });
                } }
              />
            </Row>
          </Row>
        )) }
      </div>
    );
  };

  return (
    <Popover
      open={ state.showPopover }
      onOpenChange={ (open) => setState({ ...state, showPopover: open }) }
    >
      <Popover.Trigger className='w-full relative'>
        <ItemSidebar
          title='Trash'
          icon='trash'
          titleTooltip='Restore deleted pages.'
        />
      </Popover.Trigger>

      <Popover.Content
        side='right'
        className='w-[414px] ml-3 mt-32 p-1'
      >
        <div className='m-2'>
          <Input
            id='search'
            placeholder='Filter by page title ...'
            onChange={ handleSearch }
          />
        </div>
        <div className='h-96 overflow-scroll '>
          <Pages />
        </div>

        <Alert
          open={ state.showDeleteAlert }
          onOpenChange={ (open) => setState({ ...state, showDeleteAlert: open }) }
        >
          <Alert.Content>
            <Alert.Header>
              <Alert.Title>
                Are you sure you want to delete this page permanently?
              </Alert.Title>
              <Alert.Description>This action cannot be undone.</Alert.Description>
            </Alert.Header>
            <Alert.Footer>
              <Alert.Cancel>Cancel</Alert.Cancel>
              <Alert.Action onClick={ (e) => handleDelete(e, state.pageDeleteAlert) }>
                <Button
                  color='red'
                  isLoading={ state.isDeleteLoading }
                >Yes, Delete it
                </Button>
              </Alert.Action>
            </Alert.Footer>
          </Alert.Content>
        </Alert>

      </Popover.Content>
    </Popover>
  );
}
