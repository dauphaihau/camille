'use client';

import { useState } from 'react';

import { NewNotebookDialog } from 'components/dialog/new-notebook-dialog';
import { Box, Row } from 'core/components';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { NotebookItemSidebar } from './notebook-item-sidebar';
import { TitleOfItemsSidebar } from './title-of-items-sidebar';

export function PrivateNotebooksSidebar() {
  const [showNotebooks, setShowNotebooks] = useState(true);
  const { data: { user } = {} } = useGetDetailWorkspace();

  return (
    <Box classes={ showNotebooks ? 'mb-2' : '' }>
      <Row justify='between' align='center' classes='px-3 min-h-[24px] my-0.5'>
        <TitleOfItemsSidebar
          title='Private'
          subTitleTooltip='Notebook you created that are not in any teamspace.'
          onClick={ () => setShowNotebooks(!showNotebooks) }
        />
        <NewNotebookDialog />
      </Row>
      {
        showNotebooks &&
        <div className='px-1'>
          {
            user && user.privateNotebooks.length > 0 &&
            user.privateNotebooks.map((notebook) => (
              <NotebookItemSidebar key={ notebook.id } notebook={ notebook } />
            ))
          }
        </div>
      }
    </Box>
  );
}
