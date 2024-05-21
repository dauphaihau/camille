import React from 'react';
import { Skeleton } from 'core/components';
import { DashboardSettingsHeader } from 'components/dashboard/settings/header';
import { DashboardSettingsShell } from 'components/dashboard/settings/shell';

export default async function WorkspaceSettingLoading() {
  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading='Workspace'
        text='Manage your workspace setting.'
      />

      <div className='grid gap-8 max-w-[600px] mx-auto'>
        <div className='space-y-3'>
          <div>Logo</div>
          <Skeleton width={ 64 } height={ 64 } />
          <div className='text-sm text-[#6b6f7c]'>Pick a logo for your workspace. Recommend size is 256x256</div>
        </div>

        <div className='border-gray-200 border-b' />

        <div className='space-y-3 w-1/2'>
          <div className='text-base'>General</div>
          <Skeleton width={ 300 } height={ 58 } />
          <Skeleton width={ 300 } height={ 58 } />
        </div>
        <div className='border-gray-200 border-b' />

        <div className='space-y-4'>
          <div>Delete workspace</div>
          <div className='text-sm text-[#6b6f7c]'>If you want to permanently delete this workspace and all of its data,
            including but not limited to users,
            issues, and comments, you can do so below.
          </div>
          { /*<Button color='red'>Delete this workspace</Button>*/ }
          { /*<DeleteWorkspaceButton user={user} workspaceId={workspace.id}/>*/ }
        </div>
      </div>
    </DashboardSettingsShell>
  );
}
