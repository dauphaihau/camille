import { Notebook } from "@prisma/client"
import Link from "next/link"
import { usePathname } from 'next/navigation';

import { formatDate } from "lib/utils"
import { Skeleton } from "core/components/skeleton"
import { Icons } from "core/components";
import { useGetPages } from "../../../lib/request-by-swr/page";
import { PageItem } from "./page-item-sidebar";
import { useState } from "react"
import { cn } from "core/helpers";
import { PageOperations } from "./page-operations-sidebar";
import { useWorkspaceContext } from "../../context/WorkspaceContext";
import { PageCreateButton } from "../page-create-button";
import * as React from "react";
import { NotebookOperations } from "./notebook-operations-sidebar";

interface NotebookItemProps {
  notebook: Pick<Notebook, "id" | "title" | "description" | "published" | "createdAt" | "pages">
}

export default function NotebookItemSidebar({ notebook }: NotebookItemProps) {
  const [showPages, setShowPages] = useState(false)
  const pathName = usePathname()
  const { workspace } = useWorkspaceContext()
  const { isLoading, pages } = useGetPages(showPages ? notebook.id : null)
  const arrPath = pathName.split('/')

  return (
    <div className='group/notebook'>
      <div
        className={cn(`flex items-center justify-between hover:bg-[#ecebea] py-[2px] pr-0 group-hover/notebook:pr-[12px] pl-[5px] rounded-sm max-h-[27px] cursor-pointer`,
          { ['bg-[#f1f1f0]']: arrPath[2] === notebook.id && arrPath.length === 3 }
        )}
      >
        <div className='flex flex-1 gap-1 items-center'>
          <Icons.arrowRightSline
            size={12}
            className={`btn-icon ${showPages ? 'rotate-90' : 'rotate-0'}`}
            onClick={() => setShowPages(!showPages)}
          />
          <Link
            href={workspace.domain === 'notebooks' ? `/notebooks/${notebook.id}` : `/${workspace.domain}/${notebook.id}`}
            className={cn("font-semibold text-[14px] text-[#73726e] truncate w-full",
            // className={cn("font-semibold text-[14px] text-[#73726e] truncate",
            // className={cn("font-semibold text-[14px] text-[#73726e] w-[223px] truncate",
            // className={cn("font-semibold text-[14px] text-[#73726e] w-[223px] group-hover/notebook:w-[200px] truncate",
              { ['text-[#373530]']: arrPath[2] === notebook.id && arrPath.length === 3 }
            )}
          >
            {notebook.title}
          </Link>
        </div>

        {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}
        <div className='flex gap-1'>
          <NotebookOperations notebook={{ id: notebook.id, title: notebook.title }}/>
          {/*<Icons.ellipsisHorizontal size={12} className='btn-icon invisible group-hover/notebook:visible text-[#686662]'/>*/}
          <PageCreateButton notebookId={notebook.id}>
            <Icons.plus size={15} className='btn-icon hidden group-hover/notebook:block text-[#686662]'/>
          </PageCreateButton>
        </div>
      </div>

      {
        showPages &&
        <div>
          {!isLoading && pages.length > 0 ? pages.map((page) => (
              <PageItem notebookId={notebook.id} key={page.id} page={page}/>
            ))
            : <p className='font-semibold text-[14px] text-[#999895] pl-8'>No page inside</p>
          }
        </div>
      }
    </div>
  )
}

NotebookItemSidebar.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5"/>
        <Skeleton className="h-4 w-4/5"/>
      </div>
    </div>
  )
}
