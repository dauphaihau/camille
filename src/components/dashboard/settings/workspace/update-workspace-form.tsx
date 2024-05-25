'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import React from 'react';

import { StatusCodes } from 'http-status-codes';
import {
  Button, Col, Input, toast
} from 'core/components';
import { PATH, ROLE_USER_ON_WORKSPACE } from 'config/const';
import { useGetDetailWorkspace, useUpdateInfoGeneralWorkspace } from 'services/query-hooks/workspace';
import { IUpdateWorkspace } from 'types/workspace';

export function UpdateWorkspaceForm() {
  const router = useRouter();
  const { data: { user, workspace } = {} } = useGetDetailWorkspace();

  const {
    isPending: isPendingUpdateWorkspace,
    mutateAsync: updateWorkspace,
    data: responseUpdatedWorkspace,
    isError: isErrorUpdateWorkspace,
  } = useUpdateInfoGeneralWorkspace();


  const methodsRhf = useForm<IUpdateWorkspace>({
    mode: 'onChange',
    defaultValues: {
      name: workspace?.name,
      domain: workspace?.domain ?? '',
    },
    disabled: user && user.userOnWorkspace?.role === ROLE_USER_ON_WORKSPACE.MEMBER,
  });

  async function onSubmit(values: IUpdateWorkspace) {

    // omit field not change
    Object.keys(values).forEach((key) => {
      if (workspace && workspace[key] === values[key]) {
        delete values[key];
      }
    });

    // validate domain
    if (values.domain && PATH[values.domain.toUpperCase()]) {
      methodsRhf.setError('domain', { type: 'custom', message: 'Not allowed' });
      return;
    }

    await updateWorkspace({ ...values, workspaceId: workspace?.id as string });

    if (isErrorUpdateWorkspace) {
      return toast({
        message: 'Your update settings request-server failed. Please try again.',
        type: 'error',
      });
    }

    if (responseUpdatedWorkspace?.code === StatusCodes.CONFLICT) {
      return methodsRhf.setError('domain', { type: 'custom', message: 'Used' });
    }

    // await getSession()
    router.refresh();

    if (values?.domain) {
      router.push(`/${values.domain}${PATH.SETTINGS}${PATH.WORKSPACE}`);
    }

    methodsRhf.reset({}, { keepValues: true });

    toast({
      message: 'Your settings was update success',
      type: 'success',
    });
  }

  return (
    <form onSubmit={ methodsRhf.handleSubmit(onSubmit) }>
      <Col gap={ 4 }>
        <Input
          { ...methodsRhf.register('name') }
          label='Name'
        />
        <Input
          { ...methodsRhf.register('domain') }
          label='Domain'
        />
        <Button
          disabled={ !methodsRhf.formState.isDirty }
          isLoading={ isPendingUpdateWorkspace }
          classes='mt-2'
          type='submit'
          width='fit'
        >Update
        </Button>
      </Col>
    </form>
  );
}
