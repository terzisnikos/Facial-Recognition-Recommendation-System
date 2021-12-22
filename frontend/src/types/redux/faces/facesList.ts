
export interface FacesListState {
  rows: {
    [key: string]: any;
  }[];
  loading: boolean;
  count: number;
  modalOpen: boolean;
  idToDelete: null | string;
}

export enum FacesListActionTypes {
  FACES_LIST_FILTERED = "FACES_LIST_FILTERED",
    FACES_LIST_FETCH_STARTED = "FACES_LIST_FETCH_STARTED",
      FACES_LIST_FETCH_SUCCESS = "FACES_LIST_FETCH_SUCCESS",
        FACES_LIST_FETCH_ERROR = "FACES_LIST_FETCH_ERROR",
          FACES_LIST_DELETE_STARTED = "FACES_LIST_DELETE_STARTED",
            FACES_LIST_DELETE_SUCCESS = "FACES_LIST_DELETE_SUCCESS",
              FACES_LIST_DELETE_ERROR = "FACES_LIST_DELETE_ERROR",
                FACES_LIST_OPEN_CONFIRM = "FACES_LIST_OPEN_CONFIRM",
                  FACES_LIST_CLOSE_CONFIRM = "FACES_LIST_CLOSE_CONFIRM",
}

interface FacesListFiltered {
  type: FacesListActionTypes.FACES_LIST_FILTERED;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number
  };
}

interface FacesListFetchStarted {
  type: FacesListActionTypes.FACES_LIST_FETCH_STARTED;
}

interface FacesListFetchSuccess {
  type: FacesListActionTypes.FACES_LIST_FETCH_SUCCESS;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number
  };
}

interface FacesListFetchError {
  type: FacesListActionTypes.FACES_LIST_FETCH_ERROR;
}

interface FacesListDeleteStarted {
  type: FacesListActionTypes.FACES_LIST_DELETE_STARTED;
}

interface FacesListDeleteSuccess {
  type: FacesListActionTypes.FACES_LIST_DELETE_SUCCESS;
}

interface FacesListDeleteError {
  type: FacesListActionTypes.FACES_LIST_DELETE_ERROR;
}

interface FacesListOpenConfirm {
  type: FacesListActionTypes.FACES_LIST_OPEN_CONFIRM;
  payload: {
    id: string
  };
}

interface FacesListCloseConfirm {
  type: FacesListActionTypes.FACES_LIST_CLOSE_CONFIRM;
}

export type FacesListAction =
  FacesListFiltered
  | FacesListFetchStarted
  | FacesListFetchSuccess
  | FacesListFetchError
  | FacesListDeleteStarted
  | FacesListDeleteSuccess
  | FacesListDeleteError
  | FacesListOpenConfirm
  | FacesListCloseConfirm
