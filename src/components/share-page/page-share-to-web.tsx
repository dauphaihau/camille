'use client'

import { notFound, usePathname } from "next/navigation";
import { useGetDetailPageShareToWeb } from "../../lib/request-by-swr/page";
import LoadingFullPage from "../../app/loading";
import { Editor } from "../dashboard/editor";
import OperationOnTopPage from "../dashboard/page/header/operation-on-top-page";
import OperationOnTopSharePage from "./operation-on-top-share-page";

export default function PageShareToWeb() {
  const pathname = usePathname()
  const pageId = pathname && pathname.split('/')[3]

  const { page, isLoading } = useGetDetailPageShareToWeb(pageId)

  if (isLoading) {
    return <LoadingFullPage/>
  }

  console.log('dauphaihau debug: page', page)


  // console.log('dauphaihau debug: -is-loading-page', Boolean( !isLoading && !page ))

  if (!page) {
    return notFound()
  }

  return (
    <>
      <OperationOnTopSharePage page={page}/>
      <div
        className='overflow-scroll max-h-full'
        style={{ height: 'calc(100vh - 45px)' }}
      >
        <Editor page={page}/>
      </div>
    </>
  );
}
