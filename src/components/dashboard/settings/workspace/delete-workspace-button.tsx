'use client'

import React, { useEffect, useReducer, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import { Button, Col, Dialog, Icons, Input } from "core/components";
import { toast } from "core/components/Toast";
import { useWorkspaceContext } from "components/context/workspace-context";
import { PATH, ROLE_USER_ON_WORKSPACE } from "config/const";
import { deleteWorkspace } from "lib/request-by-swr/workspace";
import useStore from "lib/store";
import LoadingDialog from "components/dialog/loading-dialog";

export default function DeleteWorkspaceButton({ workspaceId }) {
  const router = useRouter();
  const formHandler = useForm();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const { userOnWorkspace } = useWorkspaceContext();
  const workspace = useStore(state => state.workspace)

  useEffect(() => {
    formHandler.reset()
  }, [open])

  if (!userOnWorkspace) return null

  async function onSubmit() {
    setIsLoading(true)
    const response = await deleteWorkspace(workspaceId)

    if (response.code !== '200') {

      setIsLoading(false)
      if (response.status === '409') {
        return toast({
          message: "Domain exists",
          type: "error",
        })
      }

      return toast({
        message: "Delete workspace failed. Please try again.",
        type: "error",
      })
    }

    await getSession()

    if (response?.domain) {
      router.push(`/${response.domain}`)
    } else {
      router.push(PATH.WORKSPACE)
    }
  }

  return (
    <>
      <LoadingDialog message={`Deleting workspace...`} open={isLoading}/>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button
            disabled={userOnWorkspace.role === ROLE_USER_ON_WORKSPACE.MEMBER}
            color='red'
          >
            Delete this workspace
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <div
            onClick={() => setOpen(false)}
            className='
          absolute top-[14px] right-[14px] cursor-pointer
          btn-icon bg-[#efefef] rounded-full text-xs flex justify-center items-center'
          >
            <Icons.close/>
          </div>

          <Col gap={1}>
            <p className={'text-[#9b9a98] text-sm font-medium mt-4'}>
              This action cannot be undone. This will permanently delete the workspace, including all pages and files.
              Please type the name of the workspace to confirm.
            </p>
          </Col>

          <FormProvider {...formHandler} >
            <form onSubmit={formHandler.handleSubmit(onSubmit)} className='space-y-4'>
              <Input
                placeholder={workspace.name}
                sizeInput='md'
                id='nameWorkspace'
              />
              <div className='flex justify-end pt-4 gap-1'>
                <Button
                  color='red'
                  disabled={formHandler.watch('nameWorkspace') !== workspace.name}
                  type="submit"
                >
                  Permanently delete workspace
                </Button>
              </div>
            </form>
          </FormProvider>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
