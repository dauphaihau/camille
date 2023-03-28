'use client'

import { FormProvider, useForm } from "react-hook-form";
import * as React from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

import { Button, Col, Input } from "core/components";
import { toast } from "core/components/Toast";
import * as z from "zod";
import { workspaceSchema } from "lib/validations/workspace";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof workspaceSchema>

export default function FormCreateWorkspace() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [isFocusDomainField, setIsFocusDomainField] = useState(false)

  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(workspaceSchema),
  });

  useEffect(() => {
    if (!isFocusDomainField) {
      let suggestDomain = methods.watch('name')
      .toLowerCase()
      .replace(/ +/g, '-')
      .replace(/[^a-z0-9._-]/gi, '');

      if (suggestDomain.at(-1) === '-') {
        suggestDomain.substring(0, suggestDomain.length - 1)
      }

      if (suggestDomain.at(0) === '-') {
        suggestDomain = suggestDomain.substring(1)
      }
      methods.setValue('domain', suggestDomain)

    }
  }, [methods.watch('name')])

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
        <Col
          style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 20px' }}
          classes='gap-6 p-6 border-gray-200 rounded-md mb-4'
        >
          <Input disabled={isLoading} autoFocus size='md' id='name' label='Workspace name'/>
          <Input
            disabled={isLoading}
            onFocus={() => setIsFocusDomainField(true)}
            labelLeft={window.location.host + '/'}
            classesLabelLeft='left-[-2%] text-[#6c6f75] font-medium text-[13px]'
            classes='pl-[7rem]' size='md' id='domain' label='Workspace URL'
          />
        </Col>
        <div className='text-center'>
          <Button
            disabled={!methods.formState.isDirty}
            isLoading={isLoading}
            size='md' classes='mt-2' type='submit'
          >Create workspace</Button>
        </div>
      </form>
    </FormProvider>
  );
}
