'use client'

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button, Col, Icons, Row } from "core/components";
import { useUIController } from "components/context/UIControllerContext";
import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { Popover } from "core/components/popover";
import { deletePage, useGetPages, useGetPagesDeleted } from "../../../lib/request-by-swr/page";
import { toast } from "../../../core/components/Toast";
import { Alert } from "../../../core/components/alert";
import Input from "core/components/forms/Input-without-rhf";

export default function PagesInTrashPopover() {
  const { showSidebar, setShowSidebar } = useUIController()

  const [showPopover, setShowPopover] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
  const [pageIdDelete, setPageIdDelete] = useState()
  const { workspaces, user, workspace } = useWorkspaceContext();
  const router = useRouter();
  const { isLoading, pages, mutate } = useGetPagesDeleted(showPopover ? workspace.id : null)
  // const { isLoading, pages } = useGetPagesDeleted(showPages ? workspace.id : null)

  const handleChangeWorkspace = async ({ id: workspaceId, domain }) => {
    const res = await fetch(`http://localhost:3000/api/user/tracking/${user.id}`, {
      method: 'POST',
      body: JSON.stringify({ workspaceId })
    }).then((res) => res.json())

    if (res.lastAccessNotebookId && !res.lastAccessPageId) {
      return router.push(`/${domain}/${res.lastAccessNotebookId}`)
    }
    if (res.lastAccessPageId && res.lastAccessNotebookId) {
      return router.push(`/${domain}/${res.lastAccessNotebookId}/${res.lastAccessPageId}`)
    }

    router.push(`/${domain}`)
  }

  const handleDelete = async (event, pageId, type = 1) => {
    event.preventDefault()
    setIsDeleteLoading(true)
    const response = await deletePage(pageId, type)
    setIsDeleteLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your post was not deleted. Please try again.",
        type: "error",
      })
    }

    // toast({
    //   message: "Moved to trash",
    //   type: "success",
    // })

    setShowDeleteAlert(false)

    // if (segment[1] === page.id) {
    //   router.push(`/${workspace.domain}`)
    // } else {
    //   router.refresh()
    // }

      // router.refresh()
    await mutate()
  }

  return (
    <>
      {/*<Popover onOpenChange={(open) => setShowPages(open)}>*/}
      <Popover open={showPopover} onOpenChange={setShowPopover}>
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
          <div className='max-h-[10rem] overflow-scroll'>
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
                        setShowDeleteAlert(true)
                        setPageIdDelete(page.id)
                      }}
                    />
                  </Row>
                </Row>
              ))}
            </Col>
          </div>

          <Alert open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <Alert.Content>
              <Alert.Header>
                <Alert.Title>
                  Are you sure you want to delete this page permanently?
                </Alert.Title>
                <Alert.Description>This action cannot be undone.</Alert.Description>
              </Alert.Header>
              <Alert.Footer>
                <Alert.Cancel>Cancel</Alert.Cancel>
                <Alert.Action onClick={(e) => handleDelete(e, pageIdDelete)}>
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

        </Popover.Content>
      </Popover>
    </>
  );
}
