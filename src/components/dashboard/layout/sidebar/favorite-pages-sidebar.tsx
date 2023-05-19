'use client'

import * as React from "react";
import { useState } from "react";

import { cn } from "core/helpers";
import { Box, Row } from "core/components";
import { PageItem } from "./page-item-sidebar";
import useStore from "lib/store";
import { PageOperations } from "components/dashboard/page-operations";

export function FavoritePagesSidebar() {
  const [showPages, setShowPages] = useState(true)
  const user = useStore(state => state.user)

  if (user.favoritePages && user.favoritePages.length === 0) {
    return null
  }

  return (
    <Box classes={showPages ? 'mb-2' : ''}>
      <Row justify='between' align='center' classes='px-3 min-h-[24px] my-[2px]'>
        <p
          className={cn('text-xs font-bold tracking-wider text-[#a3a39f] hover:bg-[#dedddb] hover:text-[#5b5954] rounded-sm px-1 cursor-pointer select-none')}
          onClick={() => setShowPages(!showPages)}
        >Favorites</p>
      </Row>
      {
        showPages &&
        <div className='px-1'>
          {
            user.favoritePages && user.favoritePages.length ?
              user.favoritePages.map((page) => (
                <PageItem key={page.id} page={page} notebook={page.notebook}>
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
