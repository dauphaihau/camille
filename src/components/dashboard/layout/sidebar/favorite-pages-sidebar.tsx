'use client';

import * as React from 'react';
import { useState } from 'react';

import { Box, Row } from 'core/components';
import { useGetFavoritesPages } from 'services/query-hooks/page';
import { PageItemSidebar } from './page-item-sidebar';
import { TitleOfItemsSidebar } from './title-of-items-sidebar';
import { PageOperationsSidebar } from './page-operations-sidebar';

export function FavoritePagesSidebar() {
  const [showPages, setShowPages] = useState(true);
  const { data: favoritesPages } = useGetFavoritesPages();

  if (!favoritesPages || favoritesPages.length === 0) {
    return null;
  }

  return (
    <Box classes={ showPages ? 'mb-2' : '' }>
      <Row
        justify='between'
        align='center'
        classes='px-3 min-h-[24px] my-0.5'
      >
        <TitleOfItemsSidebar
          title='Favorites'
          subTitleTooltip='Pages you have favorites.'
          onClick={ () => setShowPages(!showPages) }
        />
      </Row>
      {
        showPages &&
        <div className='px-1'>
          {
            favoritesPages.map((page) => (
              <PageItemSidebar
                key={ page.id }
                page={ page }
              >
                <PageOperationsSidebar
                  placeOnGroup='favorites'
                  page={ page }
                />
              </PageItemSidebar>
            ))
          }
        </div>
      }
    </Box>
  );
}
