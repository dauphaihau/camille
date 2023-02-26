import { notFound, redirect } from "next/navigation"

import { Page, User } from "@prisma/client"
import { db } from "lib/db"
import { getCurrentUser } from "lib/session"
import { authOptions } from "lib/auth"
import { Editor } from "components/dashboard/editor"
import { getPages } from "services/notebook"

interface EditorPageProps {
  params: { pageId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages.signIn)
  }

  console.log('dauphaihau debug: params', params)
  const page = await getPages(params.pageId, user.id)
  // const page = await getPostForUser(params.pageId, user.id)

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
