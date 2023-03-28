'use client'

import { useState } from "react";

import NotebookItemSidebar from "./notebook-item-sidebar";
import { cn } from "core/helpers";
import NewNotebookDialog from "components/dialog/new-notebook-dialog";
import { useWorkspaceContext } from "components/context/WorkspaceContext";

export default function NotebookListSidebar() {
  const [showNotebooks, setShowNotebooks] = useState(true)
  const { workspace } = useWorkspaceContext();

  return (
    <div>
      <div className='flex justify-between items-center px-4 mb-1.5'>
        <p
          className={cn('text-xs font-bold tracking-wider text-[#a3a39f] hover:bg-[#dedddb] hover:text-[#5b5954] rounded-sm px-1 cursor-pointer select-none')}
          onClick={() => setShowNotebooks(!showNotebooks)}
        >Notebooks</p>
        <NewNotebookDialog/>
      </div>
      {
        showNotebooks &&
        <div className='px-1'>
          {
            workspace.notebooks?.length ?
              workspace.notebooks.map((notebook) => (
                <NotebookItemSidebar key={notebook.id} notebook={notebook}/>
              ))
              : null
          }
        </div>
      }
    </div>
  );
}
