import { Row } from 'core/components';
import useStore from 'stores/layout-store';
import Title from 'components/common/title';
import { useGetCurrentPage } from 'services/query-hooks/page';

export function PageBreadcrumb() {
  const page = useStore(state => state.page);
  const { data: pageData } = useGetCurrentPage();

  return (
    <Row
      align='center'
      gap={ 1 }
      classes='min-w-0 flex-grow-0 font-medium'
    >
      {
        pageData?.teamspace?.name && (
          <>
            <Title
              maxW={ 240 }
              className='hover:bg-accent-light p-0.5 px-1.5 rounded'
            >{ pageData?.teamspace.name }
            </Title>
            <div>/</div>
          </>
        )
      }
      {
        pageData?.title && (
          <>
            <Title
              maxW={ 240 }
              className='hover:bg-accent-light p-0.5 px-1.5 rounded'
            >{ page?.title || pageData.title }
            </Title>
          </>
        )
      }
    </Row>
  );
}
