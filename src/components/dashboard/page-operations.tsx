"use client"

import * as z from "zod";
import { useCallback, useReducer } from "react"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { Page, Favorite } from "@prisma/client"
import hotToast from "react-hot-toast";

import { Toast, toast, InputWithoutRhf, Popover, Col, Icons, Tooltip, DropdownMenu } from "core/components"
import { addToFavorite, createPage, deletePage } from "lib/request-by-swr/page"
import { cn, debounce, formatDate, getValueOfLastBracketInString } from "core/helpers";
import { DELETE_PAGE_TYPE, PATH } from "config/const";
import { updatePage } from "lib/request-by-swr/page";
import { pagePatchSchema } from "lib/validations/page";
import { useStoreMulti } from "lib/store";

interface PageOperationsProps {
  page: Pick<Page, "id" | "title" | "content" | "updatedAt" | "updatedBy" | "notebookId"> & {
    favorites?: Favorite[]
    createdByUser?: {
      email: string
    }
  }
  placeOnSidebar?: boolean
  favorite?: boolean
  classesTrigger?: string
  classesContent?: string
}

const initialState: {[k: string]: boolean | string} = {
  showDropdown: false,
  showRenameForm: false,
}

type FormData = z.infer<typeof pagePatchSchema>

export function PageOperations({
  page,
  placeOnSidebar = false,
  favorite = false,
  classesContent,
}: PageOperationsProps) {
  const router = useRouter()
  const segment = useSelectedLayoutSegments()
  const {
    setReFetchNotebookId,
    workspace,
    setPage,
  } = useStoreMulti('setReFetchNotebookId', 'workspace', 'setPage')

  const [event, setEvent] = useReducer((prev, next) => ({
    ...prev, ...next
  }), initialState)

  async function handleUndo() {
    const response = await deletePage(page.id, DELETE_PAGE_TYPE.RECOVER)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your page was not undo. Please try again.",
        type: "error",
      })
    }
    if (!placeOnSidebar) router.refresh()
  }

  async function handleDelete() {
    setEvent({ shopDropdown: false })
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
              <p className='font-semibold'>Moved to trash</p> {' '}| <p
              className='font-semibold cursor-pointer'
              onClick={handleUndo}
            >Undo</p>
            </Toast.Description>
          }
        </Toast>
      ),
      { duration: 3000, position: 'bottom-center' }
    )
    setReFetchNotebookId?.(page.notebookId)
    router.refresh();
    // if (!placeOnSidebar || favorite) router.refresh();

    if (segment[1] === page.id) {
      router.push(workspace?.domain ? `/${workspace.domain}` : PATH.HOME)
    }
  }

  async function handleUpdatePage(id, values: FormData) {
    const response = await updatePage(id, values)

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your page was not saved. Please try again.",
        type: "error",
      })
    }
    setReFetchNotebookId?.(page.notebookId)
    if (!placeOnSidebar) router.refresh();
  }

  async function handleDuplicatePage() {
    let pageTitle = getValueOfLastBracketInString(page.title)

    if (!pageTitle) {
      pageTitle = page.title + ' (1)'
    } else {
      const increase = Number(pageTitle) + 1
      pageTitle = page.title.substring(0, page.title.length - 3) + `(${increase})`
    }

    const response = await createPage({
      notebookId: page.notebookId,
      title: pageTitle,
      content: page.content,
    })

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your page was not duplicate. Please try again.",
        type: "error",
      })
    }

    setReFetchNotebookId?.(page.notebookId)

    if (!placeOnSidebar) {
      return router.refresh();
    }
    if (response?.data?.pageId && workspace) {
      router.push(`/${workspace.domain}/${page.notebookId}/${response.data.pageId}`)
    }
  }

  async function handleAddToFavorite() {
    if (!workspace) return null
    const response = await addToFavorite({
      workspaceId: workspace.id,
      pageId: page.id,
    })

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your page was not add to favorite. Please try again.",
        type: "error",
      })
    }

    setReFetchNotebookId?.(page.notebookId)
    return router.refresh();
  }

  async function copyToClipBoard() {

    let pageURL
    if (segment[1] === page.id) {
      pageURL = window.location.href
    } else {

      if (!workspace) return

      pageURL = window.location.origin + `/${workspace.domain}/${page.notebookId}/${page.id}`
    }

    try {
      await navigator.clipboard.writeText(pageURL);
      hotToast.custom(
        ({ visible }) => (
          <Toast
            visible={visible}
            className="bg-black text-white"
          >
            {
              <Toast.Description>
                <p className='font-semibold'>Copied!</p> {' '}
              </Toast.Description>
            }
          </Toast>
        ),
        { duration: 3000, position: 'bottom-center' }
      )

    } catch (err) {
      console.log('dauphaihau debug: err', err)
      // setCopySuccess('Failed to copy!');
    }
  }

  const debounceTitle = useCallback(
    debounce((value) => {
      handleUpdatePage?.(page.id, { title: value })
    }, 300),
    []
  )

  return (
    <>
      <DropdownMenu
        open={event.showDropdown}
        onOpenChange={(open) => setEvent({ showDropdown: open })}
      >
        <DropdownMenu.Trigger>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <div>
                <Icons.ellipsisHorizontal
                  size={12} className={cn('btn-icon text-[#686662]',

                  !placeOnSidebar && 'hover:bg-accent-light'
                )}
                />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content className={!placeOnSidebar ? 'mt-2 mr-4' : ''}>
              Delete, duplicate, and more...
            </Tooltip.Content>
          </Tooltip>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            // className={`absolute w-[265px] top-10 ${placeOnSidebar ? 'left-0' : 'right-0'}`}
            className={cn('absolute w-[265px] top-0',
              placeOnSidebar ? 'left-0' : 'right-0',
              classesContent
            )}
          >
            <DropdownMenu.Item onClick={handleDelete}>Delete</DropdownMenu.Item>
            <DropdownMenu.Item onClick={handleDuplicatePage}>Duplicates</DropdownMenu.Item>
            <DropdownMenu.Item onClick={copyToClipBoard}>Copy link</DropdownMenu.Item>
            <DropdownMenu.Separator/>
            <DropdownMenu.Item onClick={handleAddToFavorite}>
              {
                favorite || page?.favorites && page.favorites.length > 0 ? 'Remove from favorites' :
                  'Add to favorites'
              }
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setEvent({ showRenameForm: true })}>Rename</DropdownMenu.Item>
            <DropdownMenu.Separator/>
            <DropdownMenu.Item className='hover:bg-white'>
              <Col>
                <p className='text-xs text-[#9b9a98] mb-2'>Last edited
                  by {page?.createdByUser?.email && page?.createdByUser?.email.split('@')[0]}</p>
                <p className='text-xs text-[#9b9a98]'>{formatDate(page.updatedAt)}</p>
              </Col>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>

      <Popover open={event.showRenameForm}>
        <Popover.Trigger
          className={cn('w-full invisible',
            event.showRenameForm ? '' : 'absolute right-0 bottom-0'
          )}
        />
        <Popover.Content
          onPointerDownOutside={() => setEvent({ showRenameForm: false })}
          side='bottom' className='w-[414px] ml-12 mt-22'
        >
          <InputWithoutRhf
            id='pageTitle'
            defaultValue={page.title}
            onChange={(e) => {
              setPage?.({ ...page, title: e.target.value })
              debounceTitle(e.target.value)
            }}
          />
        </Popover.Content>
      </Popover>
    </>
  )
}
