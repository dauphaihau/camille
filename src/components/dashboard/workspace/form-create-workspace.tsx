'use client';

import { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Col, Input } from 'core/components';
import { toast } from 'core/components';
import { createWorkspaceSchema } from 'lib/validations/workspace';
import { LoadingDialog } from 'components/dialog/loading-dialog';
import { PATH } from 'config/const';
import { ICreateWorkspace } from 'types/workspace';
import { useCreateWorkspace } from 'lib/request-client/workspace';

interface State {
  isFocusDomainField: boolean,
  messageDialog: string
}

export default function FormCreateWorkspace() {
  const router = useRouter();

  const [state, setState] = useReducer(
    (state: State, newState: Partial<State>) => ({
      ...state, ...newState,
    }),
    {
      isFocusDomainField: false,
      messageDialog: 'Getting ready...',
    }
  );

  const {
    isPending: isPendingCreateWorkspace,
    mutateAsync: createWorkspace,
    data: responseCreatedWorkspace,
    isError: isErrorCreateWorkspace,
  } = useCreateWorkspace();

  const methodsRhf = useForm<ICreateWorkspace>({
    mode: 'onChange',
    resolver: zodResolver(createWorkspaceSchema),
  });

  useEffect(() => {
    if (!state.isFocusDomainField) {
      let suggestDomain = methodsRhf.watch('name')
        .toLowerCase()
        .replace(/ +/g, '-')
        .replace(/[^a-z0-9._-]/gi, '');

      if (suggestDomain.at(-1) === '-') {
        suggestDomain.substring(0, suggestDomain.length - 1);
      }

      if (suggestDomain.at(0) === '-') {
        suggestDomain = suggestDomain.substring(1);
      }
      methodsRhf.setValue('domain', suggestDomain);

    }
  }, [methodsRhf.watch('name')]);

  async function onSubmit(values: ICreateWorkspace) {

    // validate domain
    if (values.domain && PATH[values.domain.toUpperCase()]) {
      methodsRhf.setError('domain', { type: 'custom', message: 'Not allowed' });
      return;
    }

    await createWorkspace(values);

    if (isErrorCreateWorkspace) {
      toast({
        message: 'Something went wrong.',
        type: 'error',
      });
      return;
    }

    if (responseCreatedWorkspace && responseCreatedWorkspace?.code === '409') {
      toast({
        message: responseCreatedWorkspace.message,
        type: 'error',
      });
      return;

      // methodsRhf.setError('domain', { type: 'custom', message: 'Domain exists' })
    }

    setState({ messageDialog: 'taking you to your workspace...' });

    await getSession();
    router.refresh();
    router.push(`/${values.domain}`);
  }

  return (
    <>
      <LoadingDialog
        message={ state.messageDialog }
        open={ isPendingCreateWorkspace }
      />
      <form onSubmit={ methodsRhf.handleSubmit(onSubmit) }>
        <Col
          style={ { boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 20px' } }
          classes='gap-6 p-6 border-gray-200 rounded-md mb-4'
        >
          <Input
            { ...methodsRhf.register('name') }
            autoFocus
            sizeInput='md'
            id='name'
            placeholder='e.g. company name'
            label='Name'
          />
          <Input
            { ...methodsRhf.register('domain') }
            onFocus={ () => setState({ isFocusDomainField: true }) }
            labelLeft={ window.location.host + '/' }
            classesLabelLeft='left-[-2%] text-[#6c6f75] font-medium text-[13px]'
            classes={ process.env.NODE_ENV === 'production' ? 'pl-[8.6rem]' : 'pl-[7rem]' }
            sizeInput='md'
            id='domain'
            label='Domain'
          />
        </Col>
        <div className='text-center'>
          <Button
            disabled={ !methodsRhf.formState.isDirty }
            size='md'
            classes='mt-2'
            type='submit'
          >Create workspace
          </Button>
        </div>
      </form>
    </>
  );
}
