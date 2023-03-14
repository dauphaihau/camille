'use client'

import { FormProvider, useForm } from "react-hook-form";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

import { Button, Input } from "core/components";
import { toast } from "core/components/Toast";
import * as z from "zod";
import { workspaceSchema } from "lib/validations/workspace";
import { useState } from "react";

type FormData = z.infer<typeof workspaceSchema>

export default function FormCreateWorkspace() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      // domain: pathname.slice(1).split('/')[0]
    }
  });

  async function onSubmit(values) {
    setIsLoading(true)
    const response = await fetch('/api/settings/workspace', {
      method: 'POST',
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(values)
    })
    setIsLoading(false)

    if (!response?.ok) {

      if (response.status === 409) {
        return toast({
          title: "Domain exists",
          message: "Create workspace failed. Please try again.",
          type: "error",
        })
      }

      // methods.setError('domain', { type: 'custom', message: 'Domain exists' })
      // console.log('dauphaihau debug: methods-form-state-errors', methods.formState.errors)

      return toast({
        title: "Something went wrong.",
        message: "Create workspace failed. Please try again.",
        type: "error",
      })
    }

    await getSession()
    // const session = await getSession()
    // console.log('dauphaihau debug: session', session)

    router.refresh()
    router.push(`/${values.domain}`)

    return toast({
      title: "Create workspace",
      message: "Your workspace was created success",
      type: "success",
    })

  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6 p-6 border-gray-200 shadow-2xl rounded-md mb-4'>
          <Input size='md' id='name' label='Workspace name'/>
          <Input size='md' id='domain' label='Workspace URL'/>
        </div>
        <div className='text-center'>
          <Button
            disabled={!methods.formState.isDirty}
            isLoading={isLoading}
            size='md' classes='mt-2' type='submit'>Create workspace</Button>
        </div>
      </form>
    </FormProvider>
  );
}
