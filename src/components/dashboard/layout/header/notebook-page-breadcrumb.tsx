import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { Row } from "core/components";

export default function NotebookPageBreadcrumb() {
  const { workspace, notebooks, page } = useWorkspaceContext();
  const segments = useSelectedLayoutSegments()

  if (segments.includes('settings') || segments.length === 0) {
    return null
  }

  const notebookIdCurrent = segments[0]
  const notebookSelected = notebooks.find((notebook) => notebook.id === notebookIdCurrent)

  if (!workspace?.domain || !notebookSelected?.id) {
    return null
  }

  return (
    <Row align='center' gap={2}>
      <Link
        href={`/${workspace.domain}/${notebookSelected.id}`}
        className='text-sm hover:bg-[#efefef] p-[2px] px-1 rounded '
      >
        {notebookSelected?.title}
      </Link>
      {
        page?.title &&
        <>
          <p>/</p>
          <p className='text-sm'>{page.title}</p>
        </>
      }
    </Row>
  );
}
