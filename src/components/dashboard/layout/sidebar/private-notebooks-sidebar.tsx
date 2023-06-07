'use client'

import { useState } from "react";

import { NotebookItemSidebar } from "./notebook-item-sidebar";
import { NewNotebookDialog } from "components/dialog/new-notebook-dialog";
import { Box, Row } from "core/components";
import useStore from "lib/store";
import { TitleOfItemsSidebar } from "./title-of-items-sidebar";

export function PrivateNotebooksSidebar() {
  const [showNotebooks, setShowNotebooks] = useState(true)
  const workspace = useStore(state => state.workspace)

  return (
    <Box classes={showNotebooks ? 'mb-2' : ''}>
      <Row justify='between' align='center' classes='px-3 min-h-[24px] my-[2px]'>
        <TitleOfItemsSidebar
          title={'Private'}
          subTitleTooltip={'Notebook you created that are not in any teamspace.'}
          onClick={() => setShowNotebooks(!showNotebooks)}
        />
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
