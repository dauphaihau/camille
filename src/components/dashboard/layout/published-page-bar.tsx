import Link from 'next/link';

import { useParams } from 'next/navigation';
import React from 'react';
import { Icons, Row } from 'core/components';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';
import { PATH, SUFFIX_DOMAIN_SHARE_PUBLIC } from 'config/const';
import { DashboardSlugs } from 'types/workspace';
import { useGetCurrentPage } from 'services/query-hooks/page';

export function PublishedPageBar() {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  const slugs = useParams<DashboardSlugs>();
  const { data: page } = useGetCurrentPage();

  if (page?.published) {
    return (
      <Row
        justify='center'
        align='center'
        gap={ 2 }
        classes='text-[#4281db] text-center py-2 text-sm font-medium bg-[#f0f6fc] h-12'
      >
        <div>This page is live on { slugs?.domainWorkspace }{ SUFFIX_DOMAIN_SHARE_PUBLIC }.</div>
        <Link
          href={ `/${workspace?.domain}${PATH.SETTINGS}/plans` }
          className='text-[#4281db] py-0.5 px-2.5 rounded-sm cursor-pointer flex items-center gap-2 hover:underline hover:underline-offset-2'
        >
          <Icons.earth className='h-4 w-4' />
          View site
        </Link>
      </Row>
    );
  }
  return null;
}
