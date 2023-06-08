"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button, Loading, Row } from "core/components"
import { toast } from "core/components"
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
      {
        isLoading ?
          <Row
            justify={'center'}
            align={'center'}
            classes='btn-icon hidden group-hover/notebook:flex text-[#686662] p-[3px]'>
            <Loading/>
          </Row>
          : children
      }
    </div>

  }

  return (
    <Button onClick={onClick} disabled={isLoading}>
      New page
    </Button>
  )
}
