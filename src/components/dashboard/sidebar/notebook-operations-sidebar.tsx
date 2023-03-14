"use client"

import Link from "next/link"
import { usePathname, useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import { useState } from "react"
import { Notebook, Page } from "@prisma/client"

import { DropdownMenu } from "core/components/dropdown"
import { Button, Icons } from "core/components"
import { Alert } from "core/components/alert"
import { toast } from "core/components/Toast"
import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { deletePage } from "lib/request-by-swr/page"
import * as React from "react";

// import { deleteNotebook } from "services/notebook";

interface NotebookOperationsProps {
  notebook: Pick<Notebook, "id">
}

export async function deleteNotebook(notebookId: string) {
  // const response = await fetch(`/api/posts/${notebookId}`, {
  return await fetch(`/api/notebook/${notebookId}`, {
    method: "DELETE",
  })
}

export function NotebookOperations({ notebook }: NotebookOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
  const segment = useSelectedLayoutSegments()
  const { workspace } = useWorkspaceContext();

  const handleOpenDropdown = async (status) => {
    // const { isLoading, pageList } = useDetailNotebook(showPages ? notebook.id : null)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    setIsDeleteLoading(true)
    const response = await deleteNotebook(notebook.id)
    setIsDeleteLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your notebook was not deleted. Please try again.",
        type: "error",
      })
    }

    toast({
      message: "Moved to trash",
      type: "success",
    })

    setShowDeleteAlert(false)

    if (segment[1] === notebook.id) {
      router.push(`/${workspace.domain}`)
    } else {
      router.refresh()
    }
  }

  return (
    <>
      <DropdownMenu onOpenChange={handleOpenDropdown}>
        <DropdownMenu.Trigger className="">
          <Icons.ellipsisHorizontal
            size={12}
            className='btn-icon invisible group-hover/notebook:visible text-[#686662]'
          />
        </DropdownMenu.Trigger>
        {/*<DropdownMenu.Trigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50">*/}
        {/*  <Icons.ellipsis className="h-4 w-4" />*/}
        {/*  <span className="sr-only">Open</span>*/}
        {/*</DropdownMenu.Trigger>*/}
        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              {/*<p className="flex w-full">*/}
              Add to favorites
              {/*</p>*/}
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              {/*<p className="flex w-full">*/}
              Duplicates
              {/*</p>*/}
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              {/*<p className="flex w-full">*/}
              Copy link
              {/*</p>*/}
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              {/*<p className="flex w-full">*/}
              Rename
              {/*</p>*/}
            </DropdownMenu.Item>
            <DropdownMenu.Separator/>
            <DropdownMenu.Item
              className="flex cursor-pointer items-center text-red-600 focus:bg-red-50"
              onSelect={() => setShowDeleteAlert(true)}
            >
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>

      <Alert open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <Alert.Content>
          <Alert.Header>
            <Alert.Title>
              Are you sure you want to delete this notebook?
            </Alert.Title>
            <Alert.Description>This action cannot be undone.</Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Cancel>Cancel</Alert.Cancel>
            <Alert.Action onClick={handleDelete}>
              <Button
                disabled={isDeleteLoading}
                classes='bg-[#fbe6e5] hover:bg-[#f7d9d9] !text-[#bd3838] font-semibold border-none tracking-wider'
              >
                {isDeleteLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                ) : (
                  <Icons.trash className="mr-2 h-4 w-4"/>
                )}
                Yes, Delete it</Button>
            </Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>
    </>
  )
}
