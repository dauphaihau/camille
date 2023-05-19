'use client'

import { useState } from "react";

import { cn } from "core/helpers";
import NewTeamspaceDialog from "components/dialog/new-teamspace-dialog";
import { Box, Row, Tooltip } from "core/components";
import TeamspaceItemSidebar from "./teamspace-item-sidebar";
import * as React from "react";
import useStore from "lib/store";

export function TeamspaceListSidebar() {
  const [showTeamspaces, setShowTeamspaces] = useState(true)
  const workspace = useStore(state => state.workspace)

  if (!workspace || !workspace.teamspaces || workspace.teamspaces.length === 0) {
    return null
  }

  return (
    <Box classes={showTeamspaces ? 'mb-2' : ''}>
      <Row justify='between' align='center' classes='px-3 min-h-[24px] my-[2px]'>
        <Tooltip>
          <Tooltip.Trigger>
            <div
              className={cn('text-xs font-bold tracking-wider text-[#a3a39f] hover:bg-[#dedddb] hover:text-[#5b5954] rounded-sm px-1 cursor-pointer select-none')}
              onClick={() => setShowTeamspaces(!showTeamspaces)}
            >Teamspaces
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content side='top' className='ml-2.5 mt-1'>
            <div>Click to hide section</div>
            <div className='text-[#82817f]'>Teamspaces you have joined.</div>
          </Tooltip.Content>
        </Tooltip>

        <NewTeamspaceDialog/>
      </Row>
      {
        showTeamspaces &&
        <div className='px-1'>
          {
            workspace.teamspaces.map((teamspace) => (
              <TeamspaceItemSidebar key={teamspace.id} teamspace={teamspace}/>
            ))
          }
        </div>
      }
    </Box>
  );
}
