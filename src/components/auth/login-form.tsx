'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { cn } from 'core/helpers';
import {
  Button, Col, Icons, Input
} from 'core/components';
import { toast } from 'core/components';
import { loginSchema } from 'lib/validations/auth';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof loginSchema>

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const {
    register, reset, handleSubmit, formState: { errors }, clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOAuth, setIsLoadingOAuth] = useState(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    if (!searchParams) return;
    setIsLoading(true);
    const signInResult = await signIn('email', {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams.get('from') || '/',
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        // title: "Something went wrong.",
        message: 'Your sign in request-server failed. Please try again.',
        type: 'error',
      });
    }

    return toast({
      // title: "Check your email",
      message: 'We sent you a login link. Be sure to check your spam too.',
      type: 'success',
    });
  }

  const onOAuth = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    provider: 'github' | 'google'
  ) => {
    e.preventDefault();
    clearErrors();
    reset();
    await signIn(provider);
    setIsLoadingOAuth(true);
  };

  return (
    <div
      className={ cn('grid gap-6', className) }
      { ...props }
    >
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className='grid gap-4'>
          <div className='grid gap-1'>
            <Input
              placeholder='Enter your email address...'
              label='Email'
              id='email'
              { ...register('email') }
              error={ errors.email?.message }
              disabled={ isLoading || isLoadingOAuth }
            />
          </div>
          <Button
            onClick={ handleSubmit(onSubmit) }
            disabled={ isLoadingOAuth }
            isLoading={ isLoading }
          >
            Continue with email
          </Button>
        </div>
      </form>

      <div className='w-full border-t border-accent-light' />

      <Col gap={ 4 }>
        <Button
          classes='font-medium'
          onClick={ (e) => onOAuth(e, 'github') }
          variant='default'
          disabled={ isLoading || isLoadingOAuth }
          iconLeft={ <Icons.github className='h-4 w-4' /> }
        >
          Continue with Github
        </Button>
        <Button
          classes='font-medium'
          onClick={ (e) => onOAuth(e, 'google') }
          variant='default'
          disabled={ isLoading || isLoadingOAuth }
          iconLeft={ <Icons.google className='h-4 w-4' /> }
        >
          Continue with Google
        </Button>
      </Col>
    </div>
  );
}
