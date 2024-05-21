'use client';

import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  Button, Col, Dialog, Icons, Input, toast
} from 'core/components';
import { PATH, ROLE_USER_ON_WORKSPACE } from 'config/const';
import { useDeleteWorkspace, useGetDetailWorkspace } from 'lib/request-client/workspace';
import { LoadingDialog } from 'components/dialog/loading-dialog';

export function DeleteWorkspaceButton() {
  const router = useRouter();
  const formHandler = useForm();

  const [open, setOpen] = useState(false);

  const { data: { user, workspace } = {} } = useGetDetailWorkspace();

  const {
    isPending: isPendingDeleteWorkspace,
    isError: isErrorDeleteWorkspace,
    mutateAsync: deleteWorkspace,
  } = useDeleteWorkspace();

  useEffect(() => {
    formHandler.reset();
  }, [open]);

  async function onSubmit() {
    const response = await deleteWorkspace();

    if (isErrorDeleteWorkspace || !response) {
      toast({
        message: 'Delete workspace failed. Please try again.',
        type: 'error',
      });
      return;
    }

    if (response.code === '409') {
      toast({
        message: 'Domain exists',
        type: 'error',
      });
      return;
    }

    await getSession();

    if (response.domain) {
      router.push(`/${response.domain}`);
    } else {
      router.push(PATH.WORKSPACE);
    }
  }

  return (
    <>
      <LoadingDialog
        message='Deleting workspace...'
        open={ isPendingDeleteWorkspace }
      />
      <Dialog
        open={ open }
        onOpenChange={ setOpen }
      >
        <Dialog.Trigger asChild>
          <Button
            disabled={ !user || user.userOnWorkspace?.role === ROLE_USER_ON_WORKSPACE.MEMBER }
            color='red'
          >
            Delete this workspace
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <div
            onClick={ () => setOpen(false) }
            className='
          absolute top-3.5 right-[14px] cursor-pointer
          btn-icon bg-accent-light rounded-full text-xs flex justify-center items-center'
          >
            <Icons.close />
          </div>

          <Col gap={ 1 }>
            <p className='text-[#9b9a98] text-sm font-medium mt-4'>
              This action cannot be undone. This will permanently delete the workspace,
              including all pages and files.
              Please type the name of the workspace to confirm.
            </p>
          </Col>

          <form
            onSubmit={ formHandler.handleSubmit(onSubmit) }
            className='space-y-4'
          >
            <Input
              { ...formHandler.register('nameWorkspace') }
              placeholder={ workspace?.name }
              sizeInput='md'
            />
            <div className='flex justify-end pt-4 gap-1'>
              <Button
                color='red'
                disabled={ formHandler.watch('nameWorkspace') !== workspace?.name }
                type='submit'
              >
                  Permanently delete workspace
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
