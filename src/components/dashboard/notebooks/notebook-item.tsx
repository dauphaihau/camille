'use client'

import Link from "next/link"
import { Notebook } from "@prisma/client"

import { Skeleton } from "core/components/skeleton"
import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { NotebookOperations } from "../notebook-operations";
import { Grid, Row } from "core/components";

interface NotebookItemProps {
  notebook: Pick<Notebook, "id" | "title" | "description" | "published" | "createdAt">
}

export function NotebookItem({ notebook }: NotebookItemProps) {
  const { workspace } = useWorkspaceContext()
  return (
    <Row align='center' justify='between'>
      <Grid gap={1}>
        <Link
          href={`/${workspace.domain}/${notebook.id}`}
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
      </Grid>
      <NotebookOperations notebook={{ id: notebook.id, title: notebook.title }}/>
    </Row>
  )
}

NotebookItem.Skeleton = function NotebookItemSkeleton() {
  return (
    // <div className="p-4">
    <div className="mb-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-4/5"/>
        {/*<Skeleton className="h-4 w-4/5"/>*/}
      </div>
    </div>
  )
}
