'use client'

import { useState } from "react";

import { cn } from "core/helpers";
import { useWorkspaceContext } from "components/context/workspace-context";
import { Box, Row } from "core/components";
import { PageItem } from "./page-item-sidebar";
import * as React from "react";

export default function PagesFavoriteListSidebar() {
  const [showPages, setShowPages] = useState(true)
  const { pagesFavorite } = useWorkspaceContext();

  if (pagesFavorite && pagesFavorite.length === 0) {
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
            pagesFavorite && pagesFavorite.length ?
              pagesFavorite.map((page) => (
                <PageItem favorite key={page.id} page={page}/>
              ))
              : null
          }
        </div>
      }
    </Box>
  );
}
