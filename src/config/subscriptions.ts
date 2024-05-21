import { SubscriptionPlan } from 'types';

export const freePlan: SubscriptionPlan = {
  name: 'Free',
  description: 'The free plan is limited to 5 notebooks & permission teams.',
  stripePriceId: null,
  limitedNotebooks: 5,
};

export const standardPlan: SubscriptionPlan = {
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID ?? null,
  name: 'Standard',
  description: 'The Standard plan has unlimited blocks for teams and permission feature',
  limitedNotebooks: 0,
};

export const plusPlan: SubscriptionPlan = {
  name: 'Plus',
  description: 'The Plus plan has private teamspaces, increase page retention time',
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID ?? null,
  limitedNotebooks: 0,
};
