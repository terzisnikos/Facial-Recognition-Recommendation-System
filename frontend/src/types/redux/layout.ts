export interface LayoutState {
  dashboardTheme: string,
  sidebarColor: string,
  navbarColor:  string,
  navbarType: string,
  sidebarType: string
}

export enum LayoutActionTypes {
  CHANGE_THEME = "CHANGE_THEME",
  CHANGE_SIDEBAR_COLOR = "CHANGE_SIDEBAR_COLOR",
  CHANGE_NAVBAR_COLOR = "CHANGE_NAVBAR_COLOR",
  NAVBAR_TYPE_TOGGLE = "NAVBAR_TYPE_TOGGLE",
  SIDEBAR_TYPE_TOGGLE = "SIDEBAR_TYPE_TOGGLE",
}

interface ChangeTheme {
  type: LayoutActionTypes.CHANGE_THEME;
  payload: string;
}

interface ChangeSidebarColor {
  type: LayoutActionTypes.CHANGE_SIDEBAR_COLOR;
  payload: string;
}

interface ChangeNavbarColor {
  type: LayoutActionTypes.CHANGE_NAVBAR_COLOR;
  payload: string;
}

interface NavbarTypeToggle {
  type: LayoutActionTypes.NAVBAR_TYPE_TOGGLE;
  payload: string;
}

interface SidebarTypeToggle {
  type: LayoutActionTypes.SIDEBAR_TYPE_TOGGLE;
  payload: string;
}

export type LayoutAction =
  ChangeTheme
  | ChangeSidebarColor
  | ChangeNavbarColor
  | NavbarTypeToggle
  | SidebarTypeToggle
