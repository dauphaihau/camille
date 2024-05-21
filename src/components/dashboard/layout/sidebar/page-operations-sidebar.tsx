'use client';

import React, { useReducer } from 'react';
import { useParams, useRouter } from 'next/navigation';
import hotToast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import {
  Favorite, Notebook, Page, User
} from '@prisma/client';

import {
  Col, DropdownMenu, Icons, Input, Popover, Toast, toast, Tooltip
} from 'core/components';
import {
  useAddPageToFavorite, useCreatePage, useDeletePage, useUpdatePage
} from 'lib/request-client/page';
import {
  cn, formatDate, getValueOfLastBracketInString
} from 'core/helpers';
import { DELETE_PAGE_TYPE, PATH } from 'config/const';
import { useStoreMulti } from 'lib/store';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { useDebounce } from 'core/hooks';
import { DashboardSlugs } from 'types/workspace';
import { IUpdatePage } from 'types/page';

interface PageOperationsSidebarProps {
  page: Pick<Page, 'id' | 'title' | 'content' | 'updatedAt' | 'updatedBy' | 'notebookId'> & {
    favorites?: Favorite[]
    createdByUser: Pick<User, 'email'>
    isFavorite: boolean
  };
  notebook: Pick<Notebook, 'id' | 'title'>;
  classesTrigger?: string;
  classesContent?: string;
  placeOnGroup?: 'private' | 'favorites' | 'teamspace';
}

interface State {
  showDropdown: boolean,
  showRenameForm: boolean,
  isFavorite: boolean,
}

export function PageOperationsSidebar({
  page,
  classesContent,
  notebook,
  placeOnGroup,
}: PageOperationsSidebarProps) {
  const router = useRouter();
  const slugs = useParams<DashboardSlugs>();
  const queryClient = useQueryClient();

  const { setPage } = useStoreMulti('setPage');

  const { data: { workspace } = {} } = useGetDetailWorkspace();

  const {
    mutateAsync: deletePage,
    isError: isErrorDeletePage,
  } = useDeletePage();

  const {
    mutateAsync: addPageToFavorite,
    isError: isErrorAddPageToFavorite,
  } = useAddPageToFavorite();

  const debouncedChangeTitle = useDebounce(handleUpdatePage, 400);

  const {
    mutateAsync: createPage,
    isError: isErrorCreatePage,
  } = useCreatePage();

  const {
    mutateAsync: updatePage,
    isError: isErrorUpdatePage,
  } = useUpdatePage(page?.id);

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
    queryClient.invalidateQueries({
      queryKey: ['notebook', notebook.id],
    });
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
    queryClient.invalidateQueries({
      queryKey: ['notebook', notebook.id],
    });

    if (slugs?.pageId === page.id) {
      router.push(slugs?.domainWorkspace ? `/${slugs.domainWorkspace}` : PATH.HOME);
    }
  }

  async function handleUpdatePage(values: IUpdatePage) {
    if (!page) return;
    await updatePage(values);

    if (isErrorUpdatePage) {
      toast({
        title: 'Something went wrong.',
        message: 'Your page was not saved. Please try again.',
        type: 'error',
      });
      return;
    }
    await queryClient.invalidateQueries({
      queryKey: ['notebook', notebook.id],
    });
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

    console.log('page', page);
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
    }

    await queryClient.invalidateQueries({
      queryKey: ['notebook', notebook.id],
    });

    if (response?.data?.pageId && slugs?.domainWorkspace) {
      router.push(`/${slugs.domainWorkspace}/${page.notebookId}/${response.data.pageId}`);
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
    await queryClient.invalidateQueries({
      queryKey: ['notebook', slugs?.notebookId],
    });
    await queryClient.invalidateQueries({
      queryKey: ['page', slugs?.pageId],
    });
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

  async function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setPage({ ...page, title: e.target.value });
    await debouncedChangeTitle({ title: e.target.value });
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
          <DropdownMenu.Content
            className={ cn('absolute w-[265px] top-0',
              '-left-2',
              classesContent
            ) }
          >
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

      <Popover open={ state.showRenameForm }>
        <Popover.Trigger
          className={ cn('w-full invisible',
            state.showRenameForm ? '' : 'absolute right-0 bottom-0'
          ) }
        />
        <Popover.Content
          onPointerDownOutside={ () => setState({ showRenameForm: false }) }
          side='bottom'
          className='w-[414px] ml-12 mt-22'
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
