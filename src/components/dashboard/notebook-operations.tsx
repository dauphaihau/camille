'use client';

import { Notebook } from '@prisma/client';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useReducer } from 'react';

import * as React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Alert, Button, DropdownMenu, Icons, Input, Popover, toast
} from 'core/components';
import { useDeleteNotebook, useUpdateNotebook } from 'lib/request-client/notebook';
import { cn } from 'core/helpers';
import { PATH } from 'config/const';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { useDebounce } from 'core/hooks';
import { IUpdateNotebook } from 'types/notebook';

interface NotebookOperationsProps {
  notebook: Pick<Notebook, 'id' | 'title'>,
  placeOnSidebar?: boolean
  teamspaceId?: string
}

interface State {
  showDropdown: boolean,
  showRenameForm: boolean,
  showDeleteAlert: boolean,
}

export function NotebookOperations(
  { teamspaceId, notebook, placeOnSidebar = false }: NotebookOperationsProps
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentNotebookId = useSelectedLayoutSegment();
  const { data: { workspace } = {} } = useGetDetailWorkspace();

  const {
    mutateAsync: updateNotebook,
    isError: isErrorUpdateNotebook,
  } = useUpdateNotebook(notebook.id);

  const {
    isPending: isPendingDeleteNotebook,
    mutateAsync: deleteNotebook,
    isError: isErrorDeleteNotebook,
  } = useDeleteNotebook(notebook.id);

  const debouncedUpdateNotebook = useDebounce(handleUpdateNotebook, 400);

  const [state, setState] = useReducer(
    (state: State, newState: Partial<State>) => ({
      ...state, ...newState,
    }),
    {
      showDropdown: false,
      showRenameForm: false,
      showDeleteAlert: false,
    }
  );

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    await deleteNotebook();

    if (isErrorDeleteNotebook) {
      toast({
        title: 'Something went wrong.',
        message: 'Your notebook was not deleted. Please try again.',
        type: 'error',
      });
      return;
    }

    toast({
      message: 'Moved to trash',
      type: 'success',
    });

    setState({ showDeleteAlert: false });

    if (currentNotebookId === notebook.id) {
      router.push(workspace?.domain ? `/${workspace.domain}` : PATH.HOME);
    }

    if (teamspaceId) {
      await queryClient.invalidateQueries({
        queryKey: ['notebooks-by-teamspace', teamspaceId],
      });
    }
  };

  async function handleUpdateNotebook(values: IUpdateNotebook) {
    await updateNotebook(values);

    if (isErrorUpdateNotebook) {
      toast({
        title: 'Something went wrong.',
        message: 'Your notebook was not saved. Please try again.',
        type: 'error',
      });
      return;
    }
    // router.refresh();
  }

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedUpdateNotebook({ title: event.target.value });
  };

  return (
    <>
      <DropdownMenu
        open={ state.showDropdown }
        onOpenChange={ (open) => setState({ showDropdown: open }) }
      >
        <DropdownMenu.Trigger>

          <Icons.ellipsisHorizontal
            size={ 12 }
            className={ cn('btn-icon text-[#686662]'
            ) }
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={ `absolute w-[265px] top-0 ${placeOnSidebar ? '-left-10' : 'right-0'}` }
          >
            <DropdownMenu.Item
              onClick={ () => setState({ showDeleteAlert: true }) }
            >Delete
            </DropdownMenu.Item>
            { /*<DropdownMenu.Item>Duplicates</DropdownMenu.Item>*/ }
            { /*<DropdownMenu.Item>Copy link</DropdownMenu.Item>*/ }
            { /*<DropdownMenu.Separator/>*/ }
            { /*<DropdownMenu.Item>Add to favorites</DropdownMenu.Item>*/ }
            <DropdownMenu.Item
              onClick={ () => setState({ showRenameForm: true }) }
            >Rename
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>

      <Alert
        open={ state.showDeleteAlert }
        onOpenChange={ (open) => setState({ showDeleteAlert: open }) }
      >
        <Alert.Content>
          <Alert.Header>
            <Alert.Title>
              Are you sure you want to delete this notebook?
            </Alert.Title>
            <Alert.Description>This action cannot be undone.</Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Cancel>Cancel</Alert.Cancel>
            <Alert.Action onClick={ handleDelete }>
              <Button
                color='red'
                isLoading={ isPendingDeleteNotebook }
              >Yes, Delete it
              </Button>
            </Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>

      <Popover open={ state.showRenameForm }>
        <Popover.Trigger
          className={ cn('w-full invisible',
            state.showRenameForm ? '' : 'absolute'
          ) }
        />
        <Popover.Content
          onPointerDownOutside={ () => setState({ showRenameForm: false }) }
          side='bottom'
          className='w-[414px] ml-12 mt-22'
        >
          <Input
            defaultValue={ notebook.title }
            onChange={ onChangeTitle }
          />
        </Popover.Content>
      </Popover>
    </>
  );
}
