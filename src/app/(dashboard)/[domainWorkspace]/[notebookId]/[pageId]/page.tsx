import { notFound, redirect } from "next/navigation"

import { getCurrentUser } from "lib/session"
import { Editor } from "components/dashboard/editor"
import { getPage } from "lib/request/page"
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

  if (!page) {
    notFound()
  }

  return (
    <>
      <OperationOnTopPage page={page}/>
      <div
        className='overflow-scroll max-h-full'
        style={{
          height: 'calc(100vh - 45px)'
        }}
      >
        <Editor page={page}/>
      </div>
    </>
  )
}
