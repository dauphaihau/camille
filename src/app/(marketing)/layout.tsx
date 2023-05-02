import { redirect } from "next/navigation";

import Navigate from "components/marketing/header/navigate";
import { getCurrentUser, getSession } from "lib/session";
import { getTrackingUserAccess } from "lib/request/tracking";
import { Col } from "core/components";
import { PATH } from "config/const";
import { db } from "../../lib/db";

interface MarketingProps {
  children: React.ReactNode
}

export async function testNha() {
  // const user = await db.user.findUnique({
  const user = await db.user.findFirst({
    where: {
      email: 'dauphaihau@yopmail.com',
    },
    select: {
      emailVerified: true,
    },
  })

  console.log('dauphaihau debug: user', user)
}

export default async function MarketingLayout({
  children
}: MarketingProps) {

  const user = await getCurrentUser()
  // const test = await testNha()

  if (user) {
    if (!user.lastAccessWorkspace || user.workspaces.length === 0) {
      redirect(PATH.WORKSPACE)
    }

    const track = await getTrackingUserAccess(user.lastAccessWorkspace.id as string, user.id)
    const domain = user.lastAccessWorkspace.domain

    if (track) {
      if (track.lastAccessNotebookId && !track.lastAccessPageId) {
        return redirect(`/${domain}/${track.lastAccessNotebookId}`)
      }
      if (track.lastAccessPageId && track.lastAccessNotebookId) {
        return redirect(`/${domain}/${track.lastAccessNotebookId}/${track.lastAccessPageId}`)
      }
    }
    redirect(`/${domain}`)
  }

  return (
    <Col className='min-h-screen max-w-5xl mx-auto'>
      <header className='w-full bg-white'>
        <Navigate/>
      </header>
      <main>{children}</main>
    </Col>
  );
}

