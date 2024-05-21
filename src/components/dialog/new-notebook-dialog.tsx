'use client';

import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import {
  Button, Col, Dialog, Icons, Input, Row, Textarea, Tooltip
} from 'core/components';
import { toast } from 'core/components';
import { useCreateNotebook, useCreateNotebookOnTeamspace } from 'lib/request-client/notebook';
import { useStoreMulti } from 'lib/store';
import { freePlan } from 'config/subscriptions';
import { cn } from 'core/helpers';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { ICreateNotebook } from 'types/notebook';
import { Response } from 'types';

interface NewNotebookDialogProps {
  trigger?: ReactNode;
  teamspaceId?: string;
}

export function NewNotebookDialog({
  trigger,
  teamspaceId,
}: NewNotebookDialogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const {
    isPending: isPendingCreateNotebook,
    mutateAsync: createNotebook,
  } = useCreateNotebook();

  const {
    isPending: isPendingCreateNotebookTs,
    mutateAsync: createNotebookTs,
  } = useCreateNotebookOnTeamspace();

  const formHandler = useForm();

  const {
    setShowLimitedNotebookBar,
  } = useStoreMulti('setShowLimitedNotebookBar');

  const { data: { workspace } = {} } = useGetDetailWorkspace();

  async function onSubmit(data: ICreateNotebook) {
    if (!workspace) return;

    let response: Response;
    if (teamspaceId) {
      response = await createNotebookTs({
        workspaceId: workspace.id,
        teamspaceId,
        title: data.title,
      });
    } else {
      response = await createNotebook({
        workspaceId: workspace.id,
        title: data.title,
        description: data.description,
      });
    }

    if (response && response.code !== '200') {
      if (response.code === '402') {
        setShowLimitedNotebookBar(true);
        setOpen(!open);
        return;
      }

      toast({
        message: 'Your notebooks was not created. Please try again.',
        type: 'error',
      });
      return;
    }

    setOpen(!open);
    formHandler.reset();

    if (teamspaceId) {
      await queryClient.invalidateQueries({
        queryKey: ['notebooks-by-teamspace', teamspaceId],
      });
    }
  }

  const Trigger = () => {
    return trigger ?
      <>{ trigger }</> :
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Row justify='end'>
            <Icons.plus className={ cn('btn-icon invisible ', teamspaceId ? 'group-hover/teamspace:visible' : 'group-hover:visible') } />
          </Row>
        </Tooltip.Trigger>
        <Tooltip.Content className='ml-14 mt-1'>
          <div>New notebook</div>
          {
            !teamspaceId &&
            <div className='text-primary-tooltip'>Notebook you created that are not in any teamspace.</div>
          }
        </Tooltip.Content>
      </Tooltip>;
  };

  if (workspace && !workspace.isStandard &&
    (workspace.totalMembers && workspace.totalMembers > 1) &&
    (workspace.totalNotebooks && workspace.totalNotebooks >= freePlan.limitedNotebooks)
  ) {
    return (
      <div onClick={ () => setShowLimitedNotebookBar(true) }>
        <Trigger />
      </div>
    );
  }

  return (
    <Dialog
      open={ open }
      onOpenChange={ setOpen }
    >
      <Dialog.Trigger className='w-full'>
        <Trigger />
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
          <h4>New Notebook</h4>
          <p className='text-[#9b9a98] text-sm font-medium'>
            A notebook contains pages.
            Each page you create can share with select people, your whole team, or the entire web,
            so that they have access to all of its content.
            { /*A notebook contains notes and tasks. You can add team members to a notebook so that they have access to all*/ }
            { /*of*/ }
            { /*its content.*/ }
          </p>
        </Col>

        <form
          onSubmit={ formHandler.handleSubmit(onSubmit) }
          className='space-y-4'
        >
          <Input
            { ...formHandler.register('title') }
            placeholder='Enter a name for your notebook'
            sizeInput='md'
            label='Name notebook'
          />
          <Textarea
            { ...formHandler.register('description') }
            rows={ 4 }
            label='Description (optional)'
          />
          <div className='flex justify-end pt-5 gap-1'>
            <Button
              disabled={ !formHandler.watch('title') }
              type='submit'
              isLoading={ isPendingCreateNotebook || isPendingCreateNotebookTs }
            >
                Create
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
