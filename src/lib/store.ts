import { create } from "zustand";
import { IStoreState } from "types/store";

const useStore = create<IStoreState>(set => ({
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

  reFetchTeamspaceId: '',
  setReFetchTeamspaceId: reFetchTeamspaceId => set({ reFetchTeamspaceId }),

  stateRouter: {},
  setStateRouter: stateRouter => set({ stateRouter }),

  userOnWorkspace: {},
  setUserOnWorkspace: userOnWorkspace => set({ userOnWorkspace }),

  page: {},
  setPage: page => set({ page }),

  statePageBreadcrumb: {},
  setStatePageBreadcrumb: statePageBreadcrumb => set({ statePageBreadcrumb }),

  workspace: {},
  setWorkspace: workspace => set({ workspace }),

  user: {},
  setUser: user => set({ user }),
}));

function useMulti(func, ...items) {
  return items.reduce((carry, item) => ({
    ...carry,
    [item]: func(state => state[item]),
  }), {})
}

export const useStoreMulti = (...items: string[]): IStoreState => useMulti(useStore, ...items)
// export const useStoreMulti = (...items: (string | IStoreState)[]): IStoreState => useMulti(useStore, ...items)

export default useStore;
