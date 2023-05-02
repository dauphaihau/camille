"use client"

import * as React from "react"
import { Workspace } from "@prisma/client";

import { WorkspaceSubscriptionPlan } from "types"
import { cn, formatDate } from "lib/utils"
import { Card } from "core/components/card"
import { toast } from "core/components/Toast"
import { Button } from "core/components"
import { ROLE_USER_ON_WORKSPACE } from "config/const";
import useStore from "lib/store";

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  workspace: Workspace,
  subscriptionPlan: WorkspaceSubscriptionPlan & {
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
  const userOnWorkspace = useStore(state => state.userOnWorkspace)
  if (!userOnWorkspace) return null

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(!isLoading)

    // Get a Stripe session URL.
    const response = await fetch("http://localhost:3000/api/settings/workspace/stripe?" + new URLSearchParams({
      workspaceId: workspace.id,
      domainWorkspace: workspace.domain,
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

          <Button
            type='submit'
            isLoading={isLoading}
            disabled={userOnWorkspace.role === ROLE_USER_ON_WORKSPACE.MEMBER || isLoading}
          >
            {subscriptionPlan.isStandard ? "Manage Subscription" : "Upgrade"}
          </Button>

          {subscriptionPlan.isStandard ? (
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
}
