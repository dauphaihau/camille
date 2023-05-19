'use client'

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Input, Button, Dialog, Icons } from "core/components";
import { toast } from "core/components/Toast";
import { addMember } from "lib/request-by-swr/settings-member";
import { ROLE_USER_ON_WORKSPACE } from "config/const";
import { useStoreMulti } from "lib/store";

export default function AddMemberDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const formHandler = useForm();
  const router = useRouter();
  const { workspace, user } = useStoreMulti('workspace', 'user')

  async function onSubmit({ email }) {
    setIsLoading(true)
    if (!workspace) return

    const response = await addMember({
      workspaceId: workspace.id,
      email,
    })

    setIsLoading(false)

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: response.message,
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
        <Button disabled={user.userOnWorkspace.role === ROLE_USER_ON_WORKSPACE.MEMBER}>Add members</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <h3>Invite member</h3>

        <div
          onClick={() => setOpen(false)}
          className='
          absolute top-[14px] right-[14px] cursor-pointer
          btn-icon bg-[#efefef] rounded-full text-xs flex justify-center items-center'
        >
          <Icons.close/>
        </div>
        <FormProvider {...formHandler} >
          <form onSubmit={formHandler.handleSubmit(onSubmit)} className='space-y-3'>
            <Input
              // placeholder='Search name or emails'
              // placeholder='Search email'
              disabled={isLoading}
              sizeInput='md'
              label='Email'
              id='email'
            />
            <div className='flex justify-end pt-5 gap-1'>
              <Button
                disabled={formHandler.watch('email') === user.email || isLoading}
                type="submit" isLoading={isLoading}
              >
                Invite
              </Button>
            </div>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
}
