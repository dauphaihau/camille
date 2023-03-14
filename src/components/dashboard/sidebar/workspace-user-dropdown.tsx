'use client'

import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { DropdownMenu, Icons, Row } from "core/components";
import { useUIController } from "components/context/UIControllerContext";
import { useWorkspaceContext } from "components/context/WorkspaceContext";

// export const usePreviousRoute = () => {
//   const router = useRouterr();
//
//   const ref = useRef<string | null>(null);
//
//   router.events?.on('routeChangeStart', () => {
//     ref.current = router.asPath;
//   });
//
//   return ref.current;
// };

export default function WorkspaceUserDropdown() {
  const { showSidebar, setShowSidebar } = useUIController()
  const { workspaces, user, workspace } = useWorkspaceContext();
  const router = useRouter();
  const pathname = usePathname();
  // const res = usePreviousRoute()

  const handleChangeWorkspace = async ({ id: workspaceId, domain }) => {
    const res = await fetch(`http://localhost:3000/api/user/tracking/${user.id}`, {
      method: 'POST',
      body: JSON.stringify({ workspaceId })
    }).then((res) => res.json())

    if (res.lastAccessNotebookId && !res.lastAccessPageId) {
      return router.push(`/${domain}/${res.lastAccessNotebookId}`)
    }
    if (res.lastAccessPageId && res.lastAccessNotebookId) {
      return router.push(`/${domain}/${res.lastAccessNotebookId}/${res.lastAccessPageId}`)
    }

    router.push(`/${domain}`)
  }

  const domain = pathname.slice(1).split('/')[0]

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger className="mb-2">
        <Row
          align='center' justify='between'
          classes='hover:bg-[#ecebea] p-3 rounded-sm max-h-[45px] cursor-pointer'
        >
          <Row align='center' gap={3}>
            <div className='avatar bg-[#ecebea] group-hover:bg-[#dcdbda] h-5 w-5 rounded text-sm text-[#777572] flex justify-center'>
              {workspace.name.charAt(0)}
            </div>
            <div className='flex flex-col'>
              <p className='text-sm text-[#373530] font-semibold'>{workspace.name}</p>
            </div>
          </Row>

          <Icons.doubleArrowLeft
            size={30}
            className='text-md group-hover:text-[#92918d] hover:bg-[#dedddb] rounded invisible group-hover:visible p-2'
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </Row>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-2 md:w-[240px]" align="end">
          <DropdownMenu.Item className='hover:bg-none'>
            <div className='text-xs text-[#81807c]'>
              {user?.email}
            </div>
          </DropdownMenu.Item>
          {
            workspaces && workspaces.length > 0 && workspaces.map((ws, index) => (
              <DropdownMenu.Item className='flex justify-between cursor-pointer' key={index}>
                <p
                  className="w-full"
                  onClick={async () => {
                    handleChangeWorkspace(ws)
                    router.refresh()
                    await getSession()
                  }}
                >{ws.name}</p>
                {ws.domain === domain && <Icons.check className='text-lg'/>}
              </DropdownMenu.Item>
            ))
          }
          <DropdownMenu.Separator/>

          <DropdownMenu.Item>
            <Link href="/workspace" className="w-full">
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
  );
}
