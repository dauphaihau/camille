'use client';

import React, { useReducer } from 'react';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import {
  Col, DropdownMenu, Icons, Row, Skeleton, Tooltip
} from 'core/components';
import { PATH } from 'config/const';
import { cn, getRandomInt } from 'core/helpers';
import { LoadingDialog } from 'components/dialog/loading-dialog';
import { toast } from 'core/components';
import { useStoreMulti } from 'stores/layout-store';
import { useGetDetailWorkspace, useGetWorkspacesByUser } from 'services/query-hooks/workspace';
import { useGetTrackingByWorkspace } from 'services/query-hooks/user';

interface State {
  isDropdownOpen: boolean,
  loadingDialog: boolean,
  nameWorkspace: string,
}

export function WorkspaceUserDropdown() {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();

  const { setShowSidebar } = useStoreMulti('setShowSidebar');
  const { data: { workspace, user } = {} } = useGetDetailWorkspace();

  const [state, setState] = useReducer(
    (state: State, newState: Partial<State>) => ({
      ...state, ...newState,
    }),
    {
      isDropdownOpen: false,
      loadingDialog: false,
      nameWorkspace: '',
    }
  );

  const { isLoading, data: { workspaces } = {} } = useGetWorkspacesByUser(state.isDropdownOpen);

  const {
    isError: isErrorGetTrackingByWorkspace,
    isPending: isPendingGetTrackingByWorkspace,
    mutateAsync: getTrackingByWorkspace,
  } = useGetTrackingByWorkspace();

  const changeWorkspace = async ({ id: workspaceId, domain, name }) => {
    if (!user || domain === workspace?.domain) return;

    setState({ nameWorkspace: name });
    const res = await getTrackingByWorkspace(workspaceId);

    if (isErrorGetTrackingByWorkspace) {
      toast({
        message: 'Get tracking on workspace failed',
        type: 'error',
      });
      return;
    }

    if (res?.data?.lastAccessPageId) {
      router.push(`/${domain}/${res.data.lastAccessPageId}`);
    }
    router.push(`/${domain}`);
  };

  const handleSignOut = async (event: Event) => {
    event.preventDefault();
    await signOut({
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <>
      <LoadingDialog
        message={ `Redirect to ${state.nameWorkspace}...` }
        open={ isPendingGetTrackingByWorkspace }
      />
      <DropdownMenu onOpenChange={ (open) => setState({ isDropdownOpen: open }) }>
        <div className='relative w-full'>
          <DropdownMenu.Trigger className='relative w-full'>
            <Row
              align='center'
              justify='between'
              classes={ cn('group/iconWorkspace hover:bg-accent py-3 pl-[15px] pr-4 rounded-sm max-h-[45px] cursor-pointer relative',
                { 'bg-accent': state.isDropdownOpen }
              ) }
            >
              <Row
                align='center'
                gap={ 3 }
              >
                <div className='avatar bg-accent group-hover/iconWorkspace:bg-[#dcdbd9] h-5 w-5 rounded text-sm text-primary-medium flex justify-center'>
                  { workspace && workspace?.name?.charAt(0) }
                </div>
                <div>
                  <p className='text-sm text-secondary font-semibold'>{ workspace && workspace.name }</p>
                </div>
              </Row>
            </Row>

          </DropdownMenu.Trigger>

          {
            segments.length > 1 &&
            <Tooltip>
              <Tooltip.Trigger>
                <div>
                  <Icons.doubleArrowLeft
                    size={ 25 }
                    className='text-[#92918d] hover:bg-accent rounded invisible group-hover/sidebar:visible p-0.5 absolute top-2.5 right-[6%] cursor-pointer'
                    onClick={ setShowSidebar }
                  />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content
                className='mt-4 mr-4'
                side='bottom'
              >
                <div>Close sidebar</div>
                <div className='text-primary-tooltip'>⌘ + \</div>
              </Tooltip.Content>
            </Tooltip>
          }
        </div>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className='mt-2 md:w-[240px] max-h-[70vh] ml-4 flex flex-col '
            align='end'
          >
            <div
              className='min-h-0 flex-grow'
              style={ { overflow: 'hidden auto' } }
            >
              <div className='text-xs text-[#81807c] font-medium ml-2 my-2 text-ellipsis overflow-hidden'>
                { user?.email }
              </div>
              {
                isLoading ?
                  <div className='p-4'>
                    <div className='space-y-3'>
                      { new Array(getRandomInt(1, 4)).fill('').map((_, i) => (
                        <Col
                          key={ i }
                          gap={ 2 }
                        >
                          <Skeleton className='h-4 w-1/3' />
                          <Skeleton className='h-5 w-full' />
                        </Col>
                      )) }
                    </div>
                  </div> :
                  workspaces && workspaces.length > 0 && workspaces.map((ws, index) => (
                    <>
                      <DropdownMenu.Item
                        key={ index }
                        onClick={ () => changeWorkspace(ws) }
                        className='flex justify-between cursor-pointer'
                      >
                        <div>
                          <div
                            className='w-full text-sm text-ellipsis overflow-hidden font-medium'
                          >{ ws.name }
                          </div>

                          <div
                            className='w-full text-[#848380] text-xs text-ellipsis overflow-hidden'
                          >{ ws.isStandard ? 'Standard Plan' : 'Free Plan' } · { ws.totalMembers } members
                          </div>
                        </div>
                        { workspace && ws.domain === workspace.domain && <Icons.check className='text-lg' /> }
                      </DropdownMenu.Item>
                    </>
                  ))
              }
            </div>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Link
                href={ PATH.WORKSPACE }
                className='w-full'
              >
                Join or create workspace
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link
                href='#'
                className='w-full pointer-events-none'
              >
                Add an account
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              className='cursor-pointer'
              onSelect={ handleSignOut }
            >
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
    </>
  );
}
