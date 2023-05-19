import { Teamspace } from "@prisma/client"
import * as React from "react";
import { useState } from "react";

import { Box, Icons, Loading, Row } from "core/components";
import { cn } from "core/helpers";
import { useGetNotebooksInTeamspace } from "lib/request-by-swr/teamspace";
import { NotebookItemSidebar } from "./notebook-item-sidebar";
import { TeamspaceOperations } from "../../teamspace/teamspace-operations";
import { NewNotebookDialog } from "components/dialog/new-notebook-dialog";
import { useStoreMulti } from "lib/store";
import { NotebookOperations } from "components/dashboard/notebook-operations";

interface TeamspaceItemProps {
  teamspace: Pick<Teamspace, "id" | "name" | "isOrigin">
}

export default function TeamspaceItemSidebar({ teamspace }: TeamspaceItemProps) {
  const [showNotebooks, setShowPages] = useState(false)
  const { reFetchTeamspaceId, setReFetchTeamspaceId } = useStoreMulti('reFetchTeamspaceId', 'setReFetchTeamspaceId')
  const { isLoading, notebooks, mutate } = useGetNotebooksInTeamspace(showNotebooks ? teamspace.id : null)

  if (reFetchTeamspaceId && reFetchTeamspaceId === teamspace.id) {
    mutate?.()
    setReFetchTeamspaceId('')
  }

  return (
    <div className='group/teamspace'>
      <div className={cn(`flex items-center justify-between hover:bg-[#ecebea] py-[2px] pr-0 pr-[8px] pl-[5px] rounded-sm max-h-[27px] cursor-pointer`,)}>

        <div
          className='flex flex-1 gap-1 items-center pl-1.5'
          onClick={() => setShowPages(!showNotebooks)}
        >
          <Box
            classes={['avatar h-5 w-5 rounded-[0.25em] text-sm text-[#777572] flex justify-center font-medium',
              teamspace.isOrigin ? 'text-[#cc782f] bg-[#f5dfcc]' : 'bg-[#dcdbda] text-[#777572]'
            ]}
          >
            {teamspace && teamspace.name.charAt(0)}
          </Box>
          <div className={cn("font-semibold text-[14px] text-[#73726e] truncate w-fit",)}>
            {teamspace.name}
          </div>
          <Icons.arrowRightSline
            size={12}
            className={`btn-icon hover:bg-[#ecebea] invisible group-hover/teamspace:visible ${showNotebooks ? 'rotate-90' : 'rotate-0'}`}
          />
        </div>

        <div className='flex gap-1'>
          <TeamspaceOperations teamspace={teamspace}/>
          <NewNotebookDialog teamspaceId={teamspace.id}/>
        </div>

      </div>
      {
        showNotebooks &&
        <div className='px-1'>
          {
            isLoading ?
              <Row justify={'center'} classes={'mt-2'}>
                <Loading/>
              </Row> :
              notebooks.length > 0 ?
                notebooks.map((notebook) => (
                  <NotebookItemSidebar
                    classes={'group-hover/notebook:pr-[4px]'}
                    key={notebook.id} notebook={notebook}
                  >
                    <NotebookOperations
                      teamspaceId={teamspace.id}
                      placeOnSidebar
                      notebook={{ id: notebook.id, title: notebook.title }}
                    />
                  </NotebookItemSidebar>
                ))
                : <p className='font-semibold text-[14px] text-[#999895] pl-8'>No teamspaces inside</p>
          }
        </div>
      }
    </div>
  )
}
