'use client'

import { FormProvider, useForm } from "react-hook-form";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

import { Button, Col, Input } from "core/components";
import { toast } from "core/components/Toast";

export default function FormUpdateWorkspace({ workspace }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      name: workspace.name,
      domain: workspace.domain
    }
  });

  async function onSubmit(values) {
    setIsLoading(true)

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

    setIsLoading(false)

    if (!response?.ok) {
      return methods.setError('domain', { type: 'custom', message: 'Used' });
      // return toast({
      //   title: "Something went wrong.",
      //   message: "Your update settings request failed. Please try again.",
      //   type: "error",
      // })
    }

    // await getSession()
    router.refresh()

    if (values?.domain) {
      router.push(`/${values.domain}/settings/workspace/`)
    }

    methods.reset({}, { keepValues: true });

    return toast({
      title: "Update settings",
      message: "Your settings was update success",
      type: "success",
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Col gap={4}>
          <Input id='name' label='Workspace name'/>
          <Input id='domain' label='Workspace URL'/>
          <Button
            disabled={!methods.formState.isDirty}
            isLoading={isLoading} classes='mt-2' type='submit' width='fit'
          >Update</Button>
        </Col>
      </form>
    </FormProvider>
  );
}
