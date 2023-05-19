'use client'

import { ReactNode, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Input, Button, Dialog, Icons, Tooltip, Textarea, Col } from "core/components";
import { toast } from "core/components/Toast";
import { createNotebook, createNotebookOnTeamspace } from "lib/request-by-swr/notebook";
import { useStoreMulti } from "lib/store";
import { freePlan } from "config/subscriptions";
import { cn } from "core/helpers";

interface NewNotebookDialogProps {
  trigger?: ReactNode
  teamspaceId?: string
}

export function NewNotebookDialog({
  trigger,
  teamspaceId,
}: NewNotebookDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const formHandler = useForm();
  const {
    setShowLimitedNotebookBar,
    workspace,
    setReFetchTeamspaceId
  } = useStoreMulti('workspace', 'setReFetchTeamspaceId', 'setShowLimitedNotebookBar')

  if (!workspace) return null

  async function onSubmit(data) {
    setIsLoading(true)
    if (!workspace) return

    let response;
    if (teamspaceId) {
      response = await createNotebookOnTeamspace({
        workspaceId: workspace.id,
        teamspaceId,
        title: data.title
      })
    } else {
      response = await createNotebook({
        workspaceId: workspace.id,
        title: data.title,
        description: data.description,
      })
    }

    setIsLoading(false)

    if (response.code !== '200') {
      if (response.code === '402') {
        setShowLimitedNotebookBar(true)
        setOpen(!open)
        return
      }

      return toast({
        message: "Your notebooks was not created. Please try again.",
        type: "error",
      })
    }

    setOpen(!open)
    formHandler.reset()

    if (teamspaceId) {
      setReFetchTeamspaceId(teamspaceId)
    }
    router.refresh()
  }

  const Trigger = () => {
    return trigger ? <>{trigger}</> : <Tooltip>
      <Tooltip.Trigger asChild>
        <div>
          <Icons.plus className={cn('btn-icon invisible ', teamspaceId ? 'group-hover/teamspace:visible' : 'group-hover:visible')}/>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content className='ml-2.5 mt-1'>
        <div>New notebook</div>
        {
          !teamspaceId &&
          <div className='text-[#82817f]'>Notebook you created that are not in any teamspace.</div>
        }
      </Tooltip.Content>
    </Tooltip>
  }

  if (!workspace.isStandard &&
    (workspace.totalMembers && workspace.totalMembers > 1) &&
    (workspace.totalNotebooks && workspace.totalNotebooks >= freePlan.limitedNotebooks)
  ) {
    return <div onClick={() => setShowLimitedNotebookBar(true)}>
      <Trigger/>
    </div>
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Trigger/>
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
          <h4>New Notebook</h4>
          <p className={'text-[#9b9a98] text-sm font-medium'}>
            A notebook contains pages.
            Each page you create can share with select people, your whole team, or the entire web, so that they have
            access to all of its content.
            {/*A notebook contains notes and tasks. You can add team members to a notebook so that they have access to all*/}
            {/*of*/}
            {/*its content.*/}
          </p>
        </Col>

        <FormProvider {...formHandler} >
          <form onSubmit={formHandler.handleSubmit(onSubmit)} className='space-y-4'>
            <Input
              placeholder='Enter a name for your notebook'
              sizeInput='md'
              label='Name notebook'
              id='title'
            />
            <Textarea
              rows={4}
              id='description'
              label='Description (optional)'
            />
            <div className='flex justify-end pt-5 gap-1'>
              <Button
                disabled={!formHandler.watch('title')}
                type="submit" isLoading={isLoading}
              >
                Create
              </Button>
            </div>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
}
