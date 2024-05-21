'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button, Col, Dialog, Icons, Input, Textarea, Tooltip
} from 'core/components';
import { toast } from 'core/components';
import { createTeamspaceSchema } from 'lib/validations/teamspace';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { ICreateTeamspace } from 'types/teamspace';
import { useCreateTeamspace } from 'lib/request-client/teamspace';

export default function NewTeamspaceDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: { workspace } = {} } = useGetDetailWorkspace();

  const {
    isPending: isPendingCreateTeamspace,
    isError: isErrorCreateTeamspace,
    mutateAsync: createTeamspace,
  } = useCreateTeamspace();

  const {
    register, reset, handleSubmit, formState: { errors },
  } = useForm<ICreateTeamspace>({
    resolver: zodResolver(createTeamspaceSchema),
    defaultValues: {
      workspaceId: workspace?.id,
    },
  });

  useEffect(() => {
    reset();
  }, [open, reset]);

  async function onSubmit(data: ICreateTeamspace) {
    if (!workspace?.id) return;

    await createTeamspace({
      workspaceId: workspace.id,
      name: data.name,
      description: data.description,
    });

    if (isErrorCreateTeamspace) {
      toast({
        title: 'Something went wrong.',
        message: 'Your teamspace was not created. Please try again.',
        type: 'error',
      });
      return;
    }

    router.refresh();
    setOpen(!open);
    reset();
  }

  return (
    <Dialog
      open={ open }
      onOpenChange={ setOpen }
    >
      <Dialog.Trigger>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <div>
              <Icons.plus className='btn-icon invisible group-hover:visible' />
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content>New teamspace</Tooltip.Content>
        </Tooltip>
      </Dialog.Trigger>

      <Dialog.Content className='top-20'>
        <div
          onClick={ () => setOpen(false) }
          className='
          absolute top-3.5 right-[14px] cursor-pointer
          btn-icon bg-accent-light rounded-full text-xs flex justify-center items-center'
        >
          <Icons.close />
        </div>

        <Col gap={ 1 }>
          <h4>Create a new teamspace</h4>
          <p className='text-[#9b9a98] text-sm font-medium'>
            Teamspaces are where your team organizes, permissions, and members
          </p>
        </Col>

        <form
          onSubmit={ handleSubmit(onSubmit) }
          className='space-y-3'
        >
          <Input
            { ...register('name') }
            placeholder='DevOps Labs'
            error={ errors.name?.message }
            sizeInput='md'
            label='Name'
          />
          <Textarea
            { ...register('description') }
            placeholder='Detail about your teamspace'
            error={ errors.description?.message }
            rows={ 4 }
            label='Description (optional)'
          />
          <div className='flex justify-end pt-5 gap-1'>
            <Button
              type='submit'
              isLoading={ isPendingCreateTeamspace }
            >
              Create teamspace
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
