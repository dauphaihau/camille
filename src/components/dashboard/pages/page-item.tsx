import { Notebook } from "@prisma/client"
import Link from "next/link"

import { formatDate } from "lib/utils"
import { PostOperations } from "components/dashboard/post-operations"
import { Skeleton } from "ui/skeleton"

interface NotebookItemProps {
  page: Pick<Notebook, "id" | "title" | "published" | "createdAt">
  notebookId: string
}

export function PageItem({ page, notebookId }: NotebookItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/notebooks/${notebookId}/${page.id}`}
          // href={`/dashboard/notebooks/${page.id}`}
          // href={`/editor/${page.id}`}
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
      <PostOperations post={{ id: page.id, title: page.title }}/>
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
