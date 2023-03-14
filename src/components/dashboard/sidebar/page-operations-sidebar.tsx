"use client"

import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { useState } from "react"
import { Notebook, Page } from "@prisma/client"

import { DropdownMenu } from "core/components/dropdown"
import { Col, Icons } from "core/components"
import { Toast, toast } from "core/components/Toast"
import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { deletePage } from "lib/request-by-swr/page"
import hotToast from "react-hot-toast";
import * as React from "react";

interface PageOperationsProps {
  page: Pick<Page, "id" | "title">
}

export function PageOperations({ page }: PageOperationsProps) {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const segment = useSelectedLayoutSegments()
  const { workspace } = useWorkspaceContext();

  const handleUndo = async (event) => {
    event.preventDefault()
    const response = await deletePage(page.id, 2)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your post was not undo. Please try again.",
        type: "error",
      })
    }

    router.refresh()
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    setShowDropdown(false)
    const response = await deletePage(page.id)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your post was not deleted. Please try again.",
        type: "error",
      })
    }

    hotToast.custom(
      ({ visible }) => (
        <Toast
          visible={visible}
          className="bg-black text-white"
        >
          {
            <Toast.Description>
              <p className='font-semibold'>Moved to trash</p> {' '}
              | <p className='font-semibold cursor-pointer' onClick={handleUndo}>Undo</p>
            </Toast.Description>
          }
        </Toast>
      ),
      { duration: 3000, position: 'bottom-center' }
    )

    if (segment[1] === page.id) {
      router.push(`/${workspace.domain}`)
    } else {
      router.refresh()
    }
  }

  return (
    <DropdownMenu onOpenChange={setShowDropdown} open={showDropdown}>
      <DropdownMenu.Trigger className="">
        <Icons.ellipsisHorizontal size={12} className='btn-icon group-hover/page:visible text-[#686662]'/>
        {/*<Icons.ellipsisHorizontal size={12} className='btn-icon invisible group-hover/page:visible text-[#686662]'/>*/}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={handleDelete}>
            Delete
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
          <DropdownMenu.Separator/>
          <DropdownMenu.Item>
            {/*<p className="flex w-full">*/}
            Add to favorites
            {/*</p>*/}
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            {/*<p className="flex w-full">*/}
            Rename
            {/*</p>*/}
          </DropdownMenu.Item>
          <DropdownMenu.Separator/>
          <DropdownMenu.Item className='hover:bg-white'>
            <Col classes=''>
              <p className='text-xs text-[#9b9a98] mb-2'>Last edited by dauphaihau1</p>
              <p className='text-xs text-[#9b9a98]'>Today at 8:01 PM</p>
            </Col>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  )
}
