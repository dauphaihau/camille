import { Notebook, Page } from '@prisma/client';

export interface IStoreState {
  page: Partial<Page>,
  setPage: (page) => void,

  stateRouter: object
  setStateRouter: (state: object) => void

  statePageBreadcrumb: Partial<{ notebook: Pick<Notebook, 'id' | 'title'>, pageData: Page }>
  setStatePageBreadcrumb: (state: object) => void

  setShowSidebar: () => void,
  showSidebar: boolean,

  setShortcutOverrideSystem: (val: boolean) => void,
  shortcutOverrideSystem: boolean,

  setShowPagesInTrashPopover: (val: boolean) => void,
  showPagesInTrashPopover: boolean,

  setShowLimitedNotebookBar: (show?: boolean | undefined) => void,
  showLimitedNotebookBar: boolean,
}
