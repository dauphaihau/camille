import { DashboardSettingsShell } from 'components/dashboard/settings/shell';
import { DashboardSettingsHeader } from 'components/dashboard/settings/header';
import { Skeleton } from 'core/components';

export default function DashboardBillingLoading() {
  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading='Plans'
        text='Manage billing and your subscription plan.'
      />
      <div className='grid gap-10'>

        <Skeleton className='h-[235px] w-full' />

        <div>
          <div className='text-xl font-semibold mb-2'>
            Note
          </div>
          <div className='text-[#7d7c78] text-sm'>
            <p className=''>
              Camille app is a demo app using a Stripe test environment.{ ' ' }
              <strong>
                You can test the upgrade and won&apos;t be charged.
              </strong>
            </p>
            <p>
              { ' ' } You can find a list of test card numbers on the{ ' ' }
              <a
                href='https://stripe.com/docs/testing#cards'
                target='_blank'
                rel='noreferrer'
                className='font-medium underline underline-offset-8'
              >
                Stripe docs
              </a>.
            </p>
          </div>
        </div>
      </div>
    </DashboardSettingsShell>
  );
}
