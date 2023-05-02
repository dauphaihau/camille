"use client"

import { Notebook } from "@prisma/client"
import { useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import { useCallback, useReducer } from "react"

import { Alert, Button, Icons, Tooltip, DropdownMenu, InputWithoutRhf } from "core/components"
import { toast } from "core/components/Toast"
import { deleteNotebook, updateNotebook } from "lib/request-by-swr/notebook";
import { cn, debounce } from "core/helpers";
import { PATH } from "config/const";
import { Popover } from "core/components";
import useStore from "lib/store";

interface NotebookOperationsProps {
  notebook: Pick<Notebook, "id" | 'title'>,
  placeOnSidebar?: boolean
}

const initialState: {[k: string]: boolean} = {
  showDropdown: false,
  showRenameForm: false,
  showDeleteAlert: false,
  isDeleteLoading: false,
}

export function NotebookOperations({ notebook, placeOnSidebar = false }: NotebookOperationsProps) {
  const router = useRouter()
  const currentNotebookId = useSelectedLayoutSegment()
  const workspace = useStore(state => state.workspace)
  const [event, setEvent] = useReducer((prev, next) => ({
    ...prev, ...next
  }), initialState)

  const handleDelete = async (event) => {
    event.preventDefault()
    setEvent({ isDeleteLoading: true })
    const response = await deleteNotebook(notebook.id)
    setEvent({ isDeleteLoading: false })

    if (response.code !== '200') {
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

    if (currentNotebookId === notebook.id) {
      router.push(workspace?.domain ? `/${workspace.domain}` : PATH.HOME)
    }
    router.refresh()
  }

  async function handleUpdateNotebook(id, values) {
    const response = await updateNotebook(id, values)

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your notebook was not saved. Please try again.",
        type: "error",
      })
    }
    router.refresh()
  }

  const debounceTitle = useCallback(
    debounce((value) => {
      handleUpdateNotebook(notebook.id, { title: value })
    }, 300),
    []
  );

  return (
    <>
      <DropdownMenu
        open={event.showDropdown}
        onOpenChange={(open) => setEvent({ showDropdown: open })}
      >
        <DropdownMenu.Trigger>

          <Icons.ellipsisHorizontal
            size={12}
            className={cn('btn-icon text-[#686662]',
            )}
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`absolute w-[265px] top-0 ${placeOnSidebar ? 'left-0' : 'right-0'}`}
            // className={`w-[265px]`}
          >
            <DropdownMenu.Item
              onClick={() => setEvent({ showDeleteAlert: true })}
            >Delete</DropdownMenu.Item>
            {/*<DropdownMenu.Item>Duplicates</DropdownMenu.Item>*/}
            {/*<DropdownMenu.Item>Copy link</DropdownMenu.Item>*/}
            {/*<DropdownMenu.Separator/>*/}
            {/*<DropdownMenu.Item>Add to favorites</DropdownMenu.Item>*/}
            {/*<DropdownMenu.Item*/}
            {/*  onClick={() => setEvent({ showRenameForm: true })}*/}
            {/*>Rename</DropdownMenu.Item>*/}
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

      <Popover open={event.showRenameForm}>
        <Popover.Trigger
          className={cn('w-full invisible',
            event.showRenameForm ? '' : 'absolute'
          )}
        />
        <Popover.Content
          onPointerDownOutside={() => setEvent({ showRenameForm: false })}
          side='bottom' className='w-[414px] ml-12 mt-22'
        >
          <InputWithoutRhf
            id='notebookTitle'
            defaultValue={notebook.title}
            // value={notebookContext?.title || notebook.title}
            onChange={(e) => {
              // setPage?.({ ...notebook, title: e.target.value })
              debounceTitle(e.target.value)
            }}
          />
        </Popover.Content>
      </Popover>
    </>
  )
}
