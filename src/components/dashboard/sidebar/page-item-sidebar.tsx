import { Notebook } from "@prisma/client"
import Link from "next/link"

import { formatDate } from "lib/utils"
import { PostOperations } from "components/dashboard/post-operations"
import { Skeleton } from "ui/skeleton"
import { Icons } from "../../../core/components";
import { cn } from "../../../core";
import { usePathname } from "next/navigation";
import { PageCreateButton } from "./page-create-button-sidebar";
import { PageOperations } from "./post-operations-sidebar"

interface NotebookItemProps {
  page: Pick<Notebook, "id" | "title" | "published" | "createdAt">
  notebookId: string
}

export function PageItem({ page, notebookId }: NotebookItemProps) {

  const pathName = usePathname()

  // const res = await getDetailNotebook(params.notebookId)
  // const { isLoading, pages } = useDetailNotebook(notebook.id)

  // console.log('dauphaihau debug: pages', pages)
  console.log('dauphaihau debug: path-name', pathName.split('/'))
  const splited = pathName.split('/')

  return (
    <div
      className={cn(' flex items-center justify-between hover:bg-[#ecebea] rounded-sm py-[2px] pr-[10px] pl-[20px] group/page mb-0.5',
        { ['bg-[#f1f1f0]']: splited[4] === page.id }
      )}
    >
      <div className='flex gap-1 items-center'>
        <Icons.arrowRightSline
          size={15}
          className='text-[#73726e] invisible'
        />
        <Link
          href={`/dashboard/notebooks/${notebookId}/${page.id}`}
          // href={`/dashboard/notebooks/${page.id}`}
          // href={`/editor/${page.id}`}
          className={cn("font-semibold text-[14px] text-[#73726e]",
            { ['text-[#373530]']: splited[4] === page.id }
          )}
        >
          {page.title}
        </Link>

      </div>
      <div className='flex gap-1'>
        {/*<Icons.ellipsisHorizontal size={15} className='btn-icon invisible group-hover/page:visible text-[#686662]'/>*/}
        <PageOperations page={{ id: page.id, title: page.title }}/>

        {/*<Icons.plus size={15} className='btn-icon invisible group-hover/page:visible text-[#686662]'/>*/}
      </div>
      {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}
    </div>
  )
}

PageItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5"/>
        <Skeleton className="h-4 w-4/5"/>
      </div>
    </div>
  )
}
