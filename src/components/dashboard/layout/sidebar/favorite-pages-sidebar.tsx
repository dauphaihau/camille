'use client'

import * as React from "react";
import { useState } from "react";

import { Box, Row } from "core/components";
import { PageItem } from "./page-item-sidebar";
import useStore from "lib/store";
import { PageOperations } from "components/dashboard/page-operations";
import { TitleOfItemsSidebar } from "./title-of-items-sidebar";

export function FavoritePagesSidebar() {
  const [showPages, setShowPages] = useState(true)
  const user = useStore(state => state.user)

  if (user.favoritePages && user.favoritePages.length === 0) {
    return null
  }

  return (
    <Box classes={showPages ? 'mb-2' : ''}>
      <Row justify='between' align='center' classes='px-3 min-h-[24px] my-[2px]'>
        <TitleOfItemsSidebar
          title={'Favorites'}
          subTitleTooltip={'Pages you have favorites.'}
          onClick={() => setShowPages(!showPages)}
        />
      </Row>
      {
        showPages &&
        <div className='px-1'>
          {
            user.favoritePages && user.favoritePages.length ?
              user.favoritePages.map((page) => (
                <PageItem favorite key={page.id} page={page} notebook={page.notebook}>
                  <PageOperations favorite placeOnSidebar page={page}/>
                </PageItem>
              ))
              : null
          }
        </div>
      }
    </Box>
  );
}
