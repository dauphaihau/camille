'use client'

import { Notebook, Page } from "@prisma/client"
import Link from "next/link"

import { Skeleton } from "core/components/skeleton"
import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { PageOperations } from "../page-operations"

interface NotebookItemProps {
  page: Pick<Page, "id" | "title" | "updatedAt" | "updatedBy">
  notebookId: string
}

export function PageItem({ page, notebookId }: NotebookItemProps) {
  const { workspace } = useWorkspaceContext();

  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <Link
          href={`/${workspace.domain}/${notebookId}/${page.id}`}
          className="font-semibold hover:underline"
        >
          {page.title}
        </Link>
      </div>

      <PageOperations page={page}/>
      {/*<PageOperations page={{ id: page.id, title: page.title }}/>*/}
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
