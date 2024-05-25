'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Teamspace } from '@prisma/client';

import { useReducer } from 'react';
import { DropdownMenu } from 'core/components/dropdown';
import { Button, Icons, Tooltip } from 'core/components';
import { Alert } from 'core/components/alert';
import { toast } from 'core/components';
import { cn } from 'core/helpers';
import { useArchiveTeamspace } from 'services/query-hooks/teamspace';

interface TeamspaceOperationsSidebar {
  teamspace: Pick<Teamspace, 'id' | 'name' | 'isOrigin'>;
}

interface State {
  showDeleteAlert: boolean,
  showDropdown: boolean,
}

export function TeamspaceOperationsSidebar(
  { teamspace }: TeamspaceOperationsSidebar
) {
  const router = useRouter();

  const [state, setState] = useReducer(
    (state: State, newState: Partial<State>) => ({
      ...state, ...newState,
    }),
    {
      showDeleteAlert: false,
      showDropdown: false,
    }
  );

  const {
    isPending: isPendingArchiveTeamspace,
    mutateAsync: archiveTeamspace,
    isError: isErrorArchiveTeamspace,
  } = useArchiveTeamspace(teamspace.id);

  async function handleArchiveTeamspace() {
    await archiveTeamspace();

    if (isErrorArchiveTeamspace) {
      toast({
        title: 'Something went wrong.',
        message: 'Your teamspace was not archived. Please try again.',
        type: 'error',
      });
      return;
    }

    setState({ showDeleteAlert: false });
    router.refresh();
    toast({
      type: 'success',
      message: `Archived ${teamspace.name}`,
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
                  className={ cn('btn-icon') }
                />
              </div>
            </Tooltip.Trigger>

            {
              !state.showDropdown &&
              <Tooltip.Content>
                <div>Teamspace settings and members</div>
              </Tooltip.Content>
            }
          </Tooltip>

        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={ cn('absolute w-[265px] top-0 left-[-1rem]') }
          >
            <DropdownMenu.Item disabled>Add members</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item disabled>Teamspace settings</DropdownMenu.Item>
            <DropdownMenu.Item
              disabled={ teamspace?.isOrigin ?? false }
              onSelect={ () => setState({ showDeleteAlert: true }) }
              className='text-red-600'
            >
              Archive teamspace
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
              Are you sure you want to archive this teamspace?
            </Alert.Title>
            <Alert.Description>
              Archiving this teamspace will remove access and hide it in the sidebar for all teamspace
              members. Type the teamspace name to confirm.
            </Alert.Description>
          </Alert.Header>

          <Alert.Footer>
            <Alert.Cancel>Cancel</Alert.Cancel>
            <Alert.Action onClick={ handleArchiveTeamspace }>
              <Button
                isLoading={ isPendingArchiveTeamspace }
                color='red'
              >Archive teamspace
              </Button>
            </Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>
    </>
  );
}
