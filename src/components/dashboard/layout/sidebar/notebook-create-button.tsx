"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button, Icons, Loading, Tooltip } from "core/components"
import { toast } from "core/components/Toast"
import { createPage } from "lib/request-by-swr/page";
import { useWorkspaceContext } from "../../../context/workspace-context";
import { createNotebookOnTeamspace } from "../../../../lib/request-by-swr/notebook";

interface TeamspaceCreateButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  teamspaceId: string
}

export function NotebookCreateButton({
  className, teamspaceId, children,
  ...props
}: TeamspaceCreateButtonProps) {
  const router = useRouter()
  const { workspace, setReFetchNotebookId } = useWorkspaceContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    if (!workspace) return

    setIsLoading(true)

    console.log('dauphaihau debug: -workspace-id-workspace-id-teamspace-id-title-untitled-', {
      workspaceId: workspace.id,
      teamspaceId,
      title: "Untitled",
    })

    const response = await createNotebookOnTeamspace({
      workspaceId: workspace.id,
      teamspaceId,
      title: "Untitled",
    })

    setIsLoading(false)

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your notebook was not created. Please try again.",
        type: "error",
      })
    }

    // This forces a cache invalidation.
    // router.refresh()

    setReFetchNotebookId?.(teamspaceId)

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
