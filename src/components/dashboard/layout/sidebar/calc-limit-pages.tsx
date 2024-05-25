import Link from 'next/link';

import { useParams } from 'next/navigation';
import { Col } from 'core/components';
import { cn } from 'core/helpers';
import { freePlan } from 'config/subscriptions';
import { PATH } from 'config/const';
import { useStoreMulti } from 'stores/layout-store';
import { DashboardSlugs } from 'types/workspace';

export function CalcLimitPages() {
  const slugs = useParams<DashboardSlugs>();

  const {
    workspace,
  } = useStoreMulti('workspace');

  if (!workspace?.totalPages || !workspace?.totalMembers) {
    return null;
  }

  const totalPagesPercent = workspace.totalPages * (100 / freePlan.limitedPages);

  if (!workspace.isStandard && workspace.totalMembers > 1) {
    return (
      <div>
        <div className='border-t border-primary-light' />
        <Col classes='gap-y-3 px-4 py-3 hover:bg-accent text-sm text-primary-medium cursor-pointer font-semibold'>

          <Col gap={ 1 }>
            <div className='font-semibold text-xs'>Upgrade to go unlimited</div>
            <div
              className={ cn('font-medium text-primary text-xs leading-4',
                { 'text-[#c5564e]': workspace.totalPages * (100 / freePlan.limitedPages) >= 80 }
              ) }
            >This workspace has { ' ' }
              used { workspace.totalPages } of its { freePlan.limitedPages } page
              storage limit ({ totalPagesPercent >= 100 ? 100 : totalPagesPercent }%).
            </div>
          </Col>

          <div className='w-full bg-[#eeeeec] rounded-sm h-1.5'>
            <div
              className='bg-[#a1a09e] h-1.5 rounded-sm '
              style={ { width: `${totalPagesPercent >= 100 ? 100 : totalPagesPercent}%` } }
            />
          </div>

          <Link
            href={ `/${slugs?.domainWorkspace}${PATH.SETTINGS}${PATH.PLANS}` }
            className='font-normal text-xs underline decoration-1'
          >Upgrade plan
          </Link>
        </Col>
      </div>
    );
  }
  return null;
}
