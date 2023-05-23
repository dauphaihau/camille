'use client'

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Tooltip, Input, Button, Dialog, Icons, Textarea, Col } from "core/components";
import { toast } from "core/components";
import { createTeamspace } from "lib/request/teamspace";
import useStore from "lib/store";

export default function NewTeamspaceDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const formHandler = useForm();

  useEffect(() => {
    formHandler.reset()
  }, [open])
  const router = useRouter();
  const workspace = useStore(state => state.workspace)

  async function onSubmit(data) {
    setIsLoading(true)
    if (!workspace) return

    const response = await createTeamspace({
      workspaceId: workspace.id,
      name: data.name,
      description: data.description,
    })

    setIsLoading(false)

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your teamspace was not created. Please try again.",
        type: "error",
      })
    }

    router.refresh()
    setOpen(!open)
    formHandler.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <div>
              <Icons.plus className='btn-icon invisible group-hover:visible'/>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content>New teamspace</Tooltip.Content>
        </Tooltip>
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
          <h4>Create a new teamspace</h4>
          <p className={'text-[#9b9a98] text-sm font-medium'}>
            Teamspaces are where your team organizes, permissions, and members
          </p>
        </Col>

        <FormProvider {...formHandler} >
          <form onSubmit={formHandler.handleSubmit(onSubmit)} className='space-y-3'>
            <Input
              placeholder='DevOps Labs'
              sizeInput='md'
              label='Name'
              id='name'
            />
            <Textarea
              placeholder=''
              rows={4}
              label='Description (optional)'
              id='description'
            />
            <div className='flex justify-end pt-5 gap-1'>
              <Button
                disabled={!formHandler.watch('name')}
                type="submit" isLoading={isLoading}
              >
                Create teamspace
              </Button>
            </div>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
}
