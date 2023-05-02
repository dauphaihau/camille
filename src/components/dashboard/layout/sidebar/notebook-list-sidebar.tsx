'use client'

import { useState } from "react";

import NotebookItemSidebar from "./notebook-item-sidebar";
import { cn } from "core/helpers";
import NewNotebookDialog from "components/dialog/new-notebook-dialog";
import { useWorkspaceContext } from "components/context/workspace-context";
import { Box, Row } from "core/components";

export default function NotebookListSidebar() {
  const [showNotebooks, setShowNotebooks] = useState(true)
  const { workspace } = useWorkspaceContext();

  return (
    <Box classes={showNotebooks ? 'mb-2' : ''}>
      <Row justify='between' align='center' classes='px-3 min-h-[24px] my-[2px]'>
        <p
          className={cn('text-xs font-bold tracking-wider text-[#a3a39f] hover:bg-[#dedddb] hover:text-[#5b5954] rounded-sm px-1 cursor-pointer select-none')}
          onClick={() => setShowNotebooks(!showNotebooks)}
        >Private</p>
        {/*>Notebooks</p>*/}
        <NewNotebookDialog/>
      </Row>
      {
        showNotebooks &&
        <div className='px-1'>
          {
            workspace && workspace.notebooks?.length ?
              workspace.notebooks.map((notebook) => (
                <NotebookItemSidebar key={notebook.id} notebook={notebook}/>
              ))
              : null
          }
        </div>
      }
    </Box>
  );
}
