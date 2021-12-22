import config from '../../config'
import {
  LayoutAction,
  LayoutActionTypes,
  LayoutState
} from "types/redux/layout";

export const DashboardThemes = {
  LIGHT: "light",
  DARK: "dark"
};

export const SidebarTypes = {
  SOLID: "solid",
  TRANSPARENT: "transparent",
}

export const NavbarTypes = {
  STATIC: "static",
  FLOATING: "floating",
}

export const LayoutComponents = {
  NAVBAR: "navbar",
  SIDEBAR: "sidebar"
}

Object.freeze(DashboardThemes);
Object.freeze(SidebarTypes);
Object.freeze(NavbarTypes);
Object.freeze(LayoutComponents);

const defaultState: LayoutState = {
  dashboardTheme: DashboardThemes.DARK,
  sidebarColor: DashboardThemes.DARK,
  navbarColor:  config.app.colors.light,
  navbarType: NavbarTypes.STATIC,
  sidebarType: SidebarTypes.SOLID
};

export default function layoutReducer(state = defaultState, action: LayoutAction): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.CHANGE_THEME:
      return {
        ...state,
        dashboardTheme: action.payload
      };
    case LayoutActionTypes.CHANGE_SIDEBAR_COLOR:
      return {
        ...state,
        sidebarColor: action.payload
      };
    case LayoutActionTypes.CHANGE_NAVBAR_COLOR:
      return {
        ...state,
        navbarColor: action.payload
      };
    case LayoutActionTypes.NAVBAR_TYPE_TOGGLE:
      return {
        ...state,
        navbarType: action.payload,
      }
    case LayoutActionTypes.SIDEBAR_TYPE_TOGGLE:
      return {
        ...state,
        sidebarType: action.payload
      }
    default:
      return state;
  }
}
