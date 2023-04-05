"use client"

import * as React from "react"
import * as z from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

import { userAuthSchema } from "lib/validations/auth";
import { cn } from "core/helpers"
import { Button, Icons, Input } from "core/components"
import { toast } from "core/components/Toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

type FormData = z.infer<typeof userAuthSchema>

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const methods = useForm<FormData>({
    // mode: 'onChange',
    resolver: zodResolver(userAuthSchema),
  })

  const [isLoading, setIsLoading] = useState(false)
  const [loginForm, setLoginForm] = useState(true)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams.get("from") || "/",
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Your sign in request failed. Please try again.",
        type: "error",
      })
    }

    return toast({
      title: "Check your email",
      message: "We sent you a login link. Be sure to check your spam too.",
      type: "success",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Input
                // placeholder='Enter your email address'
                placeholder='Your email'
                label='Email'
                id='email'
                // type='email'
                disabled={isLoading}
              />
              <p className='text-sm mb-2 mt-1 text-[#7d7b77]'>
                {!loginForm && 'You can also '}
                <span
                  className="underline underline-offset-1 cursor-pointer"
                  onClick={!isLoading ? () => setLoginForm(!loginForm) : () => {}}
                >
                  {loginForm ? 'Forgot password?' : 'continue with email'}
                </span>
              </p>
            </div>
            <Button
              disabled={!methods.formState.isDirty}
              isLoading={isLoading}>
              {loginForm ? 'Continue with email' : 'Send reset link'}
            </Button>
          </div>
        </form>
      </FormProvider>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">Or continue with</span>
        </div>
      </div>

      <Button
        onClick={(e) => {
          e.preventDefault();
          signIn("github")
        }}
        variant='default'
        disabled={isLoading}
        iconLeft={<Icons.github className='h-4 w-4'/>}
      >
        Github
      </Button>
    </div>
  )
}
