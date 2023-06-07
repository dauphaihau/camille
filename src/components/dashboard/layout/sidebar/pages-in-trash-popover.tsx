'use client'

import React, { useState } from "react";

import { Alert, toast, InputWithoutRhf, Popover, Button, Col, Icons, Loading, Row } from "core/components";
import { deletePage, useGetPagesDeleted } from "lib/request-by-swr/page";
import { DELETE_PAGE_TYPE } from "config/const";
import Title from "components/common/title";
import useStore from "lib/store";
import { ItemSidebar } from "./item-sidebar";

export function PagesInTrashPopover() {
  const [state, setState] = useState({
    showPopover: false,
    showDeleteAlert: false,
    isDeleteLoading: false,
    pageDelete: null,
  })

  const workspace = useStore(state => state.workspace)
  const setReFetchNotebookId = useStore(state => state.setReFetchNotebookId)
  const { isLoading, pages, mutate } = useGetPagesDeleted(state.showPopover && workspace ? workspace.id : null)

  const handleDelete = async (event, page, type = DELETE_PAGE_TYPE.HARD_DELETE) => {
    event.preventDefault()
    const { id, notebookId } = page
    setState({ ...state, isDeleteLoading: true })
    const response = await deletePage(id, type)
    setState({ ...state, isDeleteLoading: false })

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your post was not deleted. Please try again.",
        type: "error",
      })
    }
    setState({ ...state, showDeleteAlert: false })
    if (type === DELETE_PAGE_TYPE.RECOVER) {
      setReFetchNotebookId(notebookId)
    }
    // router.refresh()
    await mutate()
  }

  const Pages = () => {
    if (isLoading) {
      return <div className={'mx-auto'}>
        <Loading/>
      </div>
    }

    if (pages.length === 0) {
      return <div className={'mx-auto text-[#b2b2af] text-sm font-medium'}>not found page</div>
    }

    return pages.map((page, index) => (
      <Row
        justify='between' align='center' key={index}
        classes='hover:bg-accent py-0.5 px-2 rounded-sm cursor-pointer'
      >
        <Col gap={1}>
          <Title maxW={200} classesText={'text-sm'}>{page.title}</Title>
          {page?.url && <Title maxW={200} className={'text-[#a09f9d]'} classesText={'text-xs'}>{page.url}</Title>}
        </Col>
        <Row align='center' gap={1}>
          <Icons.arrowBack
            className='btn-icon'
            onClick={(e) => handleDelete(e, page, DELETE_PAGE_TYPE.RECOVER)}
          />
          <Icons.trash
            className='btn-icon'
            onClick={() => {
              setState({ ...state, showDeleteAlert: true, pageDelete: page });
            }}
          />
        </Row>
      </Row>
    ))
  }

  return (
    <Popover
      open={state.showPopover}
      onOpenChange={(open) => setState({ ...state, showPopover: open })}
    >
      <Popover.Trigger className='w-full relative'>
        <ItemSidebar
          title='Trash'
          icon={'trash'}
          titleTooltip={'Restore deleted pages.'}
        />
      </Popover.Trigger>
      {/*<Popover.Content side='right' className='w-[414px] ml-3 absolute z-[1000px] '>*/}
      <Popover.Content side='right' className='w-[414px] ml-3 mt-32 z-[1000px] '>
        <div className='mb-2'>
          <InputWithoutRhf id='search' placeholder='Filter by page title ...'/>
        </div>
        <div className='h-[380px] overflow-scroll '>
          <Col gap={2}>
            <Pages/>
          </Col>
        </div>

        <Alert
          open={state.showDeleteAlert}
          onOpenChange={(open) => setState({ ...state, showDeleteAlert: open })}
        >
          <Alert.Content>
            <Alert.Header>
              <Alert.Title>
                Are you sure you want to delete this page permanently?
              </Alert.Title>
              <Alert.Description>This action cannot be undone.</Alert.Description>
            </Alert.Header>
            <Alert.Footer>
              <Alert.Cancel>Cancel</Alert.Cancel>
              <Alert.Action onClick={(e) => handleDelete(e, state.pageDelete)}>
                <Button color='red' isLoading={state.isDeleteLoading}>Yes, Delete it</Button>
              </Alert.Action>
            </Alert.Footer>
          </Alert.Content>
        </Alert>

      </Popover.Content>
    </Popover>
  )
}
