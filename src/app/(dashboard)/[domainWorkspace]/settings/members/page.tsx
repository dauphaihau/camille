import { redirect } from "next/navigation";

import { DashboardSettingsHeader } from "components/dashboard/settings/header";
import { DashboardSettingsShell } from "components/dashboard/settings/shell"
import { Col } from "core/components";
import { getCurrentUser } from "lib/session";
import { PATH } from "config/const";
import { getListMembers } from "lib/request/settings";
import { MemberList } from "components/dashboard/settings/member/member-list";

export default async function MembersPage({ params }) {
  const user = await getCurrentUser()
  if (!user) redirect(PATH.HOME)

  const members = await getListMembers(params.domainWorkspace)

  return (
    <DashboardSettingsShell>
      <DashboardSettingsHeader
        heading="Members"
        text="Manage who has access to this workspace"
      />
      {/*<Col classes='gap-6'>*/}
      {/*  <Col>*/}
      {/*    <p>Allowed email domains</p>*/}
      {/*    <p className='text-[#6b6f76] text-[13px]'>Anyone with an email address at these domains is allowed to sign up*/}
      {/*      for this workspace.</p>*/}
      {/*  </Col>*/}
      {/*</Col>*/}

      {/*<div className='border-b border-[#fafafa] my-3'/>*/}

      <Col classes='gap-6'>
        <Col>
          <p>Manage members</p>
          <p className='text-[#6b6f76] text-[13px]'>Anyone with an email address at these domains is allowed to sign up
            for this workspace.</p>
        </Col>
        <MemberList members={members}/>
      </Col>
    </DashboardSettingsShell>
  )
}
