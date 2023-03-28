'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Col, Icons, Row } from "core/components";
import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { Popover } from "core/components/popover";
import { deletePage, useGetPagesDeleted } from "lib/request-by-swr/page";
import { toast } from "core/components/Toast";
import { Alert } from "core/components/alert";
import Input from "core/components/forms/Input-without-rhf";
import { DELETE_PAGE_TYPE } from "config/const";

export default function PagesInTrashPopover() {
  const [state, setState] = useState({
    showPopover: false,
    showDeleteAlert: false,
    isDeleteLoading: false,
    pageIdDelete: null,
  })

  const { workspace } = useWorkspaceContext();
  const router = useRouter();
  const { isLoading, pages, mutate } = useGetPagesDeleted(state.showPopover ? workspace.id : null)

  const handleDelete = async (event, pageId, type = DELETE_PAGE_TYPE.HARD_DELETE) => {
    event.preventDefault()
    setState({ ...state, isDeleteLoading: true })
    const response = await deletePage(pageId, type)
    setState({ ...state, isDeleteLoading: false })

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your post was not deleted. Please try again.",
        type: "error",
      })
    }
    setState({ ...state, showDeleteAlert: false })
    router.refresh()
    await mutate()
  }

  return (
    <>
      <Popover
        open={state.showPopover}
        onOpenChange={(open) => setState({ ...state, showPopover: open })}
      >
        <Popover.Trigger className='w-full'>
          <Row align='center' gap={2} classes='hover:bg-[#ecebea] rounded px-3 py-2 cursor-pointer'>
            <Icons.basket className='h-5 w-5 font-semibold rounded text-sm text-[#777572] flex justify-center'/>
            <p className='text-sm font-semibold text-[#73726e] tracking-wider'>Trash</p>
          </Row>
        </Popover.Trigger>
        <Popover.Content side='right' className='w-[414px] ml-3 mt-32'>
          <div className='mb-2'>
            <Input id='search' placeholder='Filter by page title ...'/>
          </div>
          <div className='h-[380px] overflow-scroll '>
            <Col gap={2}>
              {pages && pages.map((page, index) => (
                <Row
                  justify='between' align='center' key={index}
                  classes='hover:bg-[#ecebea] py-[2px] px-2 rounded-sm cursor-pointer'
                >
                  <p>{page.title}</p>
                  <Row align='center' gap={1}>
                    <Icons.arrowBack
                      className='btn-icon'
                      onClick={(e) => handleDelete(e, page.id, 2)}
                    />
                    <Icons.trash
                      className='btn-icon'
                      onClick={() => {
                        setState({ ...state, showDeleteAlert: true, pageIdDelete : page.id });
                      }}
                    />
                  </Row>
                </Row>
              ))}
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
                <Alert.Action onClick={(e) => handleDelete(e, state.pageIdDelete)}>
                  <Button color='red' isLoading={state.isDeleteLoading}>Yes, Delete it</Button>
                </Alert.Action>
              </Alert.Footer>
            </Alert.Content>
          </Alert>

        </Popover.Content>
      </Popover>
    </>
  );
}
