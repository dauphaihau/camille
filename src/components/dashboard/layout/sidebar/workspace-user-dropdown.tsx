'use client'

import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useReducer } from "react";
import { useRouter } from "next/navigation";

import { DropdownMenu, Icons, Row, Tooltip } from "core/components";
import { useWorkspaceContext } from "components/context/workspace-context";
import { BASE_URL, PATH } from "config/const";
import { cn } from "core/helpers";
import LoadingDialog from "components/dialog/loading-dialog";
import { toast } from "core/components/Toast";
import useStore from "../../../../lib/store";

const initialState: {[k: string]: boolean | string} = {
  isDropdownOpen: false,
  loadingDialog: false,
  nameWorkspace: '',
}

export default function WorkspaceUserDropdown() {
  const router = useRouter();
  const { workspaces, user, workspace } = useWorkspaceContext();
  // const { setShowSidebar, workspaces, user, workspace } = useWorkspaceContext();

  const setShowSidebar = useStore(state => state.setShowSidebar)
  // const showSidebar = useStore(state => state.showSidebar)

  const [event, setEvent] = useReducer((prev, next) => ({
    ...prev, ...next
  }), initialState)

  const changeWorkspace = async ({ id: workspaceId, domain }) => {
    if (!user) return
    setEvent({ loadingDialog: true })

    const res = await fetch(`${BASE_URL}/api/user/tracking/${user.id}`, {
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

  // console.log('dauphaihau debug: show-sidebar', showSidebar)

  return (
    <>
      <LoadingDialog message={`Redirect to ${event.nameWorkspace}...`} open={event.loadingDialog}/>
      <DropdownMenu onOpenChange={(open) => setEvent({ isDropdownOpen: open })}>
        {/*<DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>*/}
        <div className='relative w-full'>
          <DropdownMenu.Trigger className="mb-2 relative w-full">
            <Row
              align='center' justify='between'
              // classes='hover:bg-[#ecebea] py-3 px-4 rounded-sm max-h-[45px] cursor-pointer'
              classes={cn('hover:bg-[#ecebea] py-3 px-4 rounded-sm max-h-[45px] cursor-pointer relative',
                { 'bg-[#ecebea]': event.isDropdownOpen }
              )}
            >
              <Row align='center' gap={3}>
                <div className='avatar bg-[#ecebea] group-hover:bg-[#dcdbda] h-5 w-5 rounded text-sm text-[#777572] flex justify-center'>
                  {workspace && workspace.name.charAt(0)}
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm text-[#373530] font-semibold'>{workspace && workspace.name}</p>
                </div>
              </Row>

              {/*<Icons.doubleArrowLeft*/}
              {/*  size={30}*/}
              {/*  className='text-md group-hover:text-[#92918d] hover:bg-[#dedddb] rounded invisible group-hover:visible p-2'*/}
              {/*  onClick={() => console.log('dauphaihau debug: logne')}*/}
              {/*  // onClick={() => setShowSidebar?.((prevState) => !prevState)}*/}
              {/*/>*/}
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
                  // onClick={() => setShowSidebar?.((prevState) => !prevState)}
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
          <DropdownMenu.Content className="mt-2 md:w-[240px] ml-4" align="end">
            <div className='text-xs text-[#81807c] ml-2 my-2'>
              {user?.email}
            </div>
            {/*<DropdownMenu.Item className='hover:bg-none'>*/}
            {/*  <div className='text-xs text-[#81807c]'>*/}
            {/*    {user?.email}*/}
            {/*  </div>*/}
            {/*</DropdownMenu.Item>*/}
            {
              workspaces && workspaces.length > 0 && workspaces.map((ws, index) => (
                <DropdownMenu.Item className='flex justify-between cursor-pointer' key={index}>
                  <p
                    className="w-full"
                    onClick={async () => {
                      changeWorkspace(ws)
                      setEvent({ nameWorkspace: ws.name })
                      router.refresh()
                      await getSession()
                    }}
                  >{ws.name}</p>
                  {workspace && ws.domain === workspace.domain && <Icons.check className='text-lg'/>}
                </DropdownMenu.Item>
              ))
            }
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

            {/*<DropdownMenu.Item>*/}
            {/*  <Link href="/docs" target="_blank" className="w-full">*/}
            {/*    Documentation*/}
            {/*  </Link>*/}
            {/*</DropdownMenu.Item>*/}
            {/*<DropdownMenu.Item>*/}
            {/*  <Link*/}
            {/*    href={siteConfig.links.github}*/}
            {/*    className="w-full"*/}
            {/*    target="_blank"*/}
            {/*  >*/}
            {/*    GitHub*/}
            {/*  </Link>*/}
            {/*</DropdownMenu.Item>*/}

            <DropdownMenu.Separator/>
            <DropdownMenu.Item
              className="cursor-pointer"
              onSelect={(event) => {
                event.preventDefault()
                signOut({
                  callbackUrl: `${window.location.origin}/login`,
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
