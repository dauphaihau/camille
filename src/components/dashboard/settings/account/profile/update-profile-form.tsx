'use client';

import { useForm } from 'react-hook-form';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import { Button, Col, Input } from 'core/components';
import { toast } from 'core/components';
import { useUpdateProfile } from 'lib/request-client/settings-account-profile';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { IUpdateProfile } from 'types/user';

export default function UpdateProfileForm() {
  const router = useRouter();
  const { data: { user } = {} } = useGetDetailWorkspace();

  const {
    mutateAsync: updateProfile,
    isError: isErrorUpdateProfile,
    isPending: isPendingUpdateProfile,
  } = useUpdateProfile();

  const methodsRhf = useForm({
    mode: 'onChange',
    defaultValues: {
      name: user?.name,
    },
  });

  async function onSubmit(values: IUpdateProfile) {
    await updateProfile(values);

    if (isErrorUpdateProfile) {
      toast({
        title: 'Something went wrong.',
        message: 'Your update settings request-server failed. Please try again.',
        type: 'error',
      });
      return;
    }
    router.refresh();
    methodsRhf.reset({}, { keepValues: true });
  }

  return (
    <form onSubmit={ methodsRhf.handleSubmit(onSubmit) }>
      <Col gap={ 4 }>
        <Input
          { ...methodsRhf.register('name') }
          id='name'
          label='Preferred name'
        />
        <div>
          <Button
            disabled={ !methodsRhf.formState.isDirty }
            isLoading={ isPendingUpdateProfile }
            classes='mt-2'
            type='submit'
            width='fit'
          >Update
          </Button>
        </div>
      </Col>
    </form>
  );
}
