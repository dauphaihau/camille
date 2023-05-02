'use client'

import { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { Notebook, Page, Teamspace, User, UserOnWorkspace, Workspace } from "@prisma/client";

import SidebarDashboard from "../dashboard/layout/sidebar";
import { Col, Row } from "core/components";
import { cn, fetcher } from "core/helpers";
import { useKeyboardShortcut } from "core/hooks";
import Link from "next/link";
import useStore from "lib/store";
import { shallow } from "zustand/shallow";

export interface WorkspaceState {
  // event: {
  //   page: Page,
  //   setPage: (page) => void,
  //   showSidebar: boolean,
  //   setShowSidebar: (showSidebar) => void,
  //   reFetchNotebookId: string,
  //   setReFetchNotebookId: (notebookId) => void,
  //   pageEditing: Page,
  //   notebookEditing: Notebook
  // }
  // setEvent: (val) => void,
  page?: Partial<Page>,
  setPage: (page) => void,
  showSidebar: boolean,
  setShowSidebar: (showSidebar) => void,
  reFetchNotebookId: string,
  setReFetchNotebookId: (notebookId) => void,
  setShowLimitedNotebookBar: (notebookId) => void,
  // pageEditing: Page,
  // notebookEditing: Notebook
  stateRouter: object
}

export interface WorkspaceProps {
  workspaces: Workspace[],
  notebooks: Notebook[],
  pagesFavorite: Page[],
  workspace: Workspace & {
    notebooks: Notebook[]
    teamspaces: Teamspace[]
    isStandard: boolean
    totalMembers: number
    totalNotebooks: number
  },
  user: Partial<User>,
  // usersOnWorkspace: UserOnWorkspace[]
  userOnWorkspace: {
    user: User
  } & UserOnWorkspace
  children: React.ReactNode
}

type IWorkspace = WorkspaceProps & WorkspaceState

const initialState = {
  // event: {
  //   workspaces: [],
  //   notebooks: [],
  //   workspace: undefined,
  //   user: undefined,
  //   showSidebar: true,
  //   pageEditing: {},
  //   notebookEditing: {}
  // },
  workspaces: [],
  notebooks: [],
  workspace: undefined,
  user: undefined,
  userOnWorkspace: undefined,
  showSidebar: true,
  // pageEditing: {},
  // notebookEditing: {},
  stateRouter: {},
};

export const WorkspaceContext = createContext<Partial<IWorkspace>>(initialState)

export function useWorkspaceContext() {
  return useContext(WorkspaceContext);
}

export const WorkspaceProvider = ({ children, ...res }: Partial<WorkspaceProps>) => {
  const segments = useSelectedLayoutSegments();
  const router = useRouter();

  // const setWorkspace = useStore(state => state.setWorkspace)
  // const setShowSidebar = useStore(state => state.setShowSidebar)
  // const showSidebar = useStore(state => state.showSidebar)

  const {
    setWorkspace,
    showSidebar,
    setUserOnWorkspace,
    setShowSidebar,
    showLimitedNotebookBar,
    setShowLimitedNotebookBar,
  } = useStore(({
      // showSidebar,
      // setShowSidebar,
      // showLimitedNotebookBar,
      // setShowLimitedNotebookBar, setWorkspace, setUserOnWorkspace
    ...res
    }) => ({
      // showSidebar,
      // setShowSidebar,
      // showLimitedNotebookBar,
      // setShowLimitedNotebookBar,
      // setWorkspace,
      // setUserOnWorkspace
    ...res
    }),
    shallow
  )

  const [page, setPage] = useState()
  const [reFetchNotebookId, setReFetchNotebookId] = useState('')

  useEffect(() => {
    if (res?.workspace) setWorkspace(res.workspace)
    if (res?.userOnWorkspace) setUserOnWorkspace(res.userOnWorkspace)
  // }, [])
  }, [res.workspace, res.userOnWorkspace])

  const divReference = useRef(null);

  const shortcutSidebar = ['Meta', '\\'];
  const handleShortcutSidebar = useCallback(() => {
    setShowSidebar()
  }, [showSidebar])
  useKeyboardShortcut(shortcutSidebar, handleShortcutSidebar, { overrideSystem: true })

  const notebookId = segments[0]
  const pageId = segments[1]
  const isSettingPage = segments.includes('settings')

  const paramsUpdateTracking = {
    lastAccessWorkspaceId: res?.workspace && res.workspace.id,
    lastAccessNotebookId: notebookId ?? '',
    lastAccessPageId: pageId ?? '',
  }

  useEffect(() => {
    if (!isSettingPage) {

      if (segments.length === 1) {
        setPage(undefined)
      }

      (async () => {
          if (!res?.user) return
          await fetcher(
            `/api/user/tracking/${res.user.id}`,
            paramsUpdateTracking,
            'PATCH'
          )
          router.refresh()
        }
      )()
    }
    setShowLimitedNotebookBar(false)
  }, [
    paramsUpdateTracking.lastAccessWorkspaceId,
    paramsUpdateTracking.lastAccessNotebookId,
    paramsUpdateTracking.lastAccessPageId,
  ])

  // useEffect(() => {
  //   if (divReference?.current) {
  //     divReference.current.focus()
  //   }
  // }, [])

  const providerValues = {
    ...res,
    setPage, page,
    reFetchNotebookId,
    setReFetchNotebookId,
  };

  const LimitedNotebookBar = () => {
    if (showLimitedNotebookBar) {
      return (
        <Row
          justify='center' align='center' gap={2} classes='text-white text-center py-2 text-[14px] font-medium'
          style={{ background: 'rgb(235, 87, 87)' }}
        >
          <div>You are over the notebook limit for the free plan</div>
          {/*<div>You are over the block limit for the free plan</div>*/}
          <Link
            href={`/${res?.workspace?.domain}/settings/plans`}
            className='border border-white text-white px-2.5 rounded-sm hover:bg-[#cd5e59] cursor-pointer'
          >
            Upgrade for unlimited
          </Link>
        </Row>
      )
    }
    return null
  }

  return (
    <WorkspaceContext.Provider value={providerValues}>
      <Col classes="mx-auto space-y-6">
        <Row ref={divReference}>
          <SidebarDashboard/>
          <div className='w-full'>
            <LimitedNotebookBar/>
            <main
              // className={cn('flex mx-auto flex-1 flex-col overflow-hidden',
              className={cn('flex mx-auto flex-1 flex-col',
                { 'max-w-[708px] mt-[60px]': isSettingPage || !pageId },
              )}
            >
              {children}
            </main>
          </div>
        </Row>
      </Col>
    </WorkspaceContext.Provider>
  );
}
