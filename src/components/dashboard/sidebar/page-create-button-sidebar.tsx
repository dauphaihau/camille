"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button, Icons } from "core/components"
import { toast } from "core/components/Toast"

interface PageCreateButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  notebookId: string
}

export function PageCreateButton({
  className, notebookId,
  ...props
}: PageCreateButtonProps) {
  const router = useRouter()

  // const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    // setIsLoading(true)

    const response = await fetch("/api/notebook/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notebookId,
        title: "Untitled Page",
      }),
    })

    // setIsLoading(false)

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

    router.push(`/dashboard/notebooks/${notebookId}/${page.id}`)
    // router.push(`/editor/${post.id}`)
  }

  return (
    <Icons.plus
      onClick={onClick}
      // disabled={isLoading}
      size={15} className='btn-icon invisible group-hover/notebook:visible text-[#686662]'
    />
  )
}
