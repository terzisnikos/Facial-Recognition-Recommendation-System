
export interface ReportsListState {
  rows: {
    [key: string]: any;
  }[];
  loading: boolean;
  count: number;
  modalOpen: boolean;
  idToDelete: null | string;
}

export enum ReportsListActionTypes {
  REPORTS_LIST_FILTERED = "REPORTS_LIST_FILTERED",
    REPORTS_LIST_FETCH_STARTED = "REPORTS_LIST_FETCH_STARTED",
      REPORTS_LIST_FETCH_SUCCESS = "REPORTS_LIST_FETCH_SUCCESS",
        REPORTS_LIST_FETCH_ERROR = "REPORTS_LIST_FETCH_ERROR",
          REPORTS_LIST_DELETE_STARTED = "REPORTS_LIST_DELETE_STARTED",
            REPORTS_LIST_DELETE_SUCCESS = "REPORTS_LIST_DELETE_SUCCESS",
              REPORTS_LIST_DELETE_ERROR = "REPORTS_LIST_DELETE_ERROR",
                REPORTS_LIST_OPEN_CONFIRM = "REPORTS_LIST_OPEN_CONFIRM",
                  REPORTS_LIST_CLOSE_CONFIRM = "REPORTS_LIST_CLOSE_CONFIRM",
}

interface ReportsListFiltered {
  type: ReportsListActionTypes.REPORTS_LIST_FILTERED;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number
  };
}

interface ReportsListFetchStarted {
  type: ReportsListActionTypes.REPORTS_LIST_FETCH_STARTED;
}

interface ReportsListFetchSuccess {
  type: ReportsListActionTypes.REPORTS_LIST_FETCH_SUCCESS;
  payload?: {
    rows: {
      [key: string]: any;
    }[];
    count: number
  };
}

interface ReportsListFetchError {
  type: ReportsListActionTypes.REPORTS_LIST_FETCH_ERROR;
}

interface ReportsListDeleteStarted {
  type: ReportsListActionTypes.REPORTS_LIST_DELETE_STARTED;
}

interface ReportsListDeleteSuccess {
  type: ReportsListActionTypes.REPORTS_LIST_DELETE_SUCCESS;
}

interface ReportsListDeleteError {
  type: ReportsListActionTypes.REPORTS_LIST_DELETE_ERROR;
}

interface ReportsListOpenConfirm {
  type: ReportsListActionTypes.REPORTS_LIST_OPEN_CONFIRM;
  payload: {
    id: string
  };
}

interface ReportsListCloseConfirm {
  type: ReportsListActionTypes.REPORTS_LIST_CLOSE_CONFIRM;
}

export type ReportsListAction =
  ReportsListFiltered
  | ReportsListFetchStarted
  | ReportsListFetchSuccess
  | ReportsListFetchError
  | ReportsListDeleteStarted
  | ReportsListDeleteSuccess
  | ReportsListDeleteError
  | ReportsListOpenConfirm
  | ReportsListCloseConfirm
