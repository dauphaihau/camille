'use client';

import React, { useEffect, useState } from 'react';

import { Page } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import {
  Alert, Button, Col, Icons, Input, Loading, Popover, Row, toast
} from 'core/components';
import { useDeletePage, useGetPagesDeleted } from 'lib/request-client/page';
import { DELETE_PAGE_TYPE } from 'config/const';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { ItemSidebar } from './item-sidebar';

export function PagesInTrashPopover() {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    showPopover: false,
    showDeleteAlert: false,
    isDeleteLoading: false,
    pageDelete: null,
  });

  const { data: { workspace } = {} } = useGetDetailWorkspace();

  const { isLoading, data: { pages } = {}, refetch } = useGetPagesDeleted(
    state.showPopover && workspace?.id ? workspace.id : undefined
  );

  const {
    mutateAsync: deletePage,
    isError: isErrorDeletePage,
  } = useDeletePage();

  useEffect(() => {
    if (state.showPopover) {
      (async () => await refetch())();
    }
  }, [refetch, state.showPopover]);

  const handleDelete = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    page: Page,
    type = DELETE_PAGE_TYPE.HARD_DELETE
  ) => {
    event.preventDefault();
    await deletePage({
      pageId: page.id,
      type,
    });

    if (isErrorDeletePage) {
      toast({
        title: 'Something went wrong.',
        message: 'Your post was not deleted. Please try again.',
        type: 'error',
      });
      return;
    }
    setState({ ...state, showDeleteAlert: false });
    if (type === DELETE_PAGE_TYPE.RECOVER) {
      await queryClient.invalidateQueries({
        queryKey: ['notebook', page.notebookId],
      });
    }
    await refetch();
  };

  const Pages = () => {
    if (isLoading) {
      return (
        <div className='mx-auto'>
          <Loading />
        </div>
      );
    }

    if (!pages || pages.length === 0) {
      return <div className='mx-auto text-[#b2b2af] text-sm font-medium'>not found page</div>;
    }

    return (
      <div>
        { pages.map((page, index) => (
          <Row
            justify='between'
            align='center'
            key={ index }
            classes='hover:bg-accent-light py-2 px-2 rounded-md cursor-pointer'
          >
            <Col gap={ 1 }>
              <p className='text-sm font-medium'>{ page.title }</p>
              <p className='text-sm font-normal text-[#a09f9d]'>{ page.notebook?.title }</p>
            </Col>
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
                  setState({ ...state, showDeleteAlert: true, pageDelete: page });
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
        <div className='mb-2 px-2 mt-2'>
          <Input
            id='search'
            placeholder='Filter by page title ...'
          />
        </div>
        <div className='h-[380px] overflow-scroll '>
          <Col gap={ 2 }>
            <Pages />
          </Col>
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
              <Alert.Action onClick={ (e) => handleDelete(e, state.pageDelete) }>
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
