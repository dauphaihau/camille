import Link from 'next/link';

import { Row } from 'core/components';
import { useStoreMulti } from 'lib/store';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { PATH } from 'config/const';

export function LimitedNotebookBar() {
  const { showLimitedNotebookBar } = useStoreMulti('showLimitedNotebookBar');
  const { data: { workspace } = {} } = useGetDetailWorkspace();

  if (showLimitedNotebookBar) {
    return (
      <Row
        justify='center'
        align='center'
        gap={ 2 }
        classes='text-white text-center py-2 text-[14px] font-medium'
        style={ { background: 'rgb(235, 87, 87)' } }
      >
        <div>You are over the notebook limit for the free plan</div>
        { /*<div>You are over the block limit for the free plan</div>*/ }
        <Link
          href={ `/${workspace?.domain}${PATH.SETTINGS}/plans` }
          className='border border-white text-white px-2.5 rounded-sm hover:bg-[#cd5e59] cursor-pointer'
        >
          Upgrade for unlimited
        </Link>
      </Row>
    );
  }
  return null;
}
