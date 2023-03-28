"use client"

import { useState } from "react"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { Page } from "@prisma/client"
import hotToast from "react-hot-toast";

import { DropdownMenu } from "core/components/dropdown"
import { Col, Icons } from "core/components"
import { Toast, toast } from "core/components/Toast"
import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { deletePage } from "lib/request-by-swr/page"
import { cn, formatDate } from "core/helpers";
import { DELETE_PAGE_TYPE } from "config/const";

interface PageOperationsProps {
  page: Pick<Page, "id" | "title" | "updatedAt" | "updatedBy">
  placeOnSidebar?: boolean
}

export function PageOperations({ page, placeOnSidebar = false }: PageOperationsProps) {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const segment = useSelectedLayoutSegments()
  const { workspace } = useWorkspaceContext();

  const handleUndo = async (event) => {
    event.preventDefault()
    const response = await deletePage(page.id, DELETE_PAGE_TYPE.RECOVER)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your page was not undo. Please try again.",
        type: "error",
      })
    }

    router.refresh()
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    setShowDropdown(false)
    const response = await deletePage(page.id)

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your page was not deleted. Please try again.",
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
        <Icons.ellipsisHorizontal
          size={12} className={cn('btn-icon group-hover/page:visible text-[#686662]',
          { ['invisible']: placeOnSidebar }
        )}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`absolute w-[265px] top-0 ${placeOnSidebar ? 'left-0' : 'right-0'}`}
        >
          <DropdownMenu.Item onClick={handleDelete}>Delete</DropdownMenu.Item>
          <DropdownMenu.Item>Duplicates</DropdownMenu.Item>
          <DropdownMenu.Item>Copy link</DropdownMenu.Item>
          <DropdownMenu.Separator/>
          <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
          <DropdownMenu.Item>Rename</DropdownMenu.Item>
          <DropdownMenu.Separator/>
          <DropdownMenu.Item className='hover:bg-white'>
            <Col classes=''>
              <p className='text-xs text-[#9b9a98] mb-2'>Last edited
                by {page.updatedBy && page.updatedBy.split('@')[0]}</p>
              <p className='text-xs text-[#9b9a98]'>{formatDate(page.updatedAt)}</p>
            </Col>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  )
}
