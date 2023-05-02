import Link from "next/link";
import { usePathname } from "next/navigation";

import { useWorkspaceContext } from "components/context/workspace-context";
import { Row } from "core/components";
import useStore from "../../../../lib/store";

export default function PageBreadcrumb() {
  const { workspace, notebooks, page } = useWorkspaceContext();
  const pathName = usePathname()?.split('/')
  const statePageBreadcrumb = useStore(state => state.statePageBreadcrumb)

  if (!pathName || !notebooks || notebooks.length === 0) {
    // or return skeleton
    return null
  }

  const notebookIdCurrent = pathName[2]
  const pageId = pathName[3]

  // const notebookSelected = notebooks.find((notebook) => notebook.id === notebookIdCurrent)

  // if (!workspace?.domain || !notebookSelected?.id) {
  //   return null
  // }

  console.log('dauphaihau debug: state-page-breadcrumb', statePageBreadcrumb)

  return (
    <Row align='center' gap={2}>
      <Link
        href={`/${workspace?.domain}/${statePageBreadcrumb?.notebook?.id}`}
        // href={`/${workspace.domain}/${notebookSelected.id}`}
        className='text-sm hover:bg-[#efefef] p-[2px] px-1 rounded '
      >
        {statePageBreadcrumb?.notebook?.title}
        {/*{notebookSelected?.title}*/}
      </Link>
      {
        pageId === page?.id && page?.title && <>
          <p>/</p>
          <p className='text-sm'>{page.title}</p>
        </>
      }
    </Row>
  );
}
