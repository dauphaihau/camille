'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import {
  Button, Dialog, Icons, Input
} from 'core/components';
import { toast } from 'core/components';
import { useAddMember } from 'lib/request-client/settings-member';
import { ROLE_USER_ON_WORKSPACE } from 'config/const';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { IAddMember } from 'types/member';

export default function AddMemberDialog() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const formHandler = useForm();
  const { data: { workspace, user } = {} } = useGetDetailWorkspace();

  const {
    isPending: isPendingAddMember,
    mutateAsync: addMember,
    isError: isErrorAddMember,
  } = useAddMember();

  async function onSubmit({ email }: IAddMember) {
    if (!workspace) return;

    await addMember({
      workspaceId: workspace.id,
      email,
    });

    if (isErrorAddMember) {
      toast({
        title: 'Something went wrong.',
        message: 'Your member was not added. Please try again.',
        type: 'error',
      });
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ['members', workspace.domain],
    });

    setOpen(!open);
    formHandler.reset();
  }

  return (
    <Dialog
      open={ open }
      onOpenChange={ setOpen }
    >
      <Dialog.Trigger asChild>
        <Button
          disabled={
           (user?.userOnWorkspace && user?.userOnWorkspace.role === ROLE_USER_ON_WORKSPACE.MEMBER) as boolean
          }
        >
          Add members
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <h3>Invite member</h3>

        <div
          onClick={ () => setOpen(false) }
          className='
          absolute top-3.5 right-[14px] cursor-pointer
          btn-icon bg-accent-light rounded-full text-xs flex justify-center items-center'
        >
          <Icons.close />
        </div>
        <form
          onSubmit={ formHandler.handleSubmit(onSubmit) }
          className='space-y-3'
        >
          <Input
            // placeholder='Search name or emails'
            // placeholder='Search email'
            { ...formHandler.register('email') }
            disabled={ isPendingAddMember }
            sizeInput='md'
            label='Email'
            id='email'
          />
          <div className='flex justify-end pt-5 gap-1'>
            <Button
              disabled={ formHandler.watch('email') === user?.email || isPendingAddMember }
              type='submit'
              isLoading={ isPendingAddMember }
            >
                Invite
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
