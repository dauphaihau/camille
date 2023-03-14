'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { Notebook, Page, User, Workspace } from "@prisma/client";

import SidebarDashboard from "../dashboard/sidebar/sidebar-dashboard";
import HeaderDashboard from "../dashboard/header-dashboard";
import { Row } from "core/components";
import { cn } from "core/helpers";

export interface WorkspaceState {
  page: Page,
  setPage: (page) => void,
}

export interface WorkspaceProps {
  workspaces: Workspace[],
  notebooks: Notebook[],
  workspace: Workspace,
  user: Partial<User>,
  children: React.ReactNode
}

type IWorkspace = WorkspaceProps & WorkspaceState

const initialState = {
  workspaces: [],
  notebooks: [],
  workspace: undefined,
  user: undefined
};

export const WorkspaceContext = createContext<Partial<IWorkspace>>(initialState)

export function useWorkspaceContext() {
  return useContext(WorkspaceContext);
}

export const WorkspaceProvider = ({ children, ...res }: Partial<WorkspaceProps>) => {
  const segments = useSelectedLayoutSegments();
  const router = useRouter();
  const [page, setPage] = useState()

  const paramsUpdateTracking = {
    lastAccessWorkspaceId: res.workspace.id,
    lastAccessNotebookId: segments[0] ?? '',
    lastAccessPageId: segments[1] ?? '',
  }

  useEffect(() => {
    if (!segments.includes('settings')) {

      if (segments.length === 1) {
        setPage(null)
      }

      (async () => {
          // await fetch(`http://localhost:3000/api/user/tracking/${res.user.id}`, {
          await fetch(`/api/user/tracking/${res.user.id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paramsUpdateTracking)
          })
          router.refresh()
        }
      )()
    }
  }, [
    paramsUpdateTracking.lastAccessWorkspaceId,
    paramsUpdateTracking.lastAccessNotebookId,
    paramsUpdateTracking.lastAccessPageId,
  ])

  const providerValues = { ...res, setPage, page };

  return (
    <WorkspaceContext.Provider value={providerValues}>
      <Row>
        <SidebarDashboard/>
        <div className='w-full'>
          <HeaderDashboard/>
          <main
            className={cn('flex mx-auto flex-1 flex-col overflow-hidden mt-12',
            // className={cn('flex mx-auto flex-1 flex-col overflow-hidden mt-12 max-w-[708px]',
              { 'max-w-[708px]': !!!segments[1] }
            )}
          >
            {children}
          </main>
        </div>
      </Row>
    </WorkspaceContext.Provider>
  );
}
