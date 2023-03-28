import { redirect } from "next/navigation";

import Navigate from "components/marketing/header/navigate";
import { getCurrentUser } from "lib/session";
import { getTrackingUserAccess } from "lib/request/tracking";
import { Col } from "core/components";

interface MarketingProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children
}: MarketingProps) {

  const user = await getCurrentUser()

  if (user) {

    if (!user.lastAccessWorkspace || user.workspaces.length === 0) {
      redirect('/workspace')
    }

    const track = await getTrackingUserAccess(user.lastAccessWorkspace.id, user.id)
    const domain = user.lastAccessWorkspace.domain

    if (track.lastAccessNotebookId && !track.lastAccessPageId) {
      return redirect(`/${domain}/${track.lastAccessNotebookId}`)
    }
    if (track.lastAccessPageId && track.lastAccessNotebookId) {
      return redirect(`/${domain}/${track.lastAccessNotebookId}/${track.lastAccessPageId}`)
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

