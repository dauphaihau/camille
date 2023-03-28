'use client'

import { NotebookItem } from "./notebooks/notebook-item";
import { EmptyPlaceholder } from "./empty-placeholder";
import { useWorkspaceContext } from "components/context/WorkspaceContext";

export default function NotebookList() {
  const { workspace } = useWorkspaceContext()
  return (
    <div>
      {
        workspace?.notebooks &&
        workspace.notebooks?.length ?
          workspace.notebooks.map(notebook => (
              <NotebookItem key={notebook.id} notebook={notebook}/>
            )
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="book"/>
              <EmptyPlaceholder.Description>
                You don&apos;t have any notebooks yet.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          )
      }
    </div>
  );
}
