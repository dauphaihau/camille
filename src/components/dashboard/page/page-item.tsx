'use client'

import { Favorite, Page } from "@prisma/client"
import Link from "next/link"

import { Skeleton } from "core/components/skeleton"
import { useWorkspaceContext } from "components/context/workspace-context";
import { PageOperations } from "../page-operations"
import { PATH } from "config/const";
import { Row } from "core/components";
import Title from "../Title";

interface PageItemProps {
  page: Pick<Page, "id" | "title" | "content" | "updatedAt" | "updatedBy" | "notebookId"> & {
    favorites?: Favorite[]
    createdByUser: {
      email: string
    }
  }
}

export function PageItem({ page }: PageItemProps) {
  const { workspace, page: pageContext } = useWorkspaceContext()

  return (
    <Row align='center' justify='between'>
      <div className="grid gap-1">
        <Link href={workspace?.domain ? `/${workspace.domain}/${page.notebookId}/${page.id}` : PATH.HOME}>
          <Title maxW={400} className={'font-semibold hover:underline'} classesText={' text-base'}>
            {pageContext?.id === page.id ? pageContext.title : page.title}
          </Title>
        </Link>
      </div>

      <Row>
        <PageOperations page={page}/>
      </Row>
    </Row>
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
