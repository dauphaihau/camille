'use client';

import React, { useReducer } from 'react';
import { useParams, useRouter } from 'next/navigation';
import hotToast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import {
  Col, DropdownMenu, Icons, toast, Toast, Tooltip
} from 'core/components';
import {
  useCreatePage,
  useDeletePage,
  useGetCurrentPage,
  useGetPagesByTeamspace,
  useGetPrivatePages
} from 'services/query-hooks/page';
import { cn, formatDate, getValueOfLastBracketInString } from 'core/helpers';
import { DELETE_PAGE_TYPE } from 'config/const';
import { DashboardSlugs } from 'types/workspace';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';
import { useStoreMulti } from 'stores/layout-store';
import { freePlan } from 'config/subscriptions';

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

  const {
    workspace: wsTemp,
    setWorkspace,
    setShowLimitedPagesBar,
  } = useStoreMulti('setWorkspace', 'workspace', 'setShowLimitedPagesBar');

  const { data: { workspace } = {} } = useGetDetailWorkspace();
  const { data: page } = useGetCurrentPage();
  const { data: privatePages, refetch: refetchGetPrivatePages } = useGetPrivatePages();
  const {
    data: pagesOfTeamspace,
    refetch: refetchGetPagesByTeamspace,
  } = useGetPagesByTeamspace(page?.teamspaceId ?? undefined);

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
  } = useCreatePage();

  const {
    mutateAsync: deletePage,
  } = useDeletePage();

  async function invalidatePagesSidebar() {
    if (!page) return;
    if (page.teamspaceId) {
      await refetchGetPagesByTeamspace();
    } else {
      await refetchGetPrivatePages();
    }
  }

  async function handleUndo() {
    if (!page?.id || !workspace) return;

    const response = await deletePage({
      workspaceId: workspace.id,
      pageId: page.id,
      type: DELETE_PAGE_TYPE.RECOVER,
    });
    if (response.code !== StatusCodes.NO_CONTENT) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not undo. Please try again.',
        type: 'error',
      });
      return;
    }
    await invalidatePagesSidebar();
  }

  async function handleDelete() {
    if (!page?.id || !workspace || !wsTemp) return;
    setState({ showDropdown: false });

    const response = await deletePage({
      workspaceId: workspace.id,
      pageId: page.id,
      type: DELETE_PAGE_TYPE.SOFT_DELETE,
    });

    if (response.code !== StatusCodes.NO_CONTENT) {
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
            <p className='font-semibold'>Moved to trash</p> { ' ' } | { ' ' }
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

    if (workspace.isLimitedPages) {
      setWorkspace({ ...wsTemp, totalPages: wsTemp.totalPages - 1 });
    }

    await invalidatePagesSidebar();

    if (slugs?.pageId === page.id) {

      if (!page.teamspaceId && privatePages && privatePages.length > 1) {
        for (let i = privatePages.length - 1; i >= 0; i--) {
          if (privatePages[i].id !== page.id) {
            router.push(`/${slugs?.domainWorkspace}/${privatePages[i].id}`);
            return;
          }
        }
      } else if (page.teamspaceId && pagesOfTeamspace && pagesOfTeamspace.length > 0) {
        for (let i = pagesOfTeamspace.length - 1; i >= 0; i--) {
          if (pagesOfTeamspace[i].id !== page.id) {
            router.push(`/${slugs?.domainWorkspace}/${pagesOfTeamspace[i].id}`);
            return;
          }
        }
      }

      await queryClient.invalidateQueries({
        queryKey: ['page', page.id],
      });
    }
  }

  async function handleDuplicatePage() {
    if (!page?.title || !workspace || !wsTemp) return;

    if (workspace.isLimitedPages && wsTemp.totalPages >= freePlan.limitedPages) {
      setShowLimitedPagesBar(true);
      return;
    }

    const num = getValueOfLastBracketInString(page.title);
    if (!num) {
      page.title = page.title + ' (1)';
    } else {
      const increase = num + 1;
      page.title = page.title.substring(0, page.title.length - 3) + `(${increase})`;
    }

    const response = await createPage({
      workspaceId: workspace.id,
      title: page.title,
      content: page.content,
    });

    if (response.code !== StatusCodes.CREATED) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not duplicate. Please try again.',
        type: 'error',
      });
      return;
    }

    await invalidatePagesSidebar();

    if (workspace.isLimitedPages) {
      setWorkspace({ ...wsTemp, totalPages: wsTemp.totalPages + 1 });
    }

    if (response?.data?.pageId && slugs?.domainWorkspace) {
      router.push(`/${slugs.domainWorkspace}/${response.data.pageId}`);
    }
  }

  async function copyToClipBoard() {
    if (!page) return;

    let pageURL;
    if (slugs?.pageId === page.id) {
      pageURL = window.location.href;
    } else {

      if (!slugs?.domainWorkspace) return;

      pageURL = window.location.origin + `/${slugs.domainWorkspace}/${page.id}`;
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
                  by { page?.updatedByUser?.email && page.updatedByUser.email.split('@')[0] }
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
