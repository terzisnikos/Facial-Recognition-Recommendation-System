/* eslint-disable import/prefer-default-export */
import { NavigationActionTypes } from "types/redux/navigation";

export function changeSidebarPosition(nextPosition: string) {
  return {
    type: NavigationActionTypes.CHANGE_SIDEBAR_POSITION,
    payload: nextPosition
  };
}

export function changeSidebarVisibility(nextVisibility: string) {
  return {
    type: NavigationActionTypes.CHANGE_SIDEBAR_VISIBILITY,
    payload: nextVisibility
  };
}

export function openSidebar() {
  return {
    type: NavigationActionTypes.OPEN_SIDEBAR,
  };
}

export function closeSidebar() {
  return {
    type: NavigationActionTypes.CLOSE_SIDEBAR,
  };
}

export function changeActiveSidebarItem(activeItem: any) {
  return {
    type: NavigationActionTypes.CHANGE_ACTIVE_SIDEBAR_ITEM,
    activeItem,
  };
}

