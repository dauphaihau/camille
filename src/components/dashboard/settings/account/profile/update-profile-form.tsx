'use client'

import { FormProvider, useForm } from "react-hook-form";
import * as React from "react";
import { useRouter } from "next/navigation";

import { Button, Col, Input } from "core/components";
import { toast } from "core/components";
import { updateProfile } from "lib/request-by-swr/settings-account-profile";

export default function UpdateProfileForm({ user }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      name: user?.name,
    }
  });

  async function onSubmit(values) {
    setIsLoading(true)
    const response = await updateProfile(values)
    setIsLoading(false)

    if (response.code !== '200') {
      return toast({
        title: "Something went wrong.",
        message: "Your update settings request failed. Please try again.",
        type: "error",
      })
    }
    router.refresh()
    methods.reset({}, { keepValues: true });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Col gap={4}>
          <Input id='name' label='Preferred name'/>
          <div>
            <Button
              disabled={!methods.formState.isDirty}
              isLoading={isLoading} classes='mt-2' type='submit' width='fit'
            >Update</Button>
          </div>
        </Col>
      </form>
    </FormProvider>
  );
}
