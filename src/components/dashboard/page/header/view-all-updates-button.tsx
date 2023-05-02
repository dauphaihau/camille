import { Icons, Tooltip } from "core/components";
import { cn } from "core/helpers";
import { useWorkspaceContext } from "../../../context/workspace-context";
import { addToFavorite } from "../../../../lib/request-by-swr/page";
import { toast } from "../../../../core/components/Toast";
import React, { useCallback } from "react";
import { useKeyboardShortcut } from "../../../../core";
import { usePathname, useRouter } from "next/navigation";

export default function ViewAllUpdatesButton() {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div className='btn-icon-header'>
          <Icons.clock className='h-5 w-5'/>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Feature are developing
      </Tooltip.Content>
    </Tooltip>
  );
}
