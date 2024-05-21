import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { standardPlan } from 'config/subscriptions';
import { withMethods } from 'lib/api-middlewares/with-methods';
import { getWorkspaceSubscriptionPlan } from 'lib/request-server/subscription';
import { stripe } from 'lib/stripe';
import { absoluteUrl } from 'core/helpers';
import { authOptions } from 'lib/auth';
import { withPermission } from 'lib/api-middlewares/with-permission';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(400);
      }
      const user = session.user;

      const settingsPlansUrl = absoluteUrl(`/${req.query.domainWorkspace}/settings/plans`);

      const subscriptionPlan = await getWorkspaceSubscriptionPlan(req.query.workspaceId as string);
      if (!subscriptionPlan) {
        return res.status(400);
      }

      // ----  The workspace is on the standard plan.
      // Create a portal session to manage subscription.
      if (subscriptionPlan.isStandard) {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: subscriptionPlan.stripeCustomerId,
          return_url: settingsPlansUrl,
        });
        return res.json({ url: stripeSession.url });
      }

      // ---- The workspace is on the free plan.
      // Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsPlansUrl,
        cancel_url: settingsPlansUrl,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: user.email as string ,
        line_items: [
          {
            price: standardPlan.stripePriceId as string,
            quantity: 1,
          },
        ],
        metadata: {
          userId: user.id,
          workspaceId: req.query.workspaceId as string,
        },
        // customer_email: user?.email ?? undefined,
        // line_items: [
        //   {
        //     price: standardPlan?.stripePriceId ?? undefined,
        //     quantity: 1,
        //   },
        // ],
        // metadata: {
        //   userId: user.id,
        //   workspaceId: req.query.workspaceId as string,
        // },
      });

      return res.json({ url: stripeSession.url });
    } catch (error) {
      // return res.status(500).end()
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}

export default withMethods(['GET'], withPermission(handler));
