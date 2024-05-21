'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Grid } from 'core/components';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';

export default function PermissionAccessWorkspace() {
  const router = useRouter();
  const { data: { user, workspace } = {} } = useGetDetailWorkspace();

  return (
    <Grid classes='h-screen place-items-center'>
      <div className='mx-auto space-y-4 max-w-2xl'>
        <div className='avatar bg-accent h-[57px] w-[57px] rounded text-2xl text-primary-medium flex justify-center items-center mx-auto font-medium'>
          { workspace && workspace.name.charAt(0) }
        </div>
        <div className='text-center space-y-4 text-lg'>
          <div className='max-w-md mx-auto font-medium'>You do not have access
            to <span className='font-bold'>{ workspace?.name }</span>. Please contact an admin to add you
            as
            a member.
          </div>
          <div className='mx-auto'>
            <Button onClick={ router.back }>Back to my content</Button>
          </div>
        </div>
        <div className='border-t border-primary-light mx-auto max-w-xs' />
        <div className='text-[#8d8c89] font-medium text-center text-xs mt-3 '>
          <div>
            You&apos;re currently logged in as { ' ' }
            <span className='text-black'>
              { user?.email }
            </span>
          </div>
          <div className='mt-2'>
            You might need to { ' ' }
            <span
              onClick={ router.back }
              className='text-link font-medium'
            >
              log in
            </span> { ' ' }
            with a different email, or contact the page&apos;s owner to request access to this page.
          </div>
        </div>
      </div>
    </Grid>
  );
}
