'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "core/helpers";
import { Box, Col, Icons, Row } from "core/components";
import useStore from "lib/store";

export default function SettingsSidebar({ urlBeforeNavigateSettingPage }) {
  const pathName = usePathname();
  const workspace = useStore(state => state.workspace)

  const Title = ({ title }) => (
    <div className='flex justify-between items-center px-4 mb-1.5'>
      <p className={cn('text-xs font-bold tracking-wider text-[#a3a39f] rounded-sm px-1 select-none')}>{title}</p>
    </div>
  )

  const LinkItem = ({ data }) => {
    return <Link href={`/${workspace?.domain}${data.resHrefDomain}`}>
      <Row
        align='center'
        justify='between'
        classes={cn(`hover:bg-[#ecebea] py-[2px] pr-[12px] pl-[20px] rounded-sm max-h-[27px] cursor-pointer group/notebook`,
          { ['bg-[#f1f1f0]']: pathName?.includes(data.resHrefDomain) }
        )}
      >
        <Row align='center' gap={1}>
          <p className={cn("font-medium text-[14px] text-[#73726e]")}>{data.title}</p>
        </Row>
      </Row>
    </Link>
  }

  return (
    <>
      <Row classes='hover:bg-[#ecebea] p-3 rounded-sm max-h-[45px] cursor-pointer mb-4'>
        <Row align='center' gap={3}>
          <Link href={urlBeforeNavigateSettingPage}>
            <Icons.arrowLeftSline
              size={12}
              className='btn-icon'
            />
          </Link>
          <Box classes='text-base text-[#373530] font-medium tracking-wide'>Settings</Box>
        </Row>
      </Row>
      <div className='space-y-6'>
        <div>
          <Title title='Workspace'/>
          <Col className='px-1' gap={1}>
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
