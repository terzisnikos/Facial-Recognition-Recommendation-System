
export interface UsersListState {
  rows: {
    [key: string]: any;
  }[];
  loading: boolean;
  count: number;
  modalOpen: boolean;
  idToDelete: null | string;
}

export enum UsersListActionTypes {
  USERS_LIST_FILTERED = "USERS_LIST_FILTERED",
    USERS_LIST_FETCH_STARTED = "USERS_LIST_FETCH_STARTED",
      USERS_LIST_FETCH_SUCCESS = "USERS_LIST_FETCH_SUCCESS",
        USERS_LIST_FETCH_ERROR = "USERS_LIST_FETCH_ERROR",
          USERS_LIST_DELETE_STARTED = "USERS_LIST_DELETE_STARTED",
            USERS_LIST_DELETE_SUCCESS = "USERS_LIST_DELETE_SUCCESS",
              USERS_LIST_DELETE_ERROR = "USERS_LIST_DELETE_ERROR",
                USERS_LIST_OPEN_CONFIRM = "USERS_LIST_OPEN_CONFIRM",
                  USERS_LIST_CLOSE_CONFIRM = "USERS_LIST_CLOSE_CONFIRM",
}

interface UsersListFiltered {
  type: UsersListActionTypes.USERS_LIST_FILTERED;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number
  };
}

interface UsersListFetchStarted {
  type: UsersListActionTypes.USERS_LIST_FETCH_STARTED;
}

interface UsersListFetchSuccess {
  type: UsersListActionTypes.USERS_LIST_FETCH_SUCCESS;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number
  };
}

interface UsersListFetchError {
  type: UsersListActionTypes.USERS_LIST_FETCH_ERROR;
}

interface UsersListDeleteStarted {
  type: UsersListActionTypes.USERS_LIST_DELETE_STARTED;
}

interface UsersListDeleteSuccess {
  type: UsersListActionTypes.USERS_LIST_DELETE_SUCCESS;
}

interface UsersListDeleteError {
  type: UsersListActionTypes.USERS_LIST_DELETE_ERROR;
}

interface UsersListOpenConfirm {
  type: UsersListActionTypes.USERS_LIST_OPEN_CONFIRM;
  payload: {
    id: string
  };
}

interface UsersListCloseConfirm {
  type: UsersListActionTypes.USERS_LIST_CLOSE_CONFIRM;
}

export type UsersListAction =
  UsersListFiltered
  | UsersListFetchStarted
  | UsersListFetchSuccess
  | UsersListFetchError
  | UsersListDeleteStarted
  | UsersListDeleteSuccess
  | UsersListDeleteError
  | UsersListOpenConfirm
  | UsersListCloseConfirm
