'use client'
import { useRouter } from "next/navigation";
import { Button, Grid } from "core/components";
import React from "react";

export default function PermissionAccessWorkspace({ workspace, user }) {
  const router = useRouter()

  return (
    <Grid classes={'h-screen place-items-center'}>
      <div className='mx-auto space-y-4 max-w-2xl'>
        <div className='avatar bg-[#ecebea] group-hover:bg-[#dcdbda] h-[57px] w-[57px] rounded text-2xl text-[#777572] flex justify-center items-center mx-auto font-medium'>
          {workspace && workspace.name.charAt(0)}
        </div>
        <div className='text-center space-y-4 text-[20px]'>
          <div className={'max-w-md mx-auto font-medium'}>You do not have access
            to <span className={'font-bold'}>{workspace.name}</span>. Please contact an admin to add you
            as
            a member.
          </div>
          <div className='mx-auto'>
            <Button onClick={() => router.back()}>Back to my content</Button>
          </div>
        </div>
        <div className='border-t border-[#e9e9e8] mx-auto max-w-xs'/>
        <div className={'text-[#8d8c89] font-medium text-center text-xs mt-3 '}>
          <div>
            You're currently logged in as {' '}
            <span className='text-black'>
            {user.email}
              </span>
          </div>
          <div className={'mt-2'}>
            You might need to <span
            onClick={() => router.back()}
            className={'text-link font-medium'}
          >log in</span> {' '}
            with a different email, or contact the page's owner to request access to this page.
          </div>
        </div>
      </div>
    </Grid>
  );
}
