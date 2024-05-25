'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { StatusCodes } from 'http-status-codes';
import {
  Button, Col, Dialog, Icons, Input, toast
} from 'core/components';
import { ROLE_USER_ON_WORKSPACE } from 'config/const';
import { useDeleteWorkspace, useGetDetailWorkspace } from 'services/query-hooks/workspace';
import { LoadingDialog } from 'components/dialog/loading-dialog';

export function DeleteWorkspaceButton() {
  const methodsRhf = useForm();

  const [open, setOpen] = useState(false);

  const { data: { user, workspace } = {} } = useGetDetailWorkspace();

  const {
    isPending: isPendingDeleteWorkspace,
    mutateAsync: deleteWorkspace,
  } = useDeleteWorkspace();

  useEffect(() => {
    methodsRhf.reset();
  }, [open]);

  async function onSubmit() {
    const response = await deleteWorkspace();

    if (response.code === StatusCodes.INTERNAL_SERVER_ERROR) {
      toast({
        message: 'Delete workspace failed. Please try again.',
        type: 'error',
      });
      return;
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
            onSubmit={ methodsRhf.handleSubmit(onSubmit) }
            className='space-y-4'
          >
            <Input
              { ...methodsRhf.register('nameWorkspace') }
              placeholder={ workspace?.name }
              sizeInput='md'
            />
            <div className='flex justify-end pt-4 gap-1'>
              <Button
                color='red'
                disabled={ methodsRhf.watch('nameWorkspace') !== workspace?.name }
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
