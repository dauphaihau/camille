import { redirect } from "next/navigation";

import Navigate from "components/marketing/header/navigate";
import { getCurrentUser } from "lib/session";
import { getTrackingUserAccess } from "lib/request/tracking";

interface MarketingProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children
}: MarketingProps) {

  const user = await getCurrentUser()
  if (user) {
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
    <div className='flex flex-col min-h-screen max-w-5xl mx-auto'>
      <header className='w-full bg-white'>
        <Navigate/>
      </header>
      <main>{children}</main>
    </div>
  );
}

