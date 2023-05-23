"use client"

import * as React from "react"

import { Button, Loading, Tooltip } from "core/components"
import { toast } from "core/components"
import { createNotebookOnTeamspace } from "lib/request-by-swr/notebook";
import useStore from "lib/store";

interface TeamspaceCreateButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  teamspaceId: string
}

export function NotebookCreateButton({ teamspaceId, children }: TeamspaceCreateButtonProps) {
  const workspace = useStore(state => state.workspace)
  const setReFetchNotebookId = useStore(state => state.setReFetchNotebookId)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await createNotebookOnTeamspace({
      workspaceId: workspace.id,
      teamspaceId,
      title: "Untitled",
    })

    setIsLoading(false)

    if (response.code !== '200') {
      return toast({
        message: "Your notebook was not created. Please try again.",
        type: "error",
      })
    }

    // This forces a cache invalidation.
    // router.refresh()

    setReFetchNotebookId(teamspaceId)

    // if (response?.data?.pageId && workspace) {
    //   router.push(`/${workspace.domain}/${teamspaceId}/${response.data.pageId}`)
    // }
  }

  if (children) {
    return <div onClick={onClick}>
      {isLoading ?
        <div className='btn-icon hidden group-hover/teamspace:flex text-[#686662] !flex justify-center items-center'>
          <Loading/>
        </div>
        :
        <Tooltip>
          <Tooltip.Trigger asChild>
            <div>{children}</div>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <div>Add a Notebook</div>
          </Tooltip.Content>
        </Tooltip>
      }
    </div>

  }

  return (
    <Button onClick={onClick} disabled={isLoading}>
      New notebook
    </Button>
  )
}
