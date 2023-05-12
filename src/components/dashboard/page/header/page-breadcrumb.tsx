import Link from "next/link";
import { usePathname } from "next/navigation";

import { useWorkspaceContext } from "components/context/workspace-context";
import { Row } from "core/components";
import useStore from "lib/store";
import Title from "components/common/title";

export default function PageBreadcrumb() {
  const { workspace, notebooks, page } = useWorkspaceContext();
  const pathName = usePathname()?.split('/')
  const statePageBreadcrumb = useStore(state => state.statePageBreadcrumb)

  if (!pathName || !notebooks || notebooks.length === 0) {
    return null
  }

  const pageId = pathName[3]

  return (
    <Row align='center' gap={2} classes={'min-w-0 flex-grow-0'}>
      <Link
        href={`/${workspace?.domain}/${statePageBreadcrumb?.notebook?.id}`}
        className='hover:bg-[#efefef] p-[2px] px-1 rounded'
      >
        <Title maxW={160}>{statePageBreadcrumb?.notebook?.title}</Title>
      </Link>
      {
        pageId === page?.id && page?.title && <>
          <p>/</p>
          <Title maxW={240}>{page.title}</Title>
        </>
      }
    </Row>
  );
}
