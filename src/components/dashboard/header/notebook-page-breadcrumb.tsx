import React from "react";
import { useWorkspaceContext } from "components/context/WorkspaceContext";
import { useSelectedLayoutSegments } from "next/navigation";
import { Row } from "core/components";
import Link from "next/link";

export default function NotebookPageBreadcrumb() {

  const { workspace, notebooks, page } = useWorkspaceContext();
  const segments = useSelectedLayoutSegments()

  console.log('dauphaihau debug: segments', segments)

  if (segments.includes('settings') || segments.length === 0) {
    return null
  }

  const notebookIdCurrent = segments[0]
  const notebookSelected = notebooks.find((notebook) => notebook.id === notebookIdCurrent)

  return (
    <Row align='center' gap={2}>
      <Link
        href={`/${workspace.domain}/${notebookSelected.id}`}
        className='text-sm hover:bg-[#efefef] p-[2px] px-1 rounded '
      >
        {/*IT - Developer / News, Exp, Blog ... / Experience*/}
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
