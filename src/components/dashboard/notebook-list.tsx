'use client'

import { NotebookItem } from "./notebooks/note-item";
import { EmptyPlaceholder } from "./empty-placeholder";
import { useWorkspaceContext } from "../context/WorkspaceContext";

export default function NotebookList() {
  const { workspace } = useWorkspaceContext()
  return (
    <div>
      {
        workspace.notebooks?.length ? (
          <div className="">
            {workspace.notebooks.map((notebook) => (
              <NotebookItem
                workspaceCurrent={workspace}
                key={notebook.id} notebook={notebook}
              />
            ))}
          </div>
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
