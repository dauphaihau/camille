import { create } from 'zustand';
import { ILayoutStoreState } from 'types/stores/layout-store';
import { useMulti } from 'hooks/useMultiStore';

const useLayoutStore = create<ILayoutStoreState>(set => ({
  showSidebar: true,
  setShowSidebar: () => set(state => ({ showSidebar: !state.showSidebar })),

  showLimitedPagesBar: false,
  setShowLimitedPagesBar: (showLimitedPagesBar) => set(state =>
    ({ showLimitedPagesBar: showLimitedPagesBar ?? !state.showLimitedPagesBar })
  ),

  shortcutOverrideSystem: true,
  setShortcutOverrideSystem: (shortcutOverrideSystem) => set(() => ({ shortcutOverrideSystem })),

  showPagesInTrashPopover: false,
  setShowPagesInTrashPopover: (showPagesInTrashPopover) => set(() => ({ showPagesInTrashPopover })),

  page: null,
  setPage: page => set({ page }),

  workspace: null,
  setWorkspace: workspace => set({ workspace: workspace }),
}));

export const useStoreMulti = (...items: Array<keyof ILayoutStoreState>) => useMulti(useLayoutStore, ...items);

export default useLayoutStore;
