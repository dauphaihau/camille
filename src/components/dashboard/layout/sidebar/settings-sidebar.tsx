'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "core/helpers";
import { Box, Col, Icons, Row } from "core/components";
import useStore from "lib/store";
import { TitleOfItemsSidebar } from "./title-of-items-sidebar";

export function SettingsSidebar({ urlBeforeNavigateSettingPage }) {
  const pathName = usePathname();
  const workspace = useStore(state => state.workspace)

  const Title = ({ title }) => (
    <div className='flex justify-between items-center px-4 mb-1.5'>
      <TitleOfItemsSidebar settings title={title} />
    </div>
  )

  const LinkItem = ({ data }) => {
    return <Link href={`/${workspace?.domain}${data.resHrefDomain}`}>
      <Row
        align='center'
        justify='between'
        classes={cn(`item-sidebar pr-3 pl-5`,
          { ['bg-accent-light-active']: pathName?.includes(data.resHrefDomain) }
        )}
      >
        <Row align='center' gap={1}>
          <p className={cn("font-medium text-sm text-primary")}>{data.title}</p>
        </Row>
      </Row>
    </Link>
  }

  return (
    <>
      <Row classes='hover:bg-accent p-3 rounded-sm max-h-[45px] cursor-pointer mb-4'>
        <Row align='center' gap={3}>
          <Link href={urlBeforeNavigateSettingPage}>
            <Icons.arrowLeftSline
              size={12}
              className='btn-icon'
            />
          </Link>
          <Box classes='text-base text-secondary font-medium tracking-wide'>Settings</Box>
        </Row>
      </Row>
      <div className='space-y-6'>
        <div>
          <Title title='Workspace'/>
          <Col classes='px-1 gap-1'>
            <LinkItem data={{ resHrefDomain: '/settings/workspace', title: 'General' }}/>
            <LinkItem data={{ resHrefDomain: '/settings/plans', title: 'Plans' }}/>
            <LinkItem data={{ resHrefDomain: '/settings/members', title: 'Members' }}/>
          </Col>
        </div>
        <div>
          <Title title='Account'/>
          <Col className='px-1' gap={1}>
            <LinkItem data={{ resHrefDomain: '/settings/account/profile', title: 'Profile' }}/>
            {/*<LinkItem data={{ resHrefDomain: '/settings/account/preferences', title: 'Preferences' }}/>*/}
          </Col>
        </div>
      </div>
    </>
  );
}
