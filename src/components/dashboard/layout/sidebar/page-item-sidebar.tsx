import { Favorite, Notebook, Page } from "@prisma/client"
import Link from "next/link"
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Skeleton } from "core/components/skeleton"
import { Col, Icons, Row, Tooltip } from "core/components";
import { cn, getRandomInt } from "core/helpers";
import useStore from "lib/store";

interface PageItemProps {
  page: Pick<Page, "id" | "title" | "content" | "updatedAt" | "updatedBy" | "notebookId"> & {
    favorites?: Favorite[]
    createdByUser?: {
      email: string
    }
  }
  notebook?: Pick<Notebook, "id" | "title">
  favorite?: boolean
  children: ReactNode
}

export function PageItemSidebar({ page, favorite, notebook, children }: PageItemProps) {
  const setStatePageBreadcrumb = useStore(state => state.setStatePageBreadcrumb)
  const pageContext = useStore(state => state.page)
  const pathName = usePathname()
  const domain = pathName && pathName.split('/')[1]
  const arrPath = pathName && pathName.split('/')

  return (
    <Row
      align='center'
      justify='between'
      classes={['group/favorite item-sidebar pr-[8px] mb-0.5',
        favorite ? 'pl-[6px]' : 'pl-[20px]',
        { ['bg-accent-light-active']: arrPath && arrPath[3] === page.id },
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
            <Tooltip>
              <Tooltip.Trigger>
                {page.content ? <Icons.pageText/> : <Icons.page/>}
              </Tooltip.Trigger>
              <Tooltip.Content className={'ml-1.5'}>
                Change icon are developing
              </Tooltip.Content>
            </Tooltip>
          </div>
        </Row>

        <Link
          onClick={() => setStatePageBreadcrumb({ notebook, page })}
          href={`${domain}/${page.notebookId}/${page.id}`}
          className={cn("font-semibold text-sm text-primary flex-auto min-w-0",
            'truncate overflow-hidden',
            { ['text-secondary']: arrPath && arrPath[3] === page.id }
          )}
        >
          {pageContext?.id === page.id ? pageContext.title : page.title}
        </Link>

        <Row classes='flex-0 flex-shrink-0'>
          <Row gap={1} classes={'invisible w-0 group-hover/favorite:visible group-hover/favorite:w-auto'}>
            {children}
          </Row>
        </Row>
      </Row>
    </Row>
  )
}

PageItemSidebar.Skeleton = function PageItemSkeleton({ notebook }: {notebook?: boolean}) {
  return (
    <Col gap={1} classes={'my-1.5'}>
      {
        new Array(getRandomInt(1, 3)).fill("").map((_, i) => (
            <Row
              key={i}
              align={'center'}
              classes={notebook ? 'pl-[5px]' : 'pl-[20px]'}
            >
              <div className={'w-[20px] h-[20px] flex justify-center items-center'}>
                <Icons.arrowRightSline
                  size={25}
                  className={`animate-pulse fill-[#efefed] rounded`}
                />
              </div>
              <Skeleton className="h-5 w-5 mr-2"/>
              <Skeleton width={Math.floor(Math.random() * 40) + 60} className='h-2.5'/>
            </Row>
          )
        )}
    </Col>
  )
}
