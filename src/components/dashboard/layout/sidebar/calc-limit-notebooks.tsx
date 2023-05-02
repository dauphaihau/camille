import { Box } from "core/components";
import { cn } from "core/helpers";
import { freePlan } from "config/subscriptions";
import { useWorkspaceContext } from "components/context/workspace-context";
import Link from "next/link";

export default function CalcLimitNotebooks() {
  const { workspace } = useWorkspaceContext()

  if (!workspace) return null

  const totalNotebooksPercent = workspace.totalNotebooks * (100 / freePlan.limitedNotebooks)

  if (!workspace.isStandard && workspace.totalMembers > 1) {
    return (
      <div>
        {/*!workspace.isStandard && <div>*/}
        <div className='border-t border-[#e9e9e8]'/>
        <Box classes='flex flex-col gap-y-1 px-4 py-3 hover:bg-[#ecebea] text-sm text-[#777572] cursor-pointer font-semibold'>
          <div className='font-semibold text-[12px]'>Upgrade to go unlimited</div>
          <div
            className={cn('font-normal text-[#757470] text-[12px]',
              { 'text-[#c5564e] font-medium': workspace.totalNotebooks * (100 / freePlan.limitedNotebooks) >= 80 }
            )}
          >This workspace has
            {/*used {workspace.totalNotebooks} of its {freePlan.limitedNotebooks} block*/}
            used {workspace.totalNotebooks} of its {freePlan.limitedNotebooks} notebook
            storage limit ({totalNotebooksPercent >= 100 ? 100 : totalNotebooksPercent}%).
            {/*storage limit (43%).*/}
          </div>
          <div className="w-full bg-[#eeeeec] rounded-sm h-1.5">
            <div
              className="bg-[#a1a09e] h-1.5 rounded-sm"
              style={{
                width: `${
                  totalNotebooksPercent >= 100 ? 100 : totalNotebooksPercent
                }%`
              }}
            />
          </div>
          <Link
            href={`/${workspace.domain}/settings/plans`}
            className='font-normal text-[12px] underline decoration-1'
          >Upgrade plan</Link>
          {/*<div className='font-normal text-[12px] underline decoration-1'>Upgrade plan</div>*/}
        </Box>
      </div>
    )
  }

  return null
}
