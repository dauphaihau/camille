'use client';

import React, { useReducer } from 'react';
import { useParams, useRouter } from 'next/navigation';
import hotToast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';
import {
  Col, DropdownMenu, Icons, toast, Toast, Tooltip
} from 'core/components';
import { useCreatePage, useDeletePage, useGetCurrentPage } from 'lib/request-client/page';
import { cn, formatDate, getValueOfLastBracketInString } from 'core/helpers';
import { DELETE_PAGE_TYPE, PATH } from 'config/const';
import { DashboardSlugs } from 'types/workspace';

interface PageOperationsProps {
  classesContent?: string;
}

interface EventState {
  showDropdown: boolean,
}

export function PageOperations({
  classesContent,
}: PageOperationsProps) {
  const router = useRouter();
  const slugs = useParams<DashboardSlugs>();
  const queryClient = useQueryClient();

  const { data: page } = useGetCurrentPage();

  const [state, setState] = useReducer(
    (state: EventState, newState: Partial<EventState>) => ({
      ...state, ...newState,
    }),
    {
      showDropdown: false,
    }
  );

  const {
    mutateAsync: createPage,
    isError: isErrorCreatePage,
  } = useCreatePage();

  const {
    mutateAsync: deletePage,
    isError: isErrorDeletePage,
  } = useDeletePage();

  async function handleUndo() {
    if (!page) return;
    await deletePage({
      pageId: page.id,
      type: DELETE_PAGE_TYPE.RECOVER,
    });

    if (isErrorDeletePage) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not undo. Please try again.',
        type: 'error',
      });
      return;
    }
    router.refresh();
  }

  async function handleDelete() {
    if (!page) return;
    setState({ showDropdown: false });

    await deletePage({
      pageId: page.id,
      type: DELETE_PAGE_TYPE.SOFT_DELETE,
    });

    if (isErrorDeletePage) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not deleted. Please try again.',
        type: 'error',
      });
      return;
    }

    hotToast.custom(
      ({ visible }) => (
        <Toast
          visible={ visible }
          className='bg-black text-white'
        >
          <Toast.Description>
            <p className='font-semibold'>Moved to trash</p> { ' ' }|
            <p
              className='font-semibold cursor-pointer'
              onClick={ handleUndo }
            >
            Undo
            </p>
          </Toast.Description>
        </Toast>
      ),
      { duration: 3000, position: 'bottom-center' }
    );
    await queryClient.invalidateQueries({
      queryKey: ['notebook', page.notebookId],
    });

    if (slugs?.pageId === page.id) {
      router.push(slugs?.domainWorkspace ? `/${slugs.domainWorkspace}` : PATH.HOME);
    }
  }

  async function handleDuplicatePage() {
    if (!page) return;
    let pageTitle = getValueOfLastBracketInString(page.title);

    if (!pageTitle) {
      pageTitle = page.title + ' (1)';
    } else {
      const increase = Number(pageTitle) + 1;
      pageTitle = page.title.substring(0, page.title.length - 3) + `(${increase})`;
    }

    const response = await createPage({
      notebookId: page.notebookId,
      title: pageTitle,
      content: page.content,
    });

    if (isErrorCreatePage) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not duplicate. Please try again.',
        type: 'error',
      });
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ['notebook', page.notebookId],
    });

    if (response?.data?.pageId && slugs?.domainWorkspace) {
      router.push(`/${slugs.domainWorkspace}/${page.notebookId}/${response.data.pageId}`);
    }
  }

  async function copyToClipBoard() {
    if (!page) return;

    let pageURL;
    if (slugs?.pageId === page.id) {
      pageURL = window.location.href;
    } else {

      if (!slugs?.domainWorkspace) return;

      pageURL = window.location.origin + `/${slugs.domainWorkspace}/${page.notebookId}/${page.id}`;
    }

    try {
      await navigator.clipboard.writeText(pageURL);
      hotToast.custom(
        ({ visible }) => (
          <Toast
            visible={ visible }
            className='bg-black text-white'
          >
            <Toast.Description>
              <p className='font-semibold'>Copied!</p> { ' ' }
            </Toast.Description>
          </Toast>
        ),
        { duration: 3000, position: 'bottom-center' }
      );

    } catch (err) {
      // setCopySuccess('Failed to copy!');
    }
  }

  return (
    <>
      <DropdownMenu
        open={ state.showDropdown }
        onOpenChange={ (open) => setState({ showDropdown: open }) }
      >
        <DropdownMenu.Trigger>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <div>
                <Icons.ellipsisHorizontal
                  size={ 12 }
                  className={ cn('btn-icon text-[#686662]',
                    'hover:bg-accent-light'
                  ) }
                />
              </div>
            </Tooltip.Trigger>
            {
              !state.showDropdown && (
                <Tooltip.Content className='mt-2 mr-4'>
                    Delete, duplicate, and more...
                </Tooltip.Content>
              )
            }
          </Tooltip>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={ cn('absolute w-[265px] top-0',
              'right-0',
              classesContent
            ) }
          >
            <DropdownMenu.Item onClick={ handleDelete }>Delete</DropdownMenu.Item>
            <DropdownMenu.Item onClick={ handleDuplicatePage }>Duplicates</DropdownMenu.Item>
            <DropdownMenu.Item onClick={ copyToClipBoard }>Copy link</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item className='hover:bg-white'>
              <Col>
                <p className='text-xs text-[#9b9a98] mb-1.5'>Last edited
                  by { page?.createdByUser?.email && page?.createdByUser?.email.split('@')[0] }
                </p>
                {
                  page?.updatedAt && <p className='text-xs text-[#9b9a98]'>{ formatDate(page.updatedAt) }</p>
                }
              </Col>
            </DropdownMenu.Item>

          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
    </>
  );
}
