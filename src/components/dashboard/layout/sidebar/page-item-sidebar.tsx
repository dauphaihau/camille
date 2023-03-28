import { Notebook, Page } from "@prisma/client"
import Link from "next/link"

import { Skeleton } from "core/components/skeleton"
import { Icons } from "core/components";
import { cn } from "core/helpers";
import { usePathname } from "next/navigation";
import { PageOperations } from "../../page-operations"
import { useWorkspaceContext } from "components/context/WorkspaceContext";

interface NotebookItemProps {
  page: Pick<Page, "id" | "title" | "updatedAt" | "updatedBy">
  notebookId: string
}

export function PageItem({ page, notebookId }: NotebookItemProps) {
  const pathName = usePathname()
  const { page: pageContext } = useWorkspaceContext()
  const domain = pathName.split('/')[1]
  const arrPath = pathName.split('/')

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
          className={cn("font-semibold text-[14px] text-[#73726e] w-[175px] truncate",
            { ['text-[#373530]']: arrPath[3] === page.id }
          )}
        >
          {pageContext?.id === page.id && pageContext.title || page.title}
          {/*<p className="truncate ...">...</p>*/}
        </Link>
      </div>
      <div className='flex gap-1'>
        <PageOperations placeOnSidebar page={page}/>
        {/*<PageOperations placeOnSidebar page={{ id: page.id, title: page.title }}/>*/}
      </div>
    </div>
  )
}

PageItem.Skeleton = function PageItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5"/>
        <Skeleton className="h-4 w-4/5"/>
      </div>
    </div>
  )
}
