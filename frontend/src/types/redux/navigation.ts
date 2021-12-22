export interface NavigationState {
  sidebarOpened: boolean,
  activeItem: any,
  sidebarPosition: string,
  sidebarVisibility: string,
  sidebarStatic: boolean,
};

export enum NavigationActionTypes {
  CHANGE_SIDEBAR_POSITION = 'CHANGE_SIDEBAR_POSITION',
  CHANGE_SIDEBAR_VISIBILITY = 'CHANGE_SIDEBAR_VISIBILITY',
  OPEN_SIDEBAR = "OPEN_SIDEBAR",
  CLOSE_SIDEBAR = "CLOSE_SIDEBAR",
  CHANGE_ACTIVE_SIDEBAR_ITEM = "CHANGE_ACTIVE_SIDEBAR_ITEM",
}

interface ChangeSidebarPosition {
  type: NavigationActionTypes.CHANGE_SIDEBAR_POSITION;
  payload: string;
}

interface ChangeSidebarVisibility {
  type: NavigationActionTypes.CHANGE_SIDEBAR_VISIBILITY;
  payload: string;
}

interface OpenSidebar {
  type: NavigationActionTypes.OPEN_SIDEBAR;
}

interface CloseSidebar {
  type: NavigationActionTypes.CLOSE_SIDEBAR;
}

interface ChangeActiveSidebarItem {
  type: NavigationActionTypes.CHANGE_ACTIVE_SIDEBAR_ITEM;
  payload: any;
}

export type NavigationAction =
  ChangeSidebarPosition
  | ChangeSidebarVisibility
  | OpenSidebar
  | CloseSidebar
  | ChangeActiveSidebarItem
