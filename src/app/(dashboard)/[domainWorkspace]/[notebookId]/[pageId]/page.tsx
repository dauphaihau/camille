import { notFound, redirect } from "next/navigation"

import { getCurrentUser } from "lib/session"
import { Editor } from "components/dashboard/editor"
import { getPage } from "lib/request/page"
// import { updateTrackingUserAccess } from "lib/request-by-swr/workspace";
import { PATH } from "config/const";
import OperationOnTopPage from "components/dashboard/page/header/operation-on-top-page";

interface EditorPageProps {
  params: {pageId: string}
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(PATH.LOGIN)
  }

  const page = await getPage(params.pageId, user.id)

  // await updateTrackingUserAccess(user.id, { pageId: params.pageId })

  if (!page) {
    notFound()
  }

  console.log('dauphaihau debug: page', page)

  return (
    <>
      <OperationOnTopPage page={page}/>
      <div
        className='overflow-scroll max-h-full'
        style={{
          height: 'calc(100vh - 45px)'
        }}
      >
        <Editor
          page={page}
          // page={{
          //   id: page.id,
          //   title: page.title,
          //   content: page.content,
          //   published: page.published,
          // }}
        />
      </div>
    </>
  )
}
