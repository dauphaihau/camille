import { redirect } from "next/navigation"

import { getCurrentUser } from "lib/session"
import { authOptions } from "lib/auth"
import { stripe } from "lib/stripe"
import { getUserSubscriptionPlan as getUserSubscriptionPlan, getWorkspaceSubscriptionPlan } from "lib/subscription"
import { Card } from "core/components/card"
import { DashboardShell } from "components/dashboard/shell"
import { BillingForm } from "components/dashboard/billing-form"
import { DashboardSettingsShell } from "components/dashboard/settings/shell"
import { DashboardSettingsHeader } from "components/dashboard/settings/header"

export default async function PlansPage({ params }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  const workspaceCurrent = user.workspaces.find((item) => item.domain === params.domainWorkspace)
  const subscriptionPlan = await getWorkspaceSubscriptionPlan(workspaceCurrent.id)

  // console.log('dauphaihau debug: subscription-plan', subscriptionPlan)

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false
  if (subscriptionPlan.isPro) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }


  console.log('dauphaihau debug: workspace-current', workspaceCurrent)

  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading="Plans"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <BillingForm
          workspace={workspaceCurrent}
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
        <div>
          <div className='text-xl font-semibold mb-2'>
            Note
          </div>
          <div className='text-[#7d7c78] text-sm'>
            <p className=''>
              Camille app is a demo app using a Stripe test environment.{" "}
              <strong>
                You can test the upgrade and won&apos;t be charged.
              </strong>
            </p>
            <p>
              {' '} You can find a list of test card numbers on the{" "}
              <a
                href="https://stripe.com/docs/testing#cards"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-8"
              >
                Stripe docs
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </DashboardSettingsShell>
  )
}
