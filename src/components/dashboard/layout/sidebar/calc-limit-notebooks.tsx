import Link from "next/link";

import { Col } from "core/components";
import { cn } from "core/helpers";
import { freePlan } from "config/subscriptions";
import useStore from "lib/store";

export function CalcLimitNotebooks() {
  const workspace = useStore(state => state.workspace)

  if (!workspace?.totalNotebooks || !workspace?.totalMembers) {
    return null
  }

  const totalNotebooksPercent = workspace.totalNotebooks * (100 / freePlan.limitedNotebooks)

  if (!workspace.isStandard && workspace.totalMembers > 1) {
    return (
      <div>
        <div className='border-t border-primary-light'/>
        <Col classes='gap-y-3 px-4 py-3 hover:bg-accent text-sm text-primary-medium cursor-pointer font-semibold'>
          <Col gap={1}>
            <div className='font-semibold text-xs'>Upgrade to go unlimited</div>
            <div
              className={cn('font-medium text-primary text-xs leading-4',
                { 'text-[#c5564e]': workspace.totalNotebooks * (100 / freePlan.limitedNotebooks) >= 80 }
              )}
            >This workspace has {' '}
              {/*used {workspace.totalNotebooks} of its {freePlan.limitedNotebooks} block*/}
              used {workspace.totalNotebooks} of its {freePlan.limitedNotebooks} notebook
              storage limit ({totalNotebooksPercent >= 100 ? 100 : totalNotebooksPercent}%).
            </div>
          </Col>
          <div className="w-full bg-[#eeeeec] rounded-sm h-1.5">
            <div
              className="bg-[#a1a09e] h-1.5 rounded-sm "
              style={{ width: `${totalNotebooksPercent >= 100 ? 100 : totalNotebooksPercent}%` }}
            />
          </div>
          <Link
            href={`/${workspace.domain}/settings/plans`}
            className='font-normal text-xs underline decoration-1'
          >Upgrade plan</Link>
        </Col>
      </div>
    )
  }

  return null
}
