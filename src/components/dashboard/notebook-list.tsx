'use client'

import { NotebookItem } from "./notebooks/notebook-item";
import { EmptyPlaceholder } from "./empty-placeholder";
import useStore from "lib/store";

export default function NotebookList() {
  const workspace = useStore(state => state.workspace)

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
