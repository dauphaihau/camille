import Link from 'next/link';

import { Row } from 'core/components';
import { useStoreMulti } from 'stores/layout-store';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';
import { PATH } from 'config/const';

export function LimitedPagesBar() {
  const { showLimitedPagesBar } = useStoreMulti('showLimitedPagesBar');
  const { data: { workspace } = {} } = useGetDetailWorkspace();

  if (showLimitedPagesBar) {
    return (
      <Row
        justify='center'
        align='center'
        gap={ 2 }
        classes='text-white text-center py-2 text-sm font-medium bg-red-500/80 h-10'
      >
        <div>You are over the page limit for the free plan</div>
        <Link
          href={ `/${workspace?.domain}${PATH.SETTINGS}/plans` }
          className='border border-white text-white py-0.5 px-2 rounded hover:bg-[#cd5e59] cursor-pointer'
        >
          Upgrade for unlimited
        </Link>
      </Row>
    );
  }
  return null;
}
