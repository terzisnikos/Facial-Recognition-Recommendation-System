import { LayoutAction, LayoutActionTypes } from "types/redux/layout";

export function changeTheme(payload: string) {
  return {
    type: LayoutActionTypes.CHANGE_THEME,
    payload,
  };
}

export function changeSidebarColor(payload: string) {
  return {
    type: LayoutActionTypes.CHANGE_SIDEBAR_COLOR,
    payload,
  };
}

export function changeNavbarColor(payload: string) {
  return {
    type: LayoutActionTypes.CHANGE_NAVBAR_COLOR,
    payload,
  };
}

export function navbarTypeToggle(value: string) {
  return {
    type: LayoutActionTypes.NAVBAR_TYPE_TOGGLE,
    payload: value
  }
}

export function sidebarTypeToggle(value: string) {
  return {
    type: LayoutActionTypes.SIDEBAR_TYPE_TOGGLE,
    payload: value
  }
}

