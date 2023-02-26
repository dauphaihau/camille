"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "core/components"
import { toast } from "core/components/Toast"

interface PostCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
}

export function PostCreateButton({
  className,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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

    const post = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/editor/${post.id}`)
  }

  return (
    <Button onClick={onClick} disabled={isLoading}>
      New post
    </Button>
  )
}
