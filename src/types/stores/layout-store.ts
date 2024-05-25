import { Page } from '@prisma/client';

type WSTemp = {
  isStandard: boolean,
  isLimitedPages: boolean,
  totalMembers: number,
  totalPages: number,
}

export interface ILayoutStoreState {
  page: Partial<Page> | null,
  setPage: (page: Partial<Page> | null) => void,

  workspace: WSTemp | null,
  setWorkspace: (workspace: WSTemp) => void,

  setShowSidebar: () => void,
  showSidebar: boolean,

  setShortcutOverrideSystem: (val: boolean) => void,
  shortcutOverrideSystem: boolean,

  setShowPagesInTrashPopover: (val: boolean) => void,
  showPagesInTrashPopover: boolean,

  setShowLimitedPagesBar: (show?: boolean | undefined) => void,
  showLimitedPagesBar: boolean,
}
