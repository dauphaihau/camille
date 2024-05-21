import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Row } from 'core/components';
import useStore, { useStoreMulti } from 'lib/store';
import Title from 'components/common/title';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { DashboardSlugs } from 'types/workspace';

export function PageBreadcrumb() {
  const slugs = useParams<DashboardSlugs>();
  const page = useStore(state => state.page);
  const { statePageBreadcrumb } = useStoreMulti('statePageBreadcrumb');
  const { data: { workspace } = {} } = useGetDetailWorkspace();

  return (
    <Row
      align='center'
      gap={ 1 }
      classes='min-w-0 flex-grow-0 font-medium'
    >
      {
        workspace?.domain && statePageBreadcrumb?.notebook?.id && (
          <Link
            href={ `/${workspace.domain}/${statePageBreadcrumb.notebook?.id}` }
            className='hover:bg-accent-light p-0.5 px-1.5 rounded'
          >
            <Title maxW={ 160 }>{ statePageBreadcrumb?.notebook?.title }</Title>
          </Link>
        )
      }
      { /*{*/ }
      { /*  slugs?.pageId &&*/ }
      { /*    (*/ }
      { /*      <>*/ }
      { /*        <p>/</p>*/ }
      { /*        <Title*/ }
      { /*          maxW={ 240 }*/ }
      { /*          className='p-0.5 px-1.5'*/ }
      { /*        >*/ }
      { /*          { slugs.pageId === page.id ? page.title : statePageBreadcrumb?.pageData?.title }*/ }
      { /*        </Title>*/ }
      { /*      </>*/ }
      { /*    )*/ }
      { /*}*/ }

      {
        slugs?.pageId === page?.id && page?.title && (
          <>
            <p>/</p>
            <Title
              maxW={ 240 }
              className='p-0.5 px-1.5'
            >{ page.title }
            </Title>
          </>
        )
      }
    </Row>
  );
}
