'use client';

import { DashboardHeader } from 'components/dashboard/header';
import { DashboardShell } from 'components/dashboard/shell';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { NotebookItem } from 'components/dashboard/notebooks/notebook-item';

export default async function DashboardPage() {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  return (
    <DashboardShell>
      <DashboardHeader
        heading='Notebooks'
        text='Create and manage notebooks.'
      />
      <div>
        {
          workspace?.notebooks &&
          workspace.notebooks.length > 0 &&
          workspace.notebooks.map(notebook => (
            <NotebookItem
              key={ notebook.id }
              notebook={ notebook }
            />
          ))
        }
      </div>
    </DashboardShell>
  );
}
