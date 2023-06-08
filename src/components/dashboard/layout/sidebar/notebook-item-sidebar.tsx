import { Notebook } from "@prisma/client"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from "react";

import { Icons, Row, Tooltip } from "core/components";
import { useGetPages } from "lib/request-by-swr/page";
import { PageItemSidebar } from "./page-item-sidebar";
import { cn } from "core/helpers";
import { PageCreateButton } from "../../page-create-button";
import { NotebookOperations } from "../../notebook-operations";
import { useStoreMulti } from "lib/store";
import { PageOperations } from "../../page-operations";

interface NotebookItemProps {
  notebook: Pick<Notebook, "id" | "title">
  classes?: string
  children?: ReactNode
}

export function NotebookItemSidebar({
  notebook, classes, children
}: NotebookItemProps) {
  const [showPages, setShowPages] = useState(false)
  const pathName = usePathname()
  const { isLoading, pages, mutate } = useGetPages(showPages ? notebook.id : null)
  const {
    reFetchNotebookId,
    workspace,
    setReFetchNotebookId
  } = useStoreMulti('workspace', 'setReFetchNotebookId', 'reFetchNotebookId')

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
          'item-sidebar pr-0 group-hover/notebook:pr-2 pl-[5px]',
          { ['bg-accent-light-active']: arrPath && arrPath[2] === notebook.id && arrPath.length === 3 },
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
            href={`/${workspace.domain}/${notebook.id}`}
            className={cn("font-semibold text-sm text-primary flex-auto min-w-0",
              'truncate overflow-hidden',
              { ['text-secondary']: arrPath && arrPath[2] === notebook.id && arrPath.length === 3 }
            )}
          >
            {notebook.title}
          </Link>

          <Row classes='flex-0 flex-shrink-0'>
            <Row gap={1} classes={'invisible w-0 group-hover/notebook:visible group-hover/notebook:w-auto'}>
              {
                children ||
                <NotebookOperations
                  placeOnSidebar
                  notebook={{ id: notebook.id, title: notebook.title }}
                />
              }

              <PageCreateButton notebookId={notebook.id}>
                <Tooltip>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Icons.plus size={15} className='btn-icon text-[#686662]'/>
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
            isLoading ? <PageItemSidebar.Skeleton/> :
              pages.length > 0 ? pages.map((page) => (
                  <>
                    <PageItemSidebar key={page.id} page={page} notebook={notebook}>
                      <PageOperations placeOnSidebar page={page}/>
                    </PageItemSidebar>
                  </>
                )) :
                <p className='font-semibold h-7 text-sm text-[#999895] pl-8'>No page inside</p>
          }
        </div>
      }
    </div>
  )
}
