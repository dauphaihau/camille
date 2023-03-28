import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import rawBody from "raw-body"

import { stripe } from "lib/stripe"
import { db } from "lib/db"

export const config = {
  api: {
    // Turn off the body parser, so we can access raw body for verification.
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  console.log('dauphaihau debug: webhook-secret', webhookSecret)

  const body = await rawBody(req)
  const signature = req.headers["stripe-signature"]

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`)
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the workspace stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and workspace id.
    await db.workspace.update({
      where: {
        id: session.metadata.workspaceId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await db.workspace.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  return res.json({})
}