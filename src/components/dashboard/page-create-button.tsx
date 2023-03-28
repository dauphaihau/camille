"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "core/components"
import { toast } from "core/components/Toast"
import { useWorkspaceContext } from "../context/WorkspaceContext";
import { createPage } from "lib/request-by-swr/page";

interface PostCreateButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  notebookId: string
}

export function PageCreateButton({
  className, notebookId, children,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter()
  const { workspace } = useWorkspaceContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

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
        message: "Your post was not created. Please try again.",
        type: "error",
      })
    }

    // This forces a cache invalidation.
    router.refresh()

    if (response?.data?.pageId) {
      router.push(`/${workspace.domain}/${notebookId}/${response.data.pageId}`)
    }
  }

  if (children) {
    return <div onClick={onClick}>
      {children}
    </div>

  }

  return (
    <Button onClick={onClick} disabled={isLoading}>
      New page
    </Button>
  )
}
