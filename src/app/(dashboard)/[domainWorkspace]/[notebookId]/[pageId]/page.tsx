import { notFound, redirect } from "next/navigation"

import { getCurrentUser } from "lib/session"
import { authOptions } from "lib/auth"
import { Editor } from "components/dashboard/editor"
import { getPage } from "lib/request/notebook"
import { updateTrackingUserAccess } from "lib/request-by-swr/workspace";

interface EditorPageProps {
  params: { pageId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  const page = await getPage(params.pageId, user.id)

  await updateTrackingUserAccess(user.id, { pageId: params.pageId})

  if (!page) {
    notFound()
  }

  return (
    <Editor
      page={{
        id: page.id,
        title: page.title,
        content: page.content,
        published: page.published,
      }}
    />
  )
}
