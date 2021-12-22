export interface ReportsFormState {
  findLoading: boolean;
  saveLoading: boolean;
  record: null | any;
}

export enum ReportsFormActionTypes {
REPORTS_FORM_RESET = "REPORTS_FORM_RESET",
  REPORTS_FORM_FIND_STARTED = "REPORTS_FORM_FIND_STARTED",
    REPORTS_FORM_FIND_SUCCESS = "REPORTS_FORM_FIND_SUCCESS",
      REPORTS_FORM_FIND_ERROR = "REPORTS_FORM_FIND_ERROR",
        REPORTS_FORM_CREATE_STARTED = "REPORTS_FORM_CREATE_STARTED",
          REPORTS_FORM_CREATE_SUCCESS = "REPORTS_FORM_CREATE_SUCCESS",
            REPORTS_FORM_CREATE_ERROR = "REPORTS_FORM_CREATE_ERROR",
              REPORTS_FORM_UPDATE_STARTED = "REPORTS_FORM_UPDATE_STARTED",
                REPORTS_FORM_UPDATE_SUCCESS = "REPORTS_FORM_UPDATE_SUCCESS",
                  REPORTS_FORM_UPDATE_ERROR = "REPORTS_FORM_UPDATE_ERROR",
}

interface ReportsFormReset {
  type: ReportsFormActionTypes.REPORTS_FORM_RESET;
}

interface ReportsFormFindStarted {
  type: ReportsFormActionTypes.REPORTS_FORM_FIND_STARTED;
}

interface ReportsFormFindSuccess {
  type: ReportsFormActionTypes.REPORTS_FORM_FIND_SUCCESS;
  payload: any;
}

interface ReportsFormFindError {
  type: ReportsFormActionTypes.REPORTS_FORM_FIND_ERROR;
}

interface ReportsFormCreateStarted {
  type: ReportsFormActionTypes.REPORTS_FORM_CREATE_STARTED;
}

interface ReportsFormCreateSuccess {
  type: ReportsFormActionTypes.REPORTS_FORM_CREATE_SUCCESS;
}

interface ReportsFormCreateError {
  type: ReportsFormActionTypes.REPORTS_FORM_CREATE_ERROR;
}

interface ReportsFormUpdateStarted {
  type: ReportsFormActionTypes.REPORTS_FORM_UPDATE_STARTED;
}

interface ReportsFormUpdateSuccess {
  type: ReportsFormActionTypes.REPORTS_FORM_UPDATE_SUCCESS;
}

interface ReportsFormUpdateError {
  type: ReportsFormActionTypes.REPORTS_FORM_UPDATE_ERROR;
}

export type ReportsFormAction =
  ReportsFormReset
  | ReportsFormFindStarted
  | ReportsFormFindSuccess
  | ReportsFormFindError
  | ReportsFormCreateStarted
  | ReportsFormCreateSuccess
  | ReportsFormCreateError
  | ReportsFormUpdateStarted
  | ReportsFormUpdateSuccess
  | ReportsFormUpdateError
