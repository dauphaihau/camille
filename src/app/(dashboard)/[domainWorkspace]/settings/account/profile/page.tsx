import { notFound, redirect } from "next/navigation";

import { DashboardSettingsHeader } from "components/dashboard/settings/header";
import { DashboardSettingsShell } from "components/dashboard/settings/shell"
import { Grid } from "core/components";
import UpdateProfileForm from "components/dashboard/settings/account/profile/update-profile-form";
import { getInfoUserOnWorkspace } from "lib/request/user";
import { getCurrentUser } from "lib/session";
import { PATH } from "config/const";
import UpdateAvatar from "components/dashboard/settings/account/profile/upload-avatar";

export default async function ProfilePage({ params }) {
  const user = await getCurrentUser()
  if (!user) redirect(PATH.HOME)

  const userOnWorkspace = await getInfoUserOnWorkspace(user.id, { domain: params.domainWorkspace })
  if (!userOnWorkspace) {
    return notFound()
  }

  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading="Profile"
        text="Manage your Camille account"
      />
      <Grid classes="gap-6">
        <div className='space-y-3'>
          <UpdateAvatar user={user}/>
        </div>
        <div className='space-y-3'>
          <div>
            <div className='text-sm font-medium text-[#3c4149] dark:text-white'>Email</div>
            <div className='text-[#6b6f76] text-[13px]'>{userOnWorkspace?.user?.email}</div>
          </div>
          <UpdateProfileForm user={user}/>
        </div>

        {/*<div className='border-gray-200 border-b'/>*/}
        {/*<div className='space-y-2'>*/}
        {/*  <div>Password</div>*/}
        {/*  <div className='text-sm text-[#6b6f7c]'>You can set a permanent password if you don't want to use temporary*/}
        {/*    login codes.*/}
        {/*  </div>*/}
        {/*  <Button variant='default'>*/}
        {/*    Set password*/}
        {/*  </Button>*/}
        {/*</div>*/}

        {/*<div className='border-gray-200 border-b'/>*/}
        {/*<div className='space-y-2'>*/}
        {/*  <div>Danger zone</div>*/}
        {/*  <Button color='red'>Delete my account</Button>*/}
        {/*</div>*/}
      </Grid>
    </DashboardSettingsShell>
  )
}
