'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useReducer } from "react";
import { useRouter } from "next/navigation";

import { DropdownMenu, Icons, Row, Skeleton, Tooltip } from "core/components";
import { PATH } from "config/const";
import { cn } from "core/helpers";
import { LoadingDialog } from "components/dialog/loading-dialog";
import { toast } from "core/components";
import { useStoreMulti } from "lib/store";
import { useGetWorkspacesByUser } from "lib/request-by-swr/workspace";

const initialState: {[k: string]: boolean | string} = {
  isDropdownOpen: false,
  loadingDialog: false,
  nameWorkspace: '',
}

export function WorkspaceUserDropdown() {
  const router = useRouter();
  const { user, workspace, setShowSidebar } = useStoreMulti('workspace', 'setShowSidebar')
  const [event, setEvent] = useReducer((prev, next) => ({
    ...prev, ...next
  }), initialState)
  const { isLoading, workspaces } = useGetWorkspacesByUser(event.isDropdownOpen)

  const changeWorkspace = async ({ id: workspaceId, domain, name }) => {
    if (!user || domain === workspace?.domain) return

    // router.refresh()
    // await getSession()

    setEvent({ nameWorkspace: name })
    setEvent({ loadingDialog: true })

    const res = await fetch(`/api/user/tracking/${user.id}`, {
      method: 'POST',
      body: JSON.stringify({ workspaceId })
    }).then((res) => res.json())

    // error 500
    // const res = await fetcher(`${BASE_URL}/api/user/tracking/${user.id}`, { workspaceId })

    if (res.code !== '200') {
      setEvent({ loadingDialog: false })
      return toast({
        message: "Get tracking on workspace failed",
        type: "error",
      })
    }

    if (res?.data) {
      if (res.data.lastAccessNotebookId && !res.data.lastAccessPageId) {
        return router.push(`/${domain}/${res.data.lastAccessNotebookId}`)
      }
      if (res.data.lastAccessPageId && res.data.lastAccessNotebookId) {
        return router.push(`/${domain}/${res.data.lastAccessNotebookId}/${res.data.lastAccessPageId}`)
      }
    }

    router.push(`/${domain}`)
  }

  return (
    <>
      <LoadingDialog message={`Redirect to ${event.nameWorkspace}...`} open={event.loadingDialog}/>
      <DropdownMenu onOpenChange={(open) => setEvent({ isDropdownOpen: open })}>
        <div className='relative w-full'>
          <DropdownMenu.Trigger className="mb-2 relative w-full">
            <Row
              align='center' justify='between'
              classes={cn('group/iconWorkspace hover:bg-[#ecebea]  py-3 px-4 rounded-sm max-h-[45px] cursor-pointer relative',
                { 'bg-[#ecebea]': event.isDropdownOpen }
              )}
            >
              <Row align='center' gap={3}>
                <div className='avatar bg-[#ecebea] group-hover/iconWorkspace:bg-[#dcdbd9] h-5 w-5 rounded text-sm text-[#777572] flex justify-center'>
                  {workspace && workspace?.name?.charAt(0)}
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm text-[#373530] font-semibold'>{workspace && workspace.name}</p>
                </div>
              </Row>
            </Row>

          </DropdownMenu.Trigger>
          <Tooltip>
            <Tooltip.Trigger>
              <div>
                <Icons.doubleArrowLeft
                  size={30}
                  className='text-md group-hover:text-[#92918d] hover:bg-[#ecebea] rounded invisible group-hover:visible p-2 absolute top-[7px] right-[6%]'
                  // className='text-md group-hover:text-[#92918d] hover:bg-[#dedddb] rounded invisible group-hover:visible p-2'
                  onClick={setShowSidebar}
                />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content className='mt-4 mr-4' side='bottom'>
              <div>Close sidebar</div>
              <div className='text-[#82817f]'>⌘ + \</div>
            </Tooltip.Content>
          </Tooltip>
        </div>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="mt-2 md:w-[240px] max-h-[70vh] ml-4 flex flex-col " align="end">
            <div
              className={'min-h-0 flex-grow'}
              style={{ overflow: 'hidden auto' }}
            >
              <div className='text-xs text-[#81807c] font-medium ml-2 my-2 text-ellipsis overflow-hidden'>
                {user?.email}
              </div>
              {
                isLoading ?
                  <div className="p-4">
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-full"/>
                      <Skeleton className="h-5 w-full"/>
                      <Skeleton className="h-5 w-full"/>
                      <Skeleton className="h-5 w-full"/>
                      <Skeleton className="h-5 w-full"/>
                    </div>
                  </div>
                  : workspaces.length > 0 && workspaces.map((ws, index) => (
                  <DropdownMenu.Item
                    key={index}
                    onClick={() => changeWorkspace(ws)}
                    className='flex justify-between cursor-pointer'
                  >
                    <div>
                      <div
                        className="w-full text-[14px] text-ellipsis overflow-hidden font-medium"
                      >{ws.name}</div>

                      <div
                        className="w-full text-[#848380] text-[12px] text-ellipsis overflow-hidden"
                      >{ws.isStandard ? 'Standard Plan' : 'Free Plan'} · {ws.totalMembers} members
                      </div>
                    </div>
                    {workspace && ws.domain === workspace.domain && <Icons.check className='text-lg'/>}
                  </DropdownMenu.Item>
                ))
              }
            </div>

            <DropdownMenu.Separator/>

            <DropdownMenu.Item>
              <Link href={PATH.WORKSPACE} className="w-full">
                Join or create workspace
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link
                href='#'
                className="w-full pointer-events-none"
              >
                Add an account
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator/>
            <DropdownMenu.Item
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault()
                signOut({
                  callbackUrl: `${window.location.origin}/`,
                })
              }}
            >
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
    </>
  );
}
