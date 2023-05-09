'use client'

import { FormProvider, useForm } from "react-hook-form";
import * as React from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

import { Button, Col, Input } from "core/components";
import { toast } from "core/components/Toast";
import * as z from "zod";
import { workspaceSchema } from "lib/validations/workspace";
import { useEffect, useReducer, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingDialog from "../../dialog/loading-dialog";
import { PATH } from "../../../config/const";

type FormData = z.infer<typeof workspaceSchema>

const initialState: {[k: string]: boolean | string} = {
  isLoading: false,
  isFocusDomainField: false,
  messageDialog: 'Getting ready...'
}

export default function FormCreateWorkspace() {
  const router = useRouter();

  const [event, setEvent] = useReducer((prev, next) => ({
    ...prev, ...next
  }), initialState)

  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(workspaceSchema),
  });

  useEffect(() => {
    if (!event.isFocusDomainField) {
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
    setEvent({ isLoading: true })

    // validate domain
    if (values.domain && PATH[values.domain.toUpperCase()]) {
      methods.setError('domain', { type: 'custom', message: 'Not allowed' })
      setEvent({ isLoading: false })
      return
    }

    const response = await fetch('/api/settings/workspace', {
      method: 'POST',
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(values)
    })

    if (!response?.ok) {
      setEvent({ isLoading: false })

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

    setEvent({ messageDialog: 'taking you to your workspace...' })

    await getSession()
    router.refresh()
    router.push(`/${values.domain}`)
  }

  return (
    <>
      <LoadingDialog message={event.messageDialog} open={event.isLoading}/>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Col
            style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 20px' }}
            classes='gap-6 p-6 border-gray-200 rounded-md mb-4'
          >
            <Input
              autoFocus
              sizeInput='md'
              id='name'
              label='Workspace name'
            />
            <Input
              onFocus={() => setEvent({ isFocusDomainField: true })}
              labelLeft={window.location.host + '/'}
              classesLabelLeft='left-[-2%] text-[#6c6f75] font-medium text-[13px]'
              classes='pl-[7rem]' sizeInput='md' id='domain' label='Workspace URL'
            />
          </Col>
          <div className='text-center'>
            <Button
              disabled={!methods.formState.isDirty}
              size='md' classes='mt-2' type='submit'
            >Create workspace</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
