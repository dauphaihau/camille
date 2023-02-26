import { getCurrentUser } from "lib/session"
import { authOptions } from "lib/auth"
import { stripe } from "lib/stripe"
import { getUserSubscriptionPlan as getUserSubscriptionPlan } from "lib/subscription"
import { Card } from "core/components/card"
import { DashboardHeader } from "components/dashboard/header"
import { DashboardShell } from "components/dashboard/shell"
import { BillingForm } from "components/dashboard/billing-form"
import { Button, Col, Icons, Input, Row } from "core/components"
import Forms from "components/dashboard/settings/forms-update-workspace"
import { redirect } from "next/navigation"
import { getDetailWorkspace, getListNotebooks } from "../../../../services/notebook";
import { getDomain } from "services/settings";

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  // const subscriptionPlan = await getUserSubscriptionPlan(user.id)
  // // console.log('dauphaihau debug: subscription-plan', subscriptionPlan)
  //
  // // If user has a pro plan, check cancel status on Stripe.
  // let isCanceled = false
  // if (subscriptionPlan.isPro) {
  //   const stripePlan = await stripe.subscriptions.retrieve(
  //     subscriptionPlan.stripeSubscriptionId
  //   )
  //   isCanceled = stripePlan.cancel_at_period_end
  // }



  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        // text="Manage billing and your subscription plan."
      />
      <Col gap={2}>
        <h4 className=''>Your Account</h4>
        <p className='text-neutral-500'>You’re signed in with dauphaihau@gmail.com</p>
      </Col>


      {/*<Button iconLeft={<Icons.logout/>} classes='w-fit'>Log out</Button>*/}
    </DashboardShell>
  )
}
