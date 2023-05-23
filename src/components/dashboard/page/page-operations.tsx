"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Page } from "@prisma/client"

import { DropdownMenu } from "core/components/dropdown"
import { Button, Icons } from "core/components"
import { Alert } from "core/components/alert"
import { toast } from "core/components"
import { useState } from "react"

async function deletePage(pageId: string) {
  const response = await fetch(`/api/notebook/page/${pageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      message: "Your page was not deleted. Please try again.",
      type: "error",
    })
  }

  toast({
    type: "success",
    title: "Delete page success",
    message: "Your page was deleted",
  })
}

interface PostOperationsProps {
  page: Pick<Page, "id" | "title">
}

export function PageOperations({ page }: PostOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50">
          <Icons.ellipsisHorizontal className="h-4 w-4"/>
          <span className="sr-only">Open</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <Link href={`/editor/${page.id}`} className="flex w-full">
                Edit
              </Link>
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
              Are you sure you want to delete this page?
            </Alert.Title>
            <Alert.Description>This action cannot be undone.</Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Cancel>Cancel</Alert.Cancel>

            <Alert.Action
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deletePage(page.id)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {/*{isDeleteLoading ? (*/}
              {/*  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />*/}
              {/*) : (*/}
              {/*  <Icons.trash className="mr-2 h-4 w-4" />*/}
              {/*)}*/}
              {/*<span>Delete</span>*/}
              <Button color='red'>Delete</Button>
            </Alert.Action>

          </Alert.Footer>
        </Alert.Content>
      </Alert>
    </>
  )
}
