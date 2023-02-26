import { Notebook } from "@prisma/client"
import Link from "next/link"
import { usePathname } from 'next/navigation';

import { formatDate } from "lib/utils"
import { PostOperations } from "components/dashboard/post-operations"
import { Skeleton } from "ui/skeleton"
import { Icons } from "core/components";
import { getDetailNotebook } from "../../../services/notebook";
import { useDetailNotebook } from "../../../services/page";
import { PageItem } from "../sidebar/page-item-sidebar";
import { useState } from "react"
import { cn } from "core/helpers";
import { PageCreateButton } from "./page-create-button-sidebar";
import { PageOperations } from "./post-operations-sidebar";

interface NotebookItemProps {
  notebook: Pick<Notebook, "id" | "title" | "description" | "published" | "createdAt" | "pages">
}

export function NotebookItem({ notebook }: NotebookItemProps) {
  const [showPages, setShowPages] = useState(false)
  const pathName = usePathname()

  console.log('dauphaihau debug: notebook', notebook)

  // const res = await getDetailNotebook(params.notebookId)
  // const { isLoading, pages } = useDetailNotebook(notebook.id)

  // console.log('dauphaihau debug: pages', pages)
  console.log('dauphaihau debug: path-name', pathName.split('/'))
  const splited = pathName.split('/')
  console.log('dauphaihau debug: splited-3-notebook-id', splited[3] === notebook.id)

  return (
    <>
      <div
        className={cn(`flex items-center justify-between hover:bg-[#ecebea] py-[2px] pr-[12px] pl-[5px] rounded-sm max-h-[27px] cursor-pointer group/notebook`,
          { ['bg-[#f1f1f0]']: splited[3] === notebook.id && splited.length === 4 }
        )}
      >
        <div className='flex gap-1 items-center'>
          <Icons.arrowRightSline
            size={12}
            // className={`text-[#73726e] ${showPages ? 'rotate-90' : 'rotate-0'}`}
            className={`btn-icon
             ${showPages ? 'rotate-90' : 'rotate-0'}`}
            onClick={() => setShowPages(!showPages)}
            // className='text-md hover:bg-[#dedddb] rounded  p-2'
            // className='text-md hover:bg-[#dedddb] rounded invisible group-hover:visible p-2'
          />
          <Link
            href={`/dashboard/notebooks/${notebook.id}`}
            // href={`/editor/${notebook.id}`}
            className={cn("font-semibold text-[14px] text-[#73726e]",
              { ['text-[#373530]']: splited[3] === notebook.id && splited.length === 4 }
            )}
          >
            {notebook.title}
          </Link>
        </div>

        {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}
        <div className='flex gap-1'>
          <Icons.ellipsisHorizontal
            size={12}
            className='btn-icon invisible group-hover/notebook:visible text-[#686662]'
          />
          {/*<PageOperations page={{ id: notebook.id, title: notebook.title }}/>*/}
          {/*<NotebookOperations page={{ id: notebook.id, title: notebook.title }}/>*/}

          {/*<Icons.plus size={12} className='btn-icon invisible group-hover/notebook:visible text-[#686662]'/>*/}
          <PageCreateButton notebookId={notebook.id}/>
        </div>
      </div>

      {
        showPages &&
        <div>
          {notebook.pages && notebook.pages.length > 0 ? notebook.pages.map((page) => (
              <PageItem notebookId={notebook.id} key={page.id} page={page}/>
            ))
            : <p className='font-semibold text-[14px] text-[#999895] pl-8'>No page inside</p>
          }
        </div>
      }
    </>
  )
}

NotebookItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5"/>
        <Skeleton className="h-4 w-4/5"/>
      </div>
    </div>
  )
}
