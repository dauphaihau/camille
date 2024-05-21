'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Icons, Row } from 'core/components';
import { useStoreMulti } from 'lib/store';
import { useGetCurrentPage } from 'lib/request-client/page';
import { PageOperations } from '../../page-operations';
import { PageBreadcrumb } from './page-breadcrumb';
import FavoriteButton from './favorite-button';
import ShareButton from './share-button';
import ViewAllUpdatesButton from './view-all-updates-button';

dayjs.extend(relativeTime);

export default function HeaderEditor() {
  const { data: pageData } = useGetCurrentPage();
  const { showSidebar, setShowSidebar } = useStoreMulti('showSidebar', 'setShowSidebar');

  return (
    <div className='sticky top-0 z-40 bg-white px-4'>
      <Row
        align='center'
        justify='between'
        classes='h-11'
      >
        <Row
          align='center'
          gap={ 2 }
        >
          {
            !showSidebar &&
            <Icons.doubleArrowRight
              size={ 25 }
              className='text-md text-[#54535f] hover:bg-accent-light rounded p-0.5 cursor-pointer'
              onClick={ setShowSidebar }
            />
          }
          <PageBreadcrumb />
        </Row>

        <Row
          align='center'
          gap={ 2 }
        >
          <div className='text-[14px] text-[#9b9a97] font-medium'>
            Edited { dayjs(pageData?.updatedAt).fromNow() }
          </div>
          <ShareButton />
          <FavoriteButton />
          <ViewAllUpdatesButton />
          <div className='btn-icon-header'>
            <PageOperations classesContent='top-4' />
          </div>
        </Row>
      </Row>
    </div>
  );
}
