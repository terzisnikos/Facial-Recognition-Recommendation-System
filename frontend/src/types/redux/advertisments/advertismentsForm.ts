export interface AdvertismentsFormState {
  findLoading: boolean;
  saveLoading: boolean;
  record: null | any;
}

export enum AdvertismentsFormActionTypes {
ADVERTISMENTS_FORM_RESET = "ADVERTISMENTS_FORM_RESET",
  ADVERTISMENTS_FORM_FIND_STARTED = "ADVERTISMENTS_FORM_FIND_STARTED",
    ADVERTISMENTS_FORM_FIND_SUCCESS = "ADVERTISMENTS_FORM_FIND_SUCCESS",
      ADVERTISMENTS_FORM_FIND_ERROR = "ADVERTISMENTS_FORM_FIND_ERROR",
        ADVERTISMENTS_FORM_CREATE_STARTED = "ADVERTISMENTS_FORM_CREATE_STARTED",
          ADVERTISMENTS_FORM_CREATE_SUCCESS = "ADVERTISMENTS_FORM_CREATE_SUCCESS",
            ADVERTISMENTS_FORM_CREATE_ERROR = "ADVERTISMENTS_FORM_CREATE_ERROR",
              ADVERTISMENTS_FORM_UPDATE_STARTED = "ADVERTISMENTS_FORM_UPDATE_STARTED",
                ADVERTISMENTS_FORM_UPDATE_SUCCESS = "ADVERTISMENTS_FORM_UPDATE_SUCCESS",
                  ADVERTISMENTS_FORM_UPDATE_ERROR = "ADVERTISMENTS_FORM_UPDATE_ERROR",
}

interface AdvertismentsFormReset {
  type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_RESET;
}

interface AdvertismentsFormFindStarted {
  type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_FIND_STARTED;
}

interface AdvertismentsFormFindSuccess {
  type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_FIND_SUCCESS;
  payload: any;
}

interface AdvertismentsFormFindError {
  type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_FIND_ERROR;
}

interface AdvertismentsFormCreateStarted {
  type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_CREATE_STARTED;
}

interface AdvertismentsFormCreateSuccess {
  type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_CREATE_SUCCESS;
}

interface AdvertismentsFormCreateError {
  type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_CREATE_ERROR;
}

interface AdvertismentsFormUpdateStarted {
  type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_UPDATE_STARTED;
}

interface AdvertismentsFormUpdateSuccess {
  type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_UPDATE_SUCCESS;
}

interface AdvertismentsFormUpdateError {
  type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_UPDATE_ERROR;
}

export type AdvertismentsFormAction =
  AdvertismentsFormReset
  | AdvertismentsFormFindStarted
  | AdvertismentsFormFindSuccess
  | AdvertismentsFormFindError
  | AdvertismentsFormCreateStarted
  | AdvertismentsFormCreateSuccess
  | AdvertismentsFormCreateError
  | AdvertismentsFormUpdateStarted
  | AdvertismentsFormUpdateSuccess
  | AdvertismentsFormUpdateError
