
export interface AdvertismentsListState {
  rows: {
    [key: string]: any;
  }[];
  loading: boolean;
  count: number;
  modalOpen: boolean;
  idToDelete: null | string;
}

export enum AdvertismentsListActionTypes {
  ADVERTISMENTS_LIST_FILTERED = "ADVERTISMENTS_LIST_FILTERED",
    ADVERTISMENTS_LIST_FETCH_STARTED = "ADVERTISMENTS_LIST_FETCH_STARTED",
      ADVERTISMENTS_LIST_FETCH_SUCCESS = "ADVERTISMENTS_LIST_FETCH_SUCCESS",
        ADVERTISMENTS_LIST_FETCH_ERROR = "ADVERTISMENTS_LIST_FETCH_ERROR",
          ADVERTISMENTS_LIST_DELETE_STARTED = "ADVERTISMENTS_LIST_DELETE_STARTED",
            ADVERTISMENTS_LIST_DELETE_SUCCESS = "ADVERTISMENTS_LIST_DELETE_SUCCESS",
              ADVERTISMENTS_LIST_DELETE_ERROR = "ADVERTISMENTS_LIST_DELETE_ERROR",
                ADVERTISMENTS_LIST_OPEN_CONFIRM = "ADVERTISMENTS_LIST_OPEN_CONFIRM",
                  ADVERTISMENTS_LIST_CLOSE_CONFIRM = "ADVERTISMENTS_LIST_CLOSE_CONFIRM",
}

interface AdvertismentsListFiltered {
  type: AdvertismentsListActionTypes.ADVERTISMENTS_LIST_FILTERED;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number
  };
}

interface AdvertismentsListFetchStarted {
  type: AdvertismentsListActionTypes.ADVERTISMENTS_LIST_FETCH_STARTED;
}

interface AdvertismentsListFetchSuccess {
  type: AdvertismentsListActionTypes.ADVERTISMENTS_LIST_FETCH_SUCCESS;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number
  };
}

interface AdvertismentsListFetchError {
  type: AdvertismentsListActionTypes.ADVERTISMENTS_LIST_FETCH_ERROR;
}

interface AdvertismentsListDeleteStarted {
  type: AdvertismentsListActionTypes.ADVERTISMENTS_LIST_DELETE_STARTED;
}

interface AdvertismentsListDeleteSuccess {
  type: AdvertismentsListActionTypes.ADVERTISMENTS_LIST_DELETE_SUCCESS;
}

interface AdvertismentsListDeleteError {
  type: AdvertismentsListActionTypes.ADVERTISMENTS_LIST_DELETE_ERROR;
}

interface AdvertismentsListOpenConfirm {
  type: AdvertismentsListActionTypes.ADVERTISMENTS_LIST_OPEN_CONFIRM;
  payload: {
    id: string
  };
}

interface AdvertismentsListCloseConfirm {
  type: AdvertismentsListActionTypes.ADVERTISMENTS_LIST_CLOSE_CONFIRM;
}

export type AdvertismentsListAction =
  AdvertismentsListFiltered
  | AdvertismentsListFetchStarted
  | AdvertismentsListFetchSuccess
  | AdvertismentsListFetchError
  | AdvertismentsListDeleteStarted
  | AdvertismentsListDeleteSuccess
  | AdvertismentsListDeleteError
  | AdvertismentsListOpenConfirm
  | AdvertismentsListCloseConfirm
