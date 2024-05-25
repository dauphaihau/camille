'use client';

import { Tooltip } from 'core/components';
import { useGetDetailWorkspace } from 'services/query-hooks/workspace';

export function UpdateLogo() {
  const { data: { workspace } = {} } = useGetDetailWorkspace();
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div
          className='avatar bg-accent group-hover:bg-[#dcdbda] h-16 w-16
         rounded text-md text-primary-medium grid place-items-center
         select-none'
        >
          { workspace?.name && workspace.name.charAt(0) }
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Feature are developing
      </Tooltip.Content>
    </Tooltip>
  );
}
