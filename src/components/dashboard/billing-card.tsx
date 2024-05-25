'use client';

import * as React from 'react';

import { formatDate } from 'core/helpers';
import { Card } from 'core/components/card';
import { Button } from 'core/components';
import { ROLE_USER_ON_WORKSPACE } from 'config/const';
import { useGetDetailWorkspace, useUpdatePlanWorkspace } from 'services/query-hooks/workspace';
import { IGetWorkspaceSubscriptionPlan } from 'types/workspace';

type BillingFormProps = {
  subscriptionPlan: IGetWorkspaceSubscriptionPlan
  isCanceled: boolean
}

export function BillingCard({
  subscriptionPlan,
  isCanceled,
}: BillingFormProps) {
  const { data: { user } = {} } = useGetDetailWorkspace();

  const {
    isPending: isPendingUpdatePlanWorkspace,
    mutate: updatePlanWorkspace,
  } = useUpdatePlanWorkspace();

  function updatePlan(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    updatePlanWorkspace();
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>{ subscriptionPlan?.name }</Card.Title>
        <Card.Description>
          You are currently on the <strong className='text-black'>{ subscriptionPlan?.name }</strong>{ ' ' }
          plan.
        </Card.Description>
      </Card.Header>

      <Card.Content>{ subscriptionPlan?.description }</Card.Content>

      <Card.Footer className='flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0'>
        <Button
          isLoading={ isPendingUpdatePlanWorkspace }
          onClick={ updatePlan }
          disabled={
            user?.userOnWorkspace?.role !== ROLE_USER_ON_WORKSPACE.ADMIN ||
            isPendingUpdatePlanWorkspace
          }
        >
          { subscriptionPlan?.isStandard ? 'Manage Subscription' : 'Upgrade' }
        </Button>

        { subscriptionPlan?.isStandard && (
          <p className='rounded-full text-xs font-medium'>
            { isCanceled ?
              'Your plan will be canceled on ' :
              'Your plan renews on ' }
            {
              subscriptionPlan?.stripeCurrentPeriodEnd &&
              formatDate(subscriptionPlan.stripeCurrentPeriodEnd)
            }.
          </p>
        ) }
      </Card.Footer>
    </Card>
  );
}
