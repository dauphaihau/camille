'use client';

import * as React from 'react';
import { useState } from 'react';

import { Icons, Row } from 'core/components';
import { useGetPrivatePages } from 'services/query-hooks/page';
import { AddPageButtonSidebar } from './add-page-button-sidebar';
import { PageItemSidebar } from './page-item-sidebar';
import { TitleOfItemsSidebar } from './title-of-items-sidebar';
import { PageOperationsSidebar } from './page-operations-sidebar';

export function PrivatePagesSidebar() {
  const [showPages, setShowPages] = useState(true);
  const { data: pages } = useGetPrivatePages();

  return (
    <div>
      <Row
        justify='between'
        align='center'
        classes='px-3 min-h-6 my-0.5'
      >
        <TitleOfItemsSidebar
          title='Privates'
          subTitleTooltip='Page you created that are not in any teamspace.'
          onClick={ () => setShowPages(!showPages) }
        />
        <AddPageButtonSidebar />
      </Row>
      {
        showPages && (
          <div className='px-1'>
            {
              pages && pages.length > 0 ?
                pages.map((page) => (
                  <PageItemSidebar
                    key={ page.id }
                    page={ page }
                  >
                    <PageOperationsSidebar page={ page } />
                  </PageItemSidebar>
                )) :
                <AddPageButtonSidebar>
                  <Row
                    align='center'
                    gap={ 2 }
                    classes={ [
                      'item-sidebar mb-0.5 px-2.5 hover:bg-accent-light-active',
                    ] }
                  >
                    <Icons.plus className='btn-icon stroke-[0.5px]' />
                    <p
                      className='font-semibold text-sm text-primary '
                    >Add a page
                    </p>
                  </Row>
                </AddPageButtonSidebar>
            }
          </div>
        )
      }
    </div>
  );
}
