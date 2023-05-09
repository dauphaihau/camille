"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button, Loading } from "core/components"
import { toast } from "core/components/Toast"
import { useWorkspaceContext } from "../context/workspace-context";
import { createPage } from "lib/request-by-swr/page";
import useStore from "lib/store";

interface PostCreateButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  notebookId: string
}

export function PageCreateButton({
  className, notebookId, children,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter()
  const setReFetchNotebookId = useStore(state => state.setReFetchNotebookId)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const workspace = useStore(state => state.workspace)

  async function onClick() {
    setIsLoading(true)

    const response = await createPage({
      notebookId,
      title: "Untitled Page",
    })

    setIsLoading(false)

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your page was not created. Please try again.",
        type: "error",
      })
    }

    // This forces a cache invalidation.
    // router.refresh()

    setReFetchNotebookId?.(notebookId)

    if (response?.data?.pageId && workspace) {
      router.push(`/${workspace?.domain}/${notebookId}/${response.data.pageId}`)
    }
  }

  if (children) {
    return <div onClick={onClick}>
      {isLoading ?
        <div className='btn-icon hidden group-hover/notebook:flex text-[#686662] !flex justify-center items-center'>
          <Loading/>
        </div>
        : children}
    </div>

  }

  return (
    <Button onClick={onClick} disabled={isLoading}>
      New page
    </Button>
  )
}
