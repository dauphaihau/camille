'use client';

import * as React from 'react';

import { WorkspaceSubscriptionPlan } from 'types';
import { formatDate } from 'core/helpers';
import { Card } from 'core/components/card';
import { toast } from 'core/components';
import { Button } from 'core/components';
import { ROLE_USER_ON_WORKSPACE } from 'config/const';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';

type BillingFormProps = {
  subscriptionPlan: WorkspaceSubscriptionPlan & {isCanceled: boolean}
}

export function BillingCard({
  subscriptionPlan,
}: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: { workspace, user } = {} } = useGetDetailWorkspace();

  async function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setIsLoading(!isLoading);

    // Get a Stripe session URL.
    if (workspace?.id && workspace?.domain) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/settings/workspace/stripe?` + new URLSearchParams({
          workspaceId: workspace.id,
          domainWorkspace: workspace.domain,
        })
      );

      if (!response?.ok) {
        toast({
          title: 'Something went wrong.',
          message: 'Please refresh the page and try again.',
          type: 'error',
        });
        return;
      }

      // Redirect to the Stripe session.
      // This could be a checkout page for initial upgrade.
      // Or portal to manage existing subscription.
      const session = await response.json();
      if (session) {
        window.location.href = session.url;
      }
    }
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>{ subscriptionPlan.name }</Card.Title>
        <Card.Description>
          You are currently on the <strong>{ subscriptionPlan.name }</strong>{ ' ' }
          plan.
        </Card.Description>
      </Card.Header>

      <Card.Content>{ subscriptionPlan.description }</Card.Content>

      <Card.Footer className='flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0'>
        <Button
          isLoading={ isLoading }
          onClick={ onClick }
          disabled={
            user?.userOnWorkspace?.role !== ROLE_USER_ON_WORKSPACE.ADMIN ||
            isLoading
          }
        >
          { subscriptionPlan.isStandard ? 'Manage Subscription' : 'Upgrade' }
        </Button>

        { subscriptionPlan.isStandard && (
          <p className='rounded-full text-xs font-medium'>
            { subscriptionPlan.isCanceled ?
              'Your plan will be canceled on ' :
              'Your plan renews on ' }
            { formatDate(subscriptionPlan?.stripeCurrentPeriodEnd) }.
          </p>
        ) }
      </Card.Footer>
    </Card>
  );
}
