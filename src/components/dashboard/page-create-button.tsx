"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "core/components"
import { toast } from "core/components/Toast"
import { useWorkspaceContext } from "../context/WorkspaceContext";

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

    const response = await fetch("/api/notebook/page", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notebookId,
        title: "Untitled Page",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 3 posts reached.",
          message: "Please upgrade to the PRO plan.",
          type: "error",
        })
      }

      return toast({
        title: "Something went wrong.",
        message: "Your post was not created. Please try again.",
        type: "error",
      })
    }

    const page = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/${workspace.domain}/${notebookId}/${page.id}`)
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
