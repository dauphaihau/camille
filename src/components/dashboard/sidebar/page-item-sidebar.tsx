import { Notebook } from "@prisma/client"
import Link from "next/link"

import { Skeleton } from "core/components/skeleton"
import { Icons } from "core/components";
import { cn } from "core/helpers";
import { usePathname } from "next/navigation";
import { PageOperations } from "./page-operations-sidebar"
import { useWorkspaceContext } from "../../context/WorkspaceContext";

interface NotebookItemProps {
  page: Pick<Notebook, "id" | "title" | "published" | "createdAt">
  notebookId: string
}

export function PageItem({ page, notebookId }: NotebookItemProps) {
  const pathName = usePathname()
  const { page: pageContext } = useWorkspaceContext()
  const domain = pathName.split('/')[1]
  const arrPath = pathName.split('/')

  console.log('dauphaihau debug: page-context', pageContext)

  return (
    <div
      className={cn(' flex items-center justify-between hover:bg-[#ecebea] rounded-sm py-[2px] pr-[10px] pl-[20px] group/page mb-0.5',
        { ['bg-[#f1f1f0]']: arrPath[3] === page.id }
      )}
    >
      <div className='flex gap-1 items-center'>
        <Icons.arrowRightSline
          size={15}
          className='text-[#73726e] invisible'
        />
        <Link
          href={`${domain}/${notebookId}/${page.id}`}
          // href={`/dashboard/notebooks/${notebookId}/${page.id}`}
          // href={`/dashboard/notebooks/${page.id}`}
          // href={`/editor/${page.id}`}
          className={cn("font-semibold text-[14px] text-[#73726e] w-[175px] truncate",
            { ['text-[#373530]']: arrPath[3] === page.id }
          )}
        >
          {pageContext?.id === page.id && pageContext.title || page.title}
          {/*<p className="truncate ...">...</p>*/}
        </Link>

      </div>
      <div className='flex gap-1'>
        {/*<Icons.ellipsisHorizontal size={15} className='btn-icon invisible group-hover/page:visible text-[#686662]'/>*/}
        <PageOperations notebookId={notebookId} page={{ id: page.id, title: page.title }}/>

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
