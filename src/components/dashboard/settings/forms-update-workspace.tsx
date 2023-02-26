'use client'

import { FormProvider, useForm } from "react-hook-form";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

import { Button, Input } from "core/components";
import { toast } from "core/components/Toast";

export default function FormsUpdateWorkspace({ workspace }) {
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      name: workspace.name,
      domain: workspace.domain
    }
  });

  async function onSubmit(values) {
    Object.keys(values).forEach((key) => {
      if (workspace[key] === values[key]) {
        delete values[key]
      }
    })

    const response = await fetch('/api/settings/workspace', {
      method: 'PATCH',
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ ...values, workspaceId: workspace.id })
    })

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your update settings request failed. Please try again.",
        type: "error",
      })
    }
    await getSession()
    router.refresh()

    return toast({
      title: "Update settings",
      message: "Your settings was update success",
      type: "success",
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <Input id='name' label='Workspace name'/>
          <Input id='domain' label='Workspace URL'/>
          <Button classes='mt-2' type='submit' width='fit'>Update</Button>
        </div>
      </form>
    </FormProvider>
  );
}
