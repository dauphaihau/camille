'use client'

import { FormProvider, useForm } from "react-hook-form";
import * as React from "react";
import { useRouter } from "next/navigation";

import { Button, Col, Input } from "core/components";
import { toast } from "core/components/Toast";
import { useWorkspaceContext } from "components/context/workspace-context";
import { PATH, ROLE_USER_ON_WORKSPACE } from "config/const";
import { updateInfoGeneralWorkspace } from "lib/request-by-swr/workspace";

export default function FormUpdateWorkspace({ workspace }) {
  const router = useRouter();
  const { userOnWorkspace } = useWorkspaceContext();
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

    // omit field not change
    Object.keys(values).forEach((key) => {
      if (workspace[key] === values[key]) {
        delete values[key]
      }
    })

    // validate domain
    if (values.domain && PATH[values.domain.toUpperCase()]) {
      methods.setError('domain', { type: 'custom', message: 'Not allowed' })
      setIsLoading(false)
      return
    }

    const response = await updateInfoGeneralWorkspace({ ...values, workspaceId: workspace.id })

    setIsLoading(false)

    if (response.code !== '200') {
      if (response.code === '409') {
        return methods.setError('domain', { type: 'custom', message: 'Used' });
      }
      return toast({
        message: "Your update settings request failed. Please try again.",
        type: "error",
      })
    }

    // await getSession()
    router.refresh()

    if (values?.domain) {
      router.push(`/${values.domain}${PATH.SETTINGS}${PATH.WORKSPACE}`)
    }

    methods.reset({}, { keepValues: true });

    return toast({
      message: "Your settings was update success",
      type: "success",
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Col gap={4}>
          <Input disabled={userOnWorkspace?.role === ROLE_USER_ON_WORKSPACE.MEMBER} id='name' label='Workspace name'/>
          <Input disabled={userOnWorkspace?.role === ROLE_USER_ON_WORKSPACE.MEMBER} id='domain' label='Workspace URL'/>
          <Button
            disabled={!methods.formState.isDirty}
            isLoading={isLoading} classes='mt-2' type='submit' width='fit'
          >Update</Button>
        </Col>
      </form>
    </FormProvider>
  );
}
