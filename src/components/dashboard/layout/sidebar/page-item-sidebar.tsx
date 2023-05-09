import { Favorite, Notebook, Page } from "@prisma/client"
import Link from "next/link"

import { Skeleton } from "core/components/skeleton"
import { Icons, Row, Tooltip } from "core/components";
import { cn } from "core/helpers";
import { usePathname } from "next/navigation";
import { PageOperations } from "../../page-operations"
import { useWorkspaceContext } from "components/context/workspace-context";
import useStore from "lib/store";

interface PageItemProps {
  page: Pick<Page, "id" | "title" | "content" | "updatedAt" | "updatedBy" | "notebookId"> & {
    favorites?: Favorite[]
    createdByUser: {
      email: string
    }
  }
  notebook: Pick<Notebook, "id" | "title">
  favorite?: boolean
}

export function PageItem({ page, favorite, notebook }: PageItemProps) {
  const pathName = usePathname()
  const { page: pageContext } = useWorkspaceContext()
  const domain = pathName && pathName.split('/')[1]
  const arrPath = pathName && pathName.split('/')

  const setStatePageBreadcrumb = useStore(state => state.setStatePageBreadcrumb)

  return (
    <Row
      align='center'
      justify='between'
      classes={['group/favorite hover:bg-[#ecebea] rounded-sm py-[2px] pr-[8px] mb-0.5',
        favorite ? 'pl-[6px]' : 'pl-[20px]',
        { ['bg-[#f1f1f0]']: arrPath && arrPath[3] === page.id },
      ]}
    >
      <Row align='center' gap={1} classes='w-full'>

        <Row classes='flex-0 flex-shrink-0'>
          <Tooltip>
            <Tooltip.Trigger>
              <div className="btn-icon-sidebar">
                <Icons.arrowRightSline/>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content className={'ml-2.5'}>
              Nested page not available
            </Tooltip.Content>
          </Tooltip>
          <div className='btn-icon-sidebar'>
            {page.content ? <Icons.pageText/> : <Icons.page/>}
          </div>
        </Row>
        <Link
          onClick={() => setStatePageBreadcrumb({ notebook, page })}
          href={`${domain}/${page.notebookId}/${page.id}`}
          className={cn("font-semibold text-[14px] text-[#73726e] flex-auto min-w-0",
            'truncate overflow-hidden',
            { ['text-[#373530]']: arrPath && arrPath[3] === page.id }
          )}
        >
          {pageContext?.id === page.id ? pageContext.title : page.title}
        </Link>

        <Row classes='flex-0 flex-shrink-0'>
          <Row gap={1} classes={'invisible w-0 group-hover/favorite:visible group-hover/favorite:w-auto'}>
            <PageOperations favorite={favorite} placeOnSidebar page={page}/>
          </Row>
        </Row>
      </Row>

    </Row>
  )
}

PageItem.Skeleton = function PageItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-1">
        <Skeleton className="h-4 w-full"/>
        {/*<Skeleton className="h-4 w-full"/>*/}
        {/*<Skeleton className="h-4 w-full"/>*/}
        {/*<Skeleton className="h-4 w-full"/>*/}
      </div>
    </div>
  )
}
