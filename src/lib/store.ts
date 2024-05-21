import { create, StoreApi, UseBoundStore } from 'zustand';
import { IStoreState } from 'types/store';

const useStore = create<IStoreState>(set => ({
  showSidebar: true,
  setShowSidebar: () => set(state => ({ showSidebar: !state.showSidebar })),

  showLimitedNotebookBar: false,
  setShowLimitedNotebookBar: (showLimitedNotebookBar) => set(state =>
    ({ showLimitedNotebookBar: showLimitedNotebookBar ?? !state.showLimitedNotebookBar })
  ),

  shortcutOverrideSystem: true,
  setShortcutOverrideSystem: (shortcutOverrideSystem) => set(() => ({ shortcutOverrideSystem })),

  showPagesInTrashPopover: false,
  setShowPagesInTrashPopover: (showPagesInTrashPopover) => set(() => ({ showPagesInTrashPopover })),

  stateRouter: {},
  setStateRouter: stateRouter => set({ stateRouter }),

  page: {},
  setPage: page => set({ page }),

  statePageBreadcrumb: {},
  setStatePageBreadcrumb: statePageBreadcrumb => set({ statePageBreadcrumb }),
}));

// Utility function, to allow us to pick fields from the store
const useMulti = <T extends object, K extends keyof T>(
  fn: UseBoundStore<StoreApi<T>>,
  ...items: K[]
): Pick<T, K> => {
  return items.reduce(
    (carry, item) => ({
      ...carry,
      // No need to use useShallow here, as we fetch the objects one by one
      [item]: fn((state) => state[item]),
    }),
    {}
  ) as Pick<T, K>;
};

export const useStoreMulti = (...items: Array<keyof IStoreState>) => useMulti(useStore, ...items);

export default useStore;
