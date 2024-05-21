'use client';

import { useState } from 'react';

import * as React from 'react';
import NewTeamspaceDialog from 'components/dialog/new-teamspace-dialog';
import { Box, Row } from 'core/components';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import TeamspaceItemSidebar from './teamspace-item-sidebar';
import { TitleOfItemsSidebar } from './title-of-items-sidebar';

export function TeamspaceListSidebar() {
  const [showTeamspaces, setShowTeamspaces] = useState(true);
  const { data: { workspace } = {} } = useGetDetailWorkspace();

  if (!workspace || !workspace.teamspaces || workspace.teamspaces.length === 0) {
    return null;
  }

  return (
    <Box classes={ showTeamspaces ? 'mb-2' : '' }>
      <Row
        justify='between'
        align='center'
        classes='px-3 min-h-[24px] my-0.5'
      >
        <TitleOfItemsSidebar
          title='Teamspaces'
          subTitleTooltip='Teamspaces you have joined.'
          onClick={ () => setShowTeamspaces(!showTeamspaces) }
        />
        <NewTeamspaceDialog />
      </Row>
      {
        showTeamspaces &&
        <div className='px-1'>
          {
            workspace.teamspaces.map((teamspace) => (
              <TeamspaceItemSidebar
                key={ teamspace.id }
                teamspace={ teamspace }
              />
            ))
          }
        </div>
      }
    </Box>
  );
}
