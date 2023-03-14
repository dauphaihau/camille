"use client"

import * as React from "react"

import { UserSubscriptionPlan } from "types"
import { cn, formatDate } from "lib/utils"
import { Card } from "core/components/card"
import { toast } from "core/components/Toast"
import { Button, Icons } from "core/components"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  workspace: object
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean
  }
}

export function BillingForm({
  workspace,
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(!isLoading)

    // Get a Stripe session URL.
    const response = await fetch("http://localhost:3000/api/settings/workspace/stripe?" + new URLSearchParams({
      workspaceId: workspace.id
    }))
    // const response = await fetch("/api/users/stripe")

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        message: "Please refresh the page and try again.",
        type: "error",
      })
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  return (
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
      <Card>
        <Card.Header>
          <Card.Title>{subscriptionPlan.name}</Card.Title>
          {/*<Card.Title>Pro</Card.Title>*/}
          <Card.Description>
            You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
            plan.
            {/*Advanced collaboration and support for teams*/}
          </Card.Description>
        </Card.Header>
        <Card.Content>{subscriptionPlan.description}</Card.Content>
        {/*<Card.Content>Advanced collaboration and support for teams</Card.Content>*/}
        <Card.Footer className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">

          {/*<button*/}
          {/*  type="submit"*/}
          {/*  className={cn(*/}
          {/*    "relative inline-flex h-9 items-center justify-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",*/}
          {/*    {*/}
          {/*      "cursor-not-allowed opacity-60": isLoading,*/}
          {/*    }*/}
          {/*  )}*/}
          {/*  disabled={isLoading}*/}
          {/*>*/}
          {/*  {isLoading && (*/}
          {/*    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>*/}
          {/*  )}*/}
          {/*  {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade"}*/}
          {/*</button>*/}

          <Button
            type='submit'
            isLoading={isLoading}
            disabled={isLoading}
          >
            {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade"}
          </Button>


          {subscriptionPlan.isPro ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
            </p>
          ) : null}
        </Card.Footer>
      </Card>
    </form>
  )

  // return (
  //   <form className={cn(className)} onSubmit={onSubmit} {...props}>
  //     <Card>
  //       <Card.Header>
  //         <Card.Title>Plan</Card.Title>
  //         <Card.Description>
  //           You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
  //           plan.
  //         </Card.Description>
  //       </Card.Header>
  //       <Card.Content>{subscriptionPlan.description}</Card.Content>
  //       <Card.Footer className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
  //         <button
  //           type="submit"
  //           className={cn(
  //             "relative inline-flex h-9 items-center justify-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
  //             {
  //               "cursor-not-allowed opacity-60": isLoading,
  //             }
  //           )}
  //           disabled={isLoading}
  //         >
  //           {isLoading && (
  //             <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
  //           )}
  //           {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to PRO"}
  //         </button>
  //         {subscriptionPlan.isPro ? (
  //           <p className="rounded-full text-xs font-medium">
  //             {subscriptionPlan.isCanceled
  //               ? "Your plan will be canceled on "
  //               : "Your plan renews on "}
  //             {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
  //           </p>
  //         ) : null}
  //       </Card.Footer>
  //     </Card>
  //   </form>
  // )
}
