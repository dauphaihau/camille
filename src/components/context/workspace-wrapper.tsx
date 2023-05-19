'use client'

import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

import { SidebarDashboard } from "components/dashboard/layout/sidebar";
import { Col, Row } from "core/components";
import { cn, fetcher } from "core/helpers";
import { useKeyboardShortcut } from "core/hooks";
import { useStoreMulti } from "lib/store";
import { IStoreState } from "types/store";
import { LimitedNotebookBar } from "components/dashboard/layout/limited-notebook-bar";

type WorkspaceProps = {
  children: ReactNode
} & Pick<IStoreState, 'user' | 'workspace'>

export const WorkspaceWrapper = ({ children, ...props }: Partial<WorkspaceProps>) => {
  const segments = useSelectedLayoutSegments();

  const {
    setWorkspace,
    setUser,
    showSidebar,
    setShowSidebar,
    setShowLimitedNotebookBar, setPage
  } = useStoreMulti('setWorkspace', 'setUser', 'showSidebar', 'setShowLimitedNotebookBar', 'setShowSidebar', 'setPage')

  useEffect(() => {
    if (props?.user) setUser(props.user)
    if (props?.workspace) setWorkspace(props.workspace)
  }, [props.workspace, props.user])
  // }, [])

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
    lastAccessWorkspaceId: props?.workspace && props.workspace.id,
    lastAccessNotebookId: notebookId ?? '',
    lastAccessPageId: pageId ?? '',
  }

  useEffect(() => {
    if (!isSettingPage) {
      if (segments.length === 1) {
        setPage(undefined)
      }

      (async () => {
          if (!props?.user) return
          await fetcher(
            `/api/user/tracking/${props.user.id}`,
            paramsUpdateTracking,
            'PATCH'
          )
          // router.refresh()
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

  return (
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
  );
}
