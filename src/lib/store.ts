import { create } from "zustand";
import { Notebook, Page, Teamspace, User, UserOnWorkspace, Workspace } from "@prisma/client";

export interface StoreState {
  page: Partial<Page>,
  // page: Page,
  setPage: (page) => void,

  reFetchNotebookId: string,
  setReFetchNotebookId: (notebookId: string) => void,

  stateRouter: any
  setStateRouter: (state: object) => void
  statePageBreadcrumb: any
  setStatePageBreadcrumb: (state: object) => void
  setWorkspace: (state: Workspace) => void
  workspace: Partial<Workspace & {
    notebooks: Notebook[]
    teamspaces: Teamspace[]
    isStandard: boolean
    totalMembers: number
    totalNotebooks: number
  }>,

  userOnWorkspace: Partial<{
    user: User
  } & UserOnWorkspace>
  setUserOnWorkspace: (userOnWorkspace: object) => void,

  setShowSidebar: () => void,
  showSidebar: boolean,

  setShortcutOverrideSystem: (val: boolean) => void,
  shortcutOverrideSystem: boolean,

  setShowPagesInTrashPopover: (val: boolean) => void,
  showPagesInTrashPopover: boolean,

  setShowLimitedNotebookBar: (showLimitedNotebookBar?: boolean | undefined) => void,
  showLimitedNotebookBar: boolean,
}

const useStore = create<StoreState>(set => ({
  showSidebar: true,
  setShowSidebar: () => set(state => ({ showSidebar: !state.showSidebar })),

  showLimitedNotebookBar: false,
  setShowLimitedNotebookBar: (showLimitedNotebookBar) => set(state => ({ showLimitedNotebookBar: showLimitedNotebookBar ?? !state.showLimitedNotebookBar })),

  shortcutOverrideSystem: true,
  setShortcutOverrideSystem: (shortcutOverrideSystem) => set(() => ({ shortcutOverrideSystem })),

  showPagesInTrashPopover: false,
  setShowPagesInTrashPopover: (showPagesInTrashPopover) => set(() => ({ showPagesInTrashPopover })),

  reFetchNotebookId: '',
  setReFetchNotebookId: reFetchNotebookId => set({ reFetchNotebookId }),

  stateRouter: {},
  setStateRouter: stateRouter => set({ stateRouter }),

  userOnWorkspace: {},
  setUserOnWorkspace: userOnWorkspace => set({ userOnWorkspace }),

  page: {},
  setPage: page => set({ page }),

  statePageBreadcrumb: {},
  setStatePageBreadcrumb: statePageBreadcrumb => set({ statePageBreadcrumb }),

  // workspace: null,
  workspace: {},
  setWorkspace: workspace => set({ workspace }),

}));

export default useStore;
