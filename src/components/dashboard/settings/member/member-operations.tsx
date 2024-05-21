'use client';

import { useRouter } from 'next/navigation';
import { useReducer } from 'react';
import * as React from 'react';
import { User, UserOnWorkspace } from '@prisma/client';

import {
  Button, DropdownMenu, Icons, Row, toast
} from 'core/components';
import { Alert } from 'core/components/alert';
import { cn } from 'core/helpers';
import { PATH, ROLE_USER_ON_WORKSPACE } from 'config/const';
import {
  useDeleteMember, useGetMembersByCurWorkspace, useLeaveWorkspace, useUpdateRoleMember
} from 'lib/request-client/settings-member';
import { LoadingDialog } from 'components/dialog/loading-dialog';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';

interface MemberOperationsProps {
  member: Pick<User, 'id' | 'name'> & Pick<UserOnWorkspace, 'role'>,
  placeOnSidebar?: boolean
  currentUserIsAdmin: boolean
}

interface State {
  showDropdown: boolean,
  showDeleteMemberAlert: boolean,
  showUpdateRoleAlert: boolean,
  showLeaveWorkspaceAlert: boolean,
  userLeaveWorkspace: boolean,
}

export function MemberOperations(
  { member, currentUserIsAdmin }: MemberOperationsProps
) {
  const router = useRouter();
  const { data: { user, workspace } = {} } = useGetDetailWorkspace();
  const { data: members, refetch } = useGetMembersByCurWorkspace();

  const {
    isPending: isPendingUpdateRoleMember,
    mutateAsync: updateRoleMember,
    isError: isErrorUpdateRoleMember,
  } = useUpdateRoleMember();

  const {
    isPending: isPendingDeleteMember,
    mutateAsync: deleteMember,
    isError: isErrorDeleteMember,
  } = useDeleteMember(member.id);

  const {
    isPending: isPendingLeaveWorkspace,
    mutateAsync: leaveWorkspace,
    isError: isErrorLeaveWorkspace,
  } = useLeaveWorkspace();

  const [state, setState] = useReducer(
    (state: State, newState: Partial<State>) => ({
      ...state, ...newState,
    }),
    {
      showDropdown: false,
      showDeleteMemberAlert: false,
      showLeaveWorkspaceAlert: false,
      showUpdateRoleAlert: false,
      userLeaveWorkspace: false,
    }
  );

  if (!user || !user.userOnWorkspace || !workspace) {
    return null;
  }

  async function handleDeleteMember() {
    if (!workspace || !member) return;
    const response = await deleteMember();

    if (isErrorDeleteMember) {
      toast({
        message: 'Something went wrong, please try again.',
        type: 'error',
      });
      return;
    }

    if (response?.code === '403') {
      toast({
        message: response.message,
        type: 'error',
      });
      return;
    }

    setState({ showDeleteMemberAlert: false });

    await refetch();
  }

  async function handleLeaveWorkspace() {
    const response = await leaveWorkspace();

    if (isErrorLeaveWorkspace) {
      toast({
        message: 'Something went wrong, please try again.',
        type: 'error',
      });
      return;
    }

    if (response?.code === '403') {
      toast({
        message: response.message,
        type: 'error',
      });
      return;
    }

    setState({ showLeaveWorkspaceAlert: false });

    // // redirect first workspace in list workspaces user can access
    if (response?.data?.workspace?.domain) {
      return router.push(`/${response.data.workspace.domain}`);
    }
    return router.push(PATH.WORKSPACE);
  }

  async function handleUpdateRole(role: ROLE_USER_ON_WORKSPACE) {
    if (!workspace || member.role === role || !user) return;

    if (role === ROLE_USER_ON_WORKSPACE.MEMBER) {
      if (members && member.id === user.id) {
        const admins = members.filter((m) => m.role === ROLE_USER_ON_WORKSPACE.ADMIN);
        if (admins.length === 1) return setState({ showUpdateRoleAlert: true });
      }
    }

    if (!workspace.isStandard) {
      return router.push(`/${workspace.domain}${PATH.SETTINGS}/plans`);
    }

    if (workspace && member) {
      await updateRoleMember({ userId: member.id, workspaceId: workspace.id, role });

      if (isErrorUpdateRoleMember) {
        toast({
          title: 'Something went wrong.',
          message: 'Your member was not update. Please try again.',
          type: 'error',
        });
        return;
      }
      await refetch();
    }
  }

  const handleShowLeaveWorkspaceAlert = () => {
    setState({ showLeaveWorkspaceAlert: true });
  };

  const handleShowDeleteMemberAlert = () => {
    setState({ showDeleteMemberAlert: true });
  };

  return (
    <>
      <LoadingDialog
        open={ isPendingUpdateRoleMember }
        message='Updating...'
      />
      <DropdownMenu
        open={ state.showDropdown }
        onOpenChange={ (open) => setState({ showDropdown: open }) }
      >
        <DropdownMenu.Trigger disabled={ !currentUserIsAdmin && user.id !== member.id }>
          <Icons.ellipsisHorizontal
            size={ 12 }
            className={ cn('btn-icon group-hover/member:visible text-[#686662]') }
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className='absolute w-[265px] top-0 left-[-13rem]'>
            {
              currentUserIsAdmin && (
                <>
                  <DropdownMenu.Item onClick={ () => handleUpdateRole(ROLE_USER_ON_WORKSPACE.ADMIN) }>
                    <Row
                      align='center'
                      classes='gap-3'
                    >
                      <div>
                        <div className='font-medium'>Admin</div>
                        <div className='text-[#787673] text-xs'>
                        Can change workspace settings and invite new members to the workspace.
                        </div>
                      </div>
                      { member.role === ROLE_USER_ON_WORKSPACE.ADMIN && <Icons.check className='text-2xl' /> }
                    </Row>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={ () => handleUpdateRole(ROLE_USER_ON_WORKSPACE.MEMBER) }>
                    <Row
                      align='center'
                      classes='gap-3'
                    >
                      <div>
                        <Row
                          gap={ 2 }
                          align='center'
                        >
                          <div className='font-medium'>Member</div>
                          {
                            !workspace.isStandard &&
                          <div>
                            <div className='bg-[#e6e6e4] text-[#71706c] text-[9px] py-0.5 px-[6px] rounded-sm leading-none uppercase font-medium'>
                              Standard plan
                            </div>
                          </div>
                          }
                        </Row>
                        <div className='text-[#787673] text-xs'>
                        Cannot change workspace settings or invite new members to the workspace.
                        </div>
                      </div>
                      { member.role === ROLE_USER_ON_WORKSPACE.MEMBER && <Icons.check className='text-2xl' /> }
                    </Row>
                  </DropdownMenu.Item>
                </>
              )
            }
            {
              member.id === user.id && (
                <DropdownMenu.Item
                  className='text-red-400 focus:text-red-400 font-semibold'
                  // onClick={ () => setState({ showDeleteMemberAlert: true, userLeaveWorkspace: true }) }
                  onClick={ handleShowLeaveWorkspaceAlert }
                >Leave workspace
                </DropdownMenu.Item>
              )
            }
            {
              currentUserIsAdmin && member.id !== user.id && (
                <DropdownMenu.Item
                  className='text-red-400 focus:text-red-400 font-semibold'
                  onClick={ handleShowDeleteMemberAlert }
                >
                Remove from workspace
                </DropdownMenu.Item>
              )
            }
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>

      <Alert
        open={ state.showUpdateRoleAlert }
        onOpenChange={ (open) => setState({ showUpdateRoleAlert: open }) }
      >
        <Alert.Content>
          <Alert.Header>
            <Alert.Title>Oops!</Alert.Title>
            <Alert.Description>A workspace must have at least 1 admin</Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Action onClick={ () => setState({ showUpdateRoleAlert: false }) }>
              <Button variant='default'>Okay</Button>
            </Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>

      <Alert
        open={ state.showDeleteMemberAlert }
        onOpenChange={ (open) => setState({ showDeleteMemberAlert: open }) }
      >
        <Alert.Content>
          <Alert.Header>
            <Alert.Title>Are you sure you want to remove this person?</Alert.Title>
            <Alert.Description>
              They will lose access to the workspace, and any private notebooks will be lost.
            </Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Cancel>Cancel</Alert.Cancel>
            <Alert.Action onClick={ handleDeleteMember }>
              <Button
                color='red'
                isLoading={ isPendingDeleteMember }
              >Remove
              </Button>
            </Alert.Action>
          </Alert.Footer>

        </Alert.Content>
      </Alert>

      <Alert
        open={ state.showLeaveWorkspaceAlert }
        onOpenChange={ (open) => setState({ showLeaveWorkspaceAlert: open }) }
      >
        {
          workspace && workspace.totalMembers === 1 ?
            <Alert.Content>
              <Alert.Header>
                <Alert.Title>Oops!</Alert.Title>
                <Alert.Description>A workspace must have at least 1 admin</Alert.Description>
              </Alert.Header>
              <Alert.Footer>
                <Alert.Action onClick={ () => setState({ showLeaveWorkspaceAlert: false }) }>
                  <Button variant='default'>Okay</Button>
                </Alert.Action>
              </Alert.Footer>
            </Alert.Content> :

            <Alert.Content>
              <Alert.Header>
                <Alert.Title>Are you sure you want to remove your own access?</Alert.Title>
                <Alert.Description>
                  You will lose access to the workspace, and any private notebooks will be lost.
                </Alert.Description>
              </Alert.Header>
              <Alert.Footer>
                <Alert.Cancel>Cancel</Alert.Cancel>
                <Alert.Action onClick={ handleLeaveWorkspace }>
                  <Button
                    color='red'
                    isLoading={ isPendingLeaveWorkspace }
                  >Remove
                  </Button>
                </Alert.Action>
              </Alert.Footer>

            </Alert.Content>
        }
      </Alert>
    </>
  );
}
