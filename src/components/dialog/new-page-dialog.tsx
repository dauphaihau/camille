'use client'

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Input, Button, Dialog } from "core/components";

export default function NewPageDialog() {
  const [open, setOpen] = useState(false);
  const formHandler = useForm();

  async function onSubmit(data) {
    console.log(data);

    const response = await fetch(`/api/notebook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        // content: blocks,
      }),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>
          New Page
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <h3>
          New Page
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
            <div className='flex justify-end pt-5'>
              <Button variant='light' onClick={() => setOpen(false)}>
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
