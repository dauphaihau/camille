'use client'

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Input, Button, Dialog, Icons } from "core/components";
import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { toast } from "core/components/Toast";
import { createNotebook } from "lib/request-by-swr/notebook";

export default function NewNotebookDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const formHandler = useForm();
  const router = useRouter();
  const { workspace } = useWorkspaceContext();

  async function onSubmit(data) {
    setIsLoading(true)
    const response = await createNotebook({
      workspaceId: workspace.id,
      title: data.title,
      description: data.description,
    })
    setIsLoading(false)

    if (response.code !== '200') {
      if (response.code === '402') {
        return toast({
          title: "Limit of 3 notebooks reached.",
          message: "Please upgrade to the PRO plan.",
          type: "error",
        })
      }

      return toast({
        title: "Something went wrong.",
        message: "Your notebooks was not created. Please try again.",
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
        <Icons.plus className='btn-icon invisible group-hover:visible'/>
      </Dialog.Trigger>

      <Dialog.Content>
        <h3>
          New Notebook
        </h3>
        <p>
          A notebook contains notes and tasks. You can add team members to a notebook so that they have access to all of
          its content.
        </p>
        <FormProvider {...formHandler} >
          <form onSubmit={formHandler.handleSubmit(onSubmit)} className='space-y-3'>
            <Input
              placeholder='Enter a name for your notebook'
              size='md'
              label='Name notebook'
              id='title'
            />
            <Input
              placeholder=''
              size='md'
              label='Description'
              id='description'
            />
            <div className='flex justify-end pt-5 gap-1'>
              <Button disabled={isLoading} classes='mr-2' variant='text' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading}>
                Create
              </Button>
            </div>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
}
