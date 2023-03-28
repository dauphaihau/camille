"use client"

import Link from "next/link"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { useReducer, useState } from "react"
import * as React from "react";
import { Notebook } from "@prisma/client"

import { DropdownMenu } from "core/components/dropdown"
import { Button, Icons } from "core/components"
import { Alert } from "core/components/alert"
import { toast } from "core/components/Toast"
import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { deleteNotebook } from "lib/request-by-swr/notebook";
import { cn } from "core/helpers";

interface NotebookOperationsProps {
  notebook: Pick<Notebook, "id" | 'title'>,
  placeOnSidebar?: boolean
}

const initialState: {[k: string]: boolean} = {
  showDropdown: false,
  showDeleteAlert: false,
  isDeleteLoading: false,
}

export function NotebookOperations({ notebook, placeOnSidebar = false }: NotebookOperationsProps) {
  const router = useRouter()
  const segment = useSelectedLayoutSegments()
  const { workspace } = useWorkspaceContext();
  const [event, setEvent] = useReducer((prev, next) => ({
    ...prev, ...next
  }), initialState)

  const handleDelete = async (event) => {
    event.preventDefault()
    setEvent({ isDeleteLoading: true })
    const response = await deleteNotebook(notebook.id)
    setEvent({ isDeleteLoading: false })

    if (response.code !== 200) {
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

    setEvent({ showDeleteAlert: false })

    if (segment[1] === notebook.id) {
      router.push(`/${workspace.domain}`)
    } else {
      router.refresh()
    }
  }

  return (
    <>
      {/*<DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>*/}
      <DropdownMenu
        open={event.showDropdown}
        onOpenChange={(open) => setEvent({ showDropdown: open })}
      >
        <DropdownMenu.Trigger className="">
          <Icons.ellipsisHorizontal
            size={12}
            className={cn('btn-icon  group-hover/notebook:visible text-[#686662]',
              { ['invisible']: placeOnSidebar }
            )}
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`absolute w-[265px] top-0 ${placeOnSidebar ? 'left-0' : 'right-0'}`}
          >
            <DropdownMenu.Item
              onClick={() => setEvent({ showDeleteAlert: true })}
            >Delete</DropdownMenu.Item>
            <DropdownMenu.Item>Duplicates</DropdownMenu.Item>
            <DropdownMenu.Item>Copy link</DropdownMenu.Item>
            <DropdownMenu.Separator/>
            <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
            <DropdownMenu.Item>Rename</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>

      <Alert
        open={event.showDeleteAlert}
        onOpenChange={(open) => setEvent({ showDeleteAlert: open })}
      >
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
              <Button color='red' isLoading={event.isDeleteLoading}>Yes, Delete it</Button>
            </Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>
    </>
  )
}
