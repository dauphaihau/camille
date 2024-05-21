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
import { useStoreMulti } from 'lib/store';
import { useGetDetailWorkspace, useGetWorkspacesByUser } from 'lib/request-client/workspace';

interface EventState {
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
    (state: EventState, newState: Partial<EventState>) => ({
      ...state, ...newState,
    }),
    {
      isDropdownOpen: false,
      loadingDialog: false,
      nameWorkspace: '',
    }
  );

  const { isLoading, data: { workspaces } = {} } = useGetWorkspacesByUser(state.isDropdownOpen);

  const changeWorkspace = async ({ id: workspaceId, domain, name }) => {
    if (!user || domain === workspace?.domain) return;

    // router.refresh()
    // await getSession()

    setState({ nameWorkspace: name });
    setState({ loadingDialog: true });

    const res = await fetch(`/api/user/tracking/${user.id}`, {
      method: 'POST',
      body: JSON.stringify({ workspaceId }),
    }).then((res) => res.json());

    // error 500
    // const res = await fetcher(`${BASE_URL}/api/user/tracking/${user.id}`, { workspaceId })

    if (res.code !== '200') {
      setState({ loadingDialog: false });
      toast({
        message: 'Get tracking on workspace failed',
        type: 'error',
      });
      return;
    }

    if (res?.data) {
      if (res.data.lastAccessNotebookId && !res.data.lastAccessPageId) {
        return router.push(`/${domain}/${res.data.lastAccessNotebookId}`);
      }
      if (res.data.lastAccessPageId && res.data.lastAccessNotebookId) {
        return router.push(`/${domain}/${res.data.lastAccessNotebookId}/${res.data.lastAccessPageId}`);
      }
    }

    router.push(`/${domain}`);
  };

  const handleSignOut = (event: Event) => {
    event.preventDefault();
    signOut({
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <>
      <LoadingDialog message={ `Redirect to ${state.nameWorkspace}...` } open={ state.loadingDialog } />
      <DropdownMenu onOpenChange={ (open) => setState({ isDropdownOpen: open }) }>
        <div className='relative w-full'>
          <DropdownMenu.Trigger className='relative w-full'>
            <Row
              align='center' justify='between'
              classes={ cn('group/iconWorkspace hover:bg-accent py-3 px-4 rounded-sm max-h-[45px] cursor-pointer relative',
                { 'bg-accent': state.isDropdownOpen }
              ) }
            >
              <Row align='center' gap={ 3 }>
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
                    className='text-[#92918d] hover:bg-accent rounded invisible group-hover:visible p-[2px] absolute top-[10px] right-[6%] cursor-pointer'
                    onClick={ setShowSidebar }
                  />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content className='mt-4 mr-4' side='bottom'>
                <div>Close sidebar</div>
                <div className='text-primary-tooltip'>⌘ + \</div>
              </Tooltip.Content>
            </Tooltip>
          }
        </div>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className='mt-2 md:w-[240px] max-h-[70vh] ml-4 flex flex-col ' align='end'>
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
                        <Col key={ i } gap={ 2 }>
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
              <Link href={ PATH.WORKSPACE } className='w-full'>
                Join or create workspace
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href='#' className='w-full pointer-events-none'>
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
