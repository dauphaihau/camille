import { redirect } from "next/navigation"

import { getCurrentUser } from "lib/session"
import { stripe } from "lib/stripe"
import { getWorkspaceSubscriptionPlan } from "lib/request/subscription"
import { BillingForm } from "components/dashboard/billing-form"
import { DashboardSettingsShell } from "components/dashboard/settings/shell"
import { DashboardSettingsHeader } from "components/dashboard/settings/header"
import { PATH } from "config/const";

export default async function PlansPage({ params }) {
  const user = await getCurrentUser()
  if (!user) {
    redirect(PATH.LOGIN)
  }

  const subscriptionPlan = await getWorkspaceSubscriptionPlan({ domain: params.domainWorkspace })

  // If workspace has a standard plan, check cancel status on Stripe.
  let isCanceled = false
  if (subscriptionPlan?.isStandard && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(subscriptionPlan.stripeSubscriptionId)
    isCanceled = stripePlan.cancel_at_period_end
  }

  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading="Plans"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        {/*@ts-ignore*/}
        <BillingForm subscriptionPlan={{ ...subscriptionPlan, isCanceled }}/>

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
            <p className=''>
              {' '} You can find a list of test card numbers on the{" "}
              <a
                href="https://stripe.com/docs/testing#cards"
                target="_blank"
                rel="noreferrer"
                className="text-link"
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
