'use client';

import React, { useReducer } from 'react';
import { useParams, useRouter } from 'next/navigation';
import hotToast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Page, Teamspace, User } from '@prisma/client';

import { StatusCodes } from 'http-status-codes';
import {
  useAddPageToFavorite,
  useCreatePage,
  useDeletePage,
  useGetPagesByTeamspace,
  useGetPrivatePages,
  useUpdatePage
} from 'services/query-hooks/page';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';
import {
  Col, DropdownMenu, Icons, Input, Popover, Toast, toast, Tooltip
} from 'core/components';
import {
  cn, formatDate, getValueOfLastBracketInString
} from 'core/helpers';
import { DELETE_PAGE_TYPE } from 'config/const';
import { useStoreMulti } from 'stores/layout-store';
import { useDebounce } from 'core/hooks';
import { DashboardSlugs } from 'types/workspace';
import { IUpdatePage } from 'types/page';
import { freePlan } from 'config/subscriptions';

interface PageOperationsSidebarProps {
  page: Pick<Page, 'id' | 'title' | 'content' | 'updatedAt' | 'workspaceId'> & {
    updatedByUser?: Pick<User, 'email'>
    isFavorite: boolean
  };
  placeOnGroup?: 'private' | 'favorites' | 'teamspace';
  teamspaceId?: Teamspace['id'] | null
}

interface State {
  showDropdown: boolean,
  showRenameForm: boolean,
  isFavorite: boolean,
}

export function PageOperationsSidebar({
  page,
  teamspaceId = null,
  placeOnGroup,
}: PageOperationsSidebarProps) {
  const router = useRouter();
  const slugs = useParams<DashboardSlugs>();
  const queryClient = useQueryClient();

  const {
    workspace: wsTemp,
    setWorkspace,
    setPage,
    setShowLimitedPagesBar,
  } = useStoreMulti('setWorkspace', 'workspace', 'setShowLimitedPagesBar', 'setPage');

  const { data: { workspace } = {} } = useGetDetailWorkspace();

  const { data: privatePages, refetch: refetchGetPrivatePages } = useGetPrivatePages();

  const {
    data: pagesOfTeamspace,
    refetch: refetchGetPagesByTeamspace,
  } = useGetPagesByTeamspace(teamspaceId ?? undefined);

  const {
    mutateAsync: deletePage,
  } = useDeletePage();

  const {
    mutateAsync: addPageToFavorite,
    isError: isErrorAddPageToFavorite,
  } = useAddPageToFavorite();

  const debouncedChangeTitle = useDebounce(handleUpdatePage, 400);

  const {
    mutateAsync: createPage,
  } = useCreatePage();

  const {
    mutateAsync: updatePage,
    isError: isErrorUpdatePage,
  } = useUpdatePage();

  const [state, setState] = useReducer(
    (state: State, newState: Partial<State>) => ({
      ...state, ...newState,
    }),
    {
      showDropdown: false,
      showRenameForm: false,
      isFavorite: page?.isFavorite,
    }
  );

  async function invalidatePagesSidebar() {
    if (!page) return;
    if (teamspaceId) {
      await refetchGetPagesByTeamspace();
    }
    else {
      await refetchGetPrivatePages();
    }
  }

  async function handleUndo() {
    if (!page || !workspace) return;

    const response = await deletePage({
      workspaceId: workspace?.id,
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
    if (!page || !workspace || !wsTemp) return;
    setState({ showDropdown: false });

    const response = await deletePage({
      workspaceId: workspace?.id,
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
            > Undo
            </p>
          </Toast.Description>
        </Toast>
      ),
      { duration: 300, position: 'bottom-center' }
    );

    if (workspace.isLimitedPages) {
      setWorkspace({ ...wsTemp, totalPages: wsTemp.totalPages - 1 });
    }

    await invalidatePagesSidebar();

    if (page.isFavorite) {
      await queryClient.invalidateQueries({
        queryKey: ['favorites-pages', workspace.id],
      });
    }

    if (slugs?.pageId === page.id) {
      if (!teamspaceId && privatePages && privatePages.length > 1) {
        for (let i = privatePages.length - 1; i >= 0; i--) {
          if (privatePages[i].id !== page.id) {
            router.push(`/${slugs?.domainWorkspace}/${privatePages[i].id}`);
            return;
          }
        }
      }
      else if(teamspaceId && pagesOfTeamspace && pagesOfTeamspace.length > 0) {
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

  async function handleUpdatePage(values: IUpdatePage) {
    if (!page) return;
    values.id = page.id;
    await updatePage(values);

    if (isErrorUpdatePage) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not saved. Please try again.',
        type: 'error',
      });
      return;
    }
    if (slugs?.pageId === page.id) {
      await queryClient.invalidateQueries({
        queryKey: ['page', page.id],
      });
    }
    await queryClient.invalidateQueries({
      queryKey: ['private-pages', workspace?.id],
    });
  }

  async function handleDuplicatePage() {
    if (!page || !workspace || !wsTemp) return;

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
      workspaceId: page.workspaceId,
      teamspaceId,
      title: page.title,
      content: page.content,
    });

    if (response.code !== StatusCodes.CREATED) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not duplicate. Please try again.',
        type: 'error',
      });
    }

    if (workspace.isLimitedPages) {
      setWorkspace({ ...wsTemp, totalPages: wsTemp.totalPages + 1 });
    }

    await invalidatePagesSidebar();

    if (response?.data?.pageId && slugs?.domainWorkspace) {
      router.push(`/${slugs.domainWorkspace}/${response.data.pageId}`);
    }
  }

  async function handleAddToFavorite() {
    if (!workspace || !page) return null;

    await addPageToFavorite({
      workspaceId: workspace.id,
      pageId: page.id,
    });

    if (isErrorAddPageToFavorite) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not add to favorite. Please try again.',
        type: 'error',
      });
      return;
    }

    setState({ isFavorite: !state.isFavorite });

    await queryClient.invalidateQueries({
      queryKey: ['favorites-pages', workspace.id],
    });

    await invalidatePagesSidebar();

    if (slugs?.pageId === page.id) {
      await queryClient.invalidateQueries({
        queryKey: ['page', slugs?.pageId],
      });
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

  async function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setPage({ ...page, title: e.target.value });
    await debouncedChangeTitle({
      id: page?.id,
      title: e.target.value,
    });
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
                  className={ cn('btn-icon text-[#686662]') }
                />
              </div>
            </Tooltip.Trigger>
            {
              !state.showDropdown && (
                <Tooltip.Content>
                   Delete, duplicate, and more...
                </Tooltip.Content>
              )
            }
          </Tooltip>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={ cn('absolute w-[265px] top-0 left-[-1rem]') }>
            {
              placeOnGroup !== 'favorites' && (
                <>
                  <DropdownMenu.Item onClick={ handleDelete }>Delete</DropdownMenu.Item>
                  <DropdownMenu.Item onClick={ handleDuplicatePage }>Duplicates</DropdownMenu.Item>
                </>
              )
            }
            <DropdownMenu.Item onClick={ copyToClipBoard }>Copy link</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onClick={ handleAddToFavorite }>
              { page.isFavorite ? 'Remove from favorites' : 'Add to favorites' }
            </DropdownMenu.Item>
            { /*
            <DropdownMenu.Item onClick={ () => setState({ showRenameForm: true }) }>
              Rename
            </DropdownMenu.Item>
            */ }
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

      <Popover open={ state.showRenameForm }>
        <Popover.Trigger
          className={ cn('w-full invisible',
            state.showRenameForm ? '' : 'absolute right-0 bottom-0'
          ) }
        />
        <Popover.Content
          onPointerDownOutside={ () => setState({ showRenameForm: false }) }
          side='bottom'
          className='w-[414px] ml-12 mt-22 p-1.5'
        >
          <Input
            id='pageTitle'
            defaultValue={ page?.title }
            onChange={ handleChangeTitle }
          />
        </Popover.Content>
      </Popover>
    </>
  );
}
