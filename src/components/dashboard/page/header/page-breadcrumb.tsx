import Link from "next/link";
import { usePathname } from "next/navigation";

import { Row } from "core/components";
import useStore, { useStoreMulti } from "lib/store";
import Title from "components/common/title";

export function PageBreadcrumb() {
  const pathName = usePathname()?.split('/')
  const page = useStore(state => state.page)
  const { statePageBreadcrumb, workspace } = useStoreMulti('statePageBreadcrumb', 'workspace')

  const pageId = pathName && pathName[3]

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
