'use client'

import { Tooltip } from "core/components";
import useStore from "lib/store";

export default function UpdateLogo() {
  const workspace = useStore(state => state.workspace)
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div
          className='avatar bg-[#ecebea] group-hover:bg-[#dcdbda] h-16 w-16
         rounded text-md text-[#777572] grid place-items-center
         select-none

         '
        >
          {workspace.name && workspace.name.charAt(0)}
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Feature are developing
      </Tooltip.Content>
    </Tooltip>
  );
}
