"use client"

import * as React from "react"
import * as z from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { userAuthSchema } from "lib/validations/auth";
import { cn } from "core/helpers"
import { Button, Col, Icons, Input } from "core/components"
import { toast } from "core/components"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const methods = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  useEffect(() => {
    if (!methods.watch('email')) {
      methods.reset()
    }
  }, [methods.watch('email')])

  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    if (!searchParams) return
    setIsLoading(true)
    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams.get("from") || "/",
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        // title: "Something went wrong.",
        message: "Your sign in request failed. Please try again.",
        type: "error",
      })
    }

    return toast({
      // title: "Check your email",
      message: "We sent you a login link. Be sure to check your spam too.",
      type: "success",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Input
                placeholder='Enter your email address'
                label='Email'
                id='email'
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={methods.handleSubmit(onSubmit)}
              disabled={!methods.watch('email')}
              isLoading={isLoading}
            >
              Continue with email
            </Button>
          </div>
        </form>
      </FormProvider>

      <div className="w-full border-t border-[#dfdedc]"/>

      <Col gap={4}>
        <Button
          classes={'font-medium'}
          onClick={(e) => {
            e.preventDefault();
            signIn("github")
            setIsLoading(true)
          }}
          variant='default'
          disabled={isLoading}

          iconLeft={<Icons.github className='h-4 w-4'/>}
        >
          Continue with Github
        </Button>
        <Button
          classes={'font-medium'}
          onClick={(e) => {
            e.preventDefault();
            signIn("google")
            setIsLoading(true)
          }}
          variant='default'
          disabled={isLoading}
          iconLeft={
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4 googleLogo"
            >
              <g>
                <path
                  d="M19.9996 10.2297C19.9996 9.54995 19.9434 8.8665 19.8234 8.19775H10.2002V12.0486H15.711C15.4823 13.2905 14.7475 14.3892 13.6716 15.0873V17.586H16.9593C18.89 15.8443 19.9996 13.2722 19.9996 10.2297Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M10.2002 20.0003C12.9518 20.0003 15.2723 19.1147 16.963 17.5862L13.6753 15.0875C12.7606 15.6975 11.5797 16.0429 10.2039 16.0429C7.54224 16.0429 5.28544 14.2828 4.4757 11.9165H1.08301V14.4923C2.81497 17.8691 6.34261 20.0003 10.2002 20.0003Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M4.47227 11.9163C4.04491 10.6743 4.04491 9.32947 4.47227 8.0875V5.51172H1.08333C-0.363715 8.33737 -0.363715 11.6664 1.08333 14.4921L4.47227 11.9163Z"
                  fill="#FBBC04"
                ></path>
                <path
                  d="M10.2002 3.95756C11.6547 3.93552 13.0605 4.47198 14.1139 5.45674L17.0268 2.60169C15.1824 0.904099 12.7344 -0.0292099 10.2002 0.000185607C6.34261 0.000185607 2.81497 2.13136 1.08301 5.51185L4.47195 8.08764C5.27795 5.71762 7.53849 3.95756 10.2002 3.95756Z"
                  fill="#EA4335"
                ></path>
              </g>
            </svg>
          }
        >
          Continue with Google
        </Button>
      </Col>
    </div>
  )
}
