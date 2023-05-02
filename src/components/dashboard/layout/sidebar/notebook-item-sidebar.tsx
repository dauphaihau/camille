import { Notebook } from "@prisma/client"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import * as React from "react";
import { useState } from "react";

import { Skeleton } from "core/components/skeleton"
import { Icons, Loading, Row, Tooltip } from "core/components";
import { useGetPages } from "lib/request-by-swr/page";
import { PageItem } from "./page-item-sidebar";
import { cn } from "core/helpers";
import { useWorkspaceContext } from "components/context/workspace-context";
import { PageCreateButton } from "../../page-create-button";
import { NotebookOperations } from "../../notebook-operations";
import { PATH } from "config/const";

interface NotebookItemProps {
  notebook: Pick<Notebook, "id" | "title">
  classes?: string
}

export default function NotebookItemSidebar({ notebook, classes }: NotebookItemProps) {
  const [showPages, setShowPages] = useState(false)
  const pathName = usePathname()
  const { workspace, reFetchNotebookId, setReFetchNotebookId } = useWorkspaceContext()
  const { isLoading, pages, mutate } = useGetPages(showPages ? notebook.id : null)
  const arrPath = pathName && pathName.split('/')

  if (reFetchNotebookId && reFetchNotebookId === notebook.id) {
    mutate?.()
    setReFetchNotebookId?.('')
  }

  return (
    <div className='group/notebook'>
      <Row
        align='center'
        justify='between'
        classes={[
          `hover:bg-[#ecebea] py-[2px] pr-0 group-hover/notebook:pr-[8px] pl-[5px] rounded-sm max-h-[27px] cursor-pointer`,
          { ['bg-[#f1f1f0]']: arrPath && arrPath[2] === notebook.id && arrPath.length === 3 },
          classes
        ]}
      >
        <Row align='center' gap={1} classes='w-full'>
          <Row classes='flex-0 flex-shrink-0'>
            <div
              className='btn-icon-sidebar'
              onClick={() => setShowPages(!showPages)}
            >
              <Icons.arrowRightSline className={`${showPages ? 'rotate-90' : 'rotate-0'}`}/>
            </div>
            <Tooltip>
              <Tooltip.Trigger asChild>
                <div className='btn-icon-sidebar'>
                  <Icons.notebook/>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content className={'ml-1.5'}>
                Change icon are developing
              </Tooltip.Content>
            </Tooltip>
          </Row>
          <Link
            href={workspace?.domain ? `/${workspace.domain}/${notebook.id}` : PATH.HOME}
            className={cn("font-semibold text-[14px] text-[#73726e] flex-auto min-w-0",
              'truncate overflow-hidden',
              { ['text-[#373530]']: arrPath && arrPath[2] === notebook.id && arrPath.length === 3 }
            )}
          >
            {notebook.title}
          </Link>

          <Row classes='flex-0 flex-shrink-0'>
            <Row gap={1} classes={'invisible w-0 group-hover/notebook:visible group-hover/notebook:w-auto'}>
              <NotebookOperations placeOnSidebar notebook={{ id: notebook.id, title: notebook.title }}/>
              <PageCreateButton notebookId={notebook.id}>
                <Tooltip>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Icons.plus size={15} className='btn-icon  text-[#686662]'/>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <div>Add a page</div>
                  </Tooltip.Content>
                </Tooltip>
              </PageCreateButton>
            </Row>
          </Row>
        </Row>
      </Row>

      {
        showPages &&
        <div>
          {
            !isLoading && pages.length > 0 ? pages.map((page) => (
                <PageItem key={page.id} page={page} notebook={notebook}/>
              ))
              : <p className='font-semibold text-[14px] text-[#999895] pl-8'>No page inside</p>
          }
        </div>
      }
    </div>
  )
}

NotebookItemSidebar.Skeleton = function NotebookItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5"/>
        <Skeleton className="h-4 w-4/5"/>
      </div>
    </div>
  )
}
