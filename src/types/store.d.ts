import { Notebook, Page, Teamspace, User, UserOnWorkspace, Workspace } from "@prisma/client";

type favoritePages = Page & {notebook: Notebook}

type StateUser = Partial<User & {
  userOnWorkspace: UserOnWorkspace
  privateNotebooks: Notebook[]
  favoritePages: favoritePages[]
}>

export interface IStoreState {
  page: Partial<Page>,
  setPage: (page) => void,

  reFetchNotebookId: string,
  setReFetchNotebookId: (notebookId: string) => void,

  reFetchTeamspaceId: string,
  setReFetchTeamspaceId: (teamspaceId: string) => void,

  stateRouter: any
  setStateRouter: (state: object) => void

  statePageBreadcrumb: any
  setStatePageBreadcrumb: (state: object) => void

  workspace: Partial<Workspace & {
    notebooks: Notebook[]
    teamspaces: Teamspace[]
    isStandard: boolean
    totalMembers: number
    totalNotebooks: number
  }>,
  setWorkspace: (state) => void
  // setWorkspace: (state: Workspace) => void

  setUser: (state: StateUser) => void
  user: StateUser,

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
