'use client'
import { Notebook, Workspace } from "@prisma/client"
import Link from "next/link"

import { formatDate } from "lib/utils"
import { PostOperations } from "components/dashboard/post-operations"
import { Skeleton } from "core/components/skeleton"
import { Icons } from "core/components"

interface NotebookItemProps {
  notebook: Pick<Notebook, "id" | "title" | "description" | "published" | "createdAt">
  workspaceCurrent: Pick<Workspace, "domain">
}

export function NotebookItem({ notebook, workspaceCurrent }: NotebookItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <Link
          // href={workspaceCurrent.domain === 'notebooks' ? `/notebooks/${notebook.id}` : `/${workspaceCurrent.domain}/${notebook.id}`}
          href={`/${workspaceCurrent.domain}/${notebook.id}`}
          className="font-semibold hover:underline text-[14px]"
        >
          {notebook.title}
        </Link>

        {/*<Icons.book/>*/}

        <div>
          {/*<p className="text-sm text-slate-600">*/}
          {/*  {formatDate(notebook.createdAt?.toDateString())}*/}
          {/*</p>*/}
          {/*<p className="text-sm text-slate-600">*/}
          {/*  {notebook.description}*/}
          {/*</p>*/}
        </div>
      </div>
      {/*<PostOperations post={{ id: notebook.id, title: notebook.title }}/>*/}
      {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}
    </div>
  )
}

NotebookItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5"/>
        {/*<Skeleton className="h-4 w-4/5"/>*/}
      </div>
    </div>
  )
}
