import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { authOptions } from 'lib/auth';
import { absoluteUrl } from 'core/helpers';
import { getWorkspaceSubscriptionPlan } from 'services/server-actions/subscription';
import { stripe } from 'lib/stripe';
import { standardPlan } from 'config/subscriptions';
import { PATH, ROLE_USER_ON_WORKSPACE } from 'config/const';
import { db } from 'lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.email) {
      return new Response(ReasonPhrases.UNAUTHORIZED, {
        status: StatusCodes.UNAUTHORIZED,
      }) ;
    }

    const searchParams = req.nextUrl.searchParams;
    const domainWorkspace = searchParams.get('domainWorkspace');
    const workspaceId = searchParams.get('workspaceId');

    if (!domainWorkspace || !workspaceId) {
      return new Response(null, {
        status: StatusCodes.BAD_REQUEST,
      });
    }

    const userRequest = await db.userOnWorkspace.findFirst({
      where: {
        AND: [
          { userId: { equals: session.user.id } },
          { workspaceId: { equals: workspaceId || workspaceId } },
        ],
      },
    });

    if (!userRequest || userRequest.role === ROLE_USER_ON_WORKSPACE.MEMBER) {
      return new Response(null, {
        status: StatusCodes.FORBIDDEN,
      });
    }

    const settingsPlansUrl = absoluteUrl(`/${domainWorkspace}${PATH.SETTINGS}${PATH.PLANS}`);

    const subscriptionPlan = await getWorkspaceSubscriptionPlan(workspaceId);
    if (!subscriptionPlan) {
      return new Response(null, {
        status: StatusCodes.BAD_REQUEST,
      });
    }

    // ----  The workspace is on the standard plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isStandard) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId as string,
        return_url: settingsPlansUrl,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    if (!standardPlan.stripePriceId) {
      return new Response(null, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }

    // ---- The workspace is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsPlansUrl,
      cancel_url: settingsPlansUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: session.user.email,
      line_items: [
        {
          price: standardPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        workspaceId: workspaceId,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    return new Response(null, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
