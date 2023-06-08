'use client'

import { notFound, usePathname } from "next/navigation";
import { useGetDetailPageShareToWeb } from "../../lib/request-by-swr/page";
import LoadingFullPage from "../../app/(marketing)/loading";
import { Editor } from "../dashboard/editor";
import OperationOnTopSharePage from "./operation-on-top-share-page";

export default function PageShareToWeb() {
  const pathname = usePathname()
  const pageId = pathname && pathname.split('/')[3]

  const { page, isLoading } = useGetDetailPageShareToWeb(pageId)

  if (isLoading) {
    return <LoadingFullPage/>
  }

  if (!page) {
    return notFound()
  }

  return (
    <>
      <OperationOnTopSharePage page={page}/>
      <div
        className='max-h-full'
        style={{ height: 'calc(100vh - 45px)' }}
      >
        <Editor readOnly page={page}/>
      </div>
    </>
  );
}
