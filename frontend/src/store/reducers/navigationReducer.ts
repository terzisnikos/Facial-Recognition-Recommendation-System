import {NavigationAction, NavigationActionTypes, NavigationState} from "types/redux/navigation";

const initialState: NavigationState = {
  sidebarOpened: false,
  activeItem: JSON.parse(<string>localStorage.getItem('staticSidebar')) ? window.location.pathname : null,
  sidebarPosition: 'left',
  sidebarVisibility: 'show',
  sidebarStatic: false,
};

export default function runtime(state = initialState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case NavigationActionTypes.CHANGE_SIDEBAR_POSITION:
      return Object.assign({}, state, {
        sidebarVisibility: action.payload,
      });
    case NavigationActionTypes.CHANGE_SIDEBAR_VISIBILITY:
      return Object.assign({}, state, {
        sidebarPosition: action.payload,
      });
    case NavigationActionTypes.OPEN_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: true,
      });
    case NavigationActionTypes.CLOSE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: false,
      });
    case NavigationActionTypes.CHANGE_ACTIVE_SIDEBAR_ITEM:
      return {
        ...state,
        activeItem: action.payload,
      };
    default:
      return state;
  }
}
