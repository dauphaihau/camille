'use client'

import { Notebook } from "@prisma/client"
import Link from "next/link"

import { formatDate } from "lib/utils"
// import { PageOperations } from "components/dashboard/pages/page-operations"
import { Skeleton } from "core/components/skeleton"
import { useSelectedLayoutSegment } from "next/navigation";
import { useWorkspaceContext } from "../../context/WorkspaceContext";
import { PageOperations } from "../sidebar/page-operations-sidebar"

interface NotebookItemProps {
  page: Pick<Notebook, "id" | "title" | "published" | "createdAt">
  notebookId: string
}

export function PageItem({ page, notebookId }: NotebookItemProps) {
  const { workspace } = useWorkspaceContext();

  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <Link
          href={`/${workspace.domain}/${notebookId}/${page.id}`}
          // href={`/notebooks/${notebookId}/${page.id}`}
          // href={`/${domain}/${notebookId}/${page.id}`}
          className="font-semibold hover:underline"
        >
          {page.title}
        </Link>

        <div>
          {/*<p className="text-sm text-slate-600">*/}
          {/*  {formatDate(page.createdAt?.toDateString())}*/}
          {/*</p>*/}
        </div>
      </div>
      <PageOperations page={{ id: page.id, title: page.title }}/>
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
