'use client'

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

import { Input, Button, Dialog, Icons } from "core/components";

export default function NewNotebookDialog() {
  const [open, setOpen] = useState(false);
  const formHandler = useForm();
  const router = useRouter();
  const pathName = usePathname();

  async function onSubmit(data) {
    const response = await fetch(`/api/notebook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain: pathName.slice(1).split('/')[0],
        title: data.title,
        description: data.description,
      }),
    })

    console.log('dauphaihau debug: response', response)
    if (response.ok) {
      router.refresh()
      setOpen(!open)
      formHandler.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        {/*<Button>*/}
        {/*  New Notebook*/}
        {/*</Button>*/}

        <Icons.plus
          // size={5}
          className='btn-icon invisible group-hover:visible'
          // size={15}
          // className='text-md hover:bg-[#dedddb] rounded  p-2'
          // className='text-md hover:bg-[#dedddb] rounded invisible group-hover:visible p-2'
        />
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
              <Button className='mr-2' variant='text' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create
              </Button>
            </div>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
}
