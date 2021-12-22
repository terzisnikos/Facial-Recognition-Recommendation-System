export interface FacesFormState {
  findLoading: boolean;
  saveLoading: boolean;
  record: null | any;
}

export enum FacesFormActionTypes {
FACES_FORM_RESET = "FACES_FORM_RESET",
  FACES_FORM_FIND_STARTED = "FACES_FORM_FIND_STARTED",
    FACES_FORM_FIND_SUCCESS = "FACES_FORM_FIND_SUCCESS",
      FACES_FORM_FIND_ERROR = "FACES_FORM_FIND_ERROR",
        FACES_FORM_CREATE_STARTED = "FACES_FORM_CREATE_STARTED",
          FACES_FORM_CREATE_SUCCESS = "FACES_FORM_CREATE_SUCCESS",
            FACES_FORM_CREATE_ERROR = "FACES_FORM_CREATE_ERROR",
              FACES_FORM_UPDATE_STARTED = "FACES_FORM_UPDATE_STARTED",
                FACES_FORM_UPDATE_SUCCESS = "FACES_FORM_UPDATE_SUCCESS",
                  FACES_FORM_UPDATE_ERROR = "FACES_FORM_UPDATE_ERROR",
}

interface FacesFormReset {
  type: FacesFormActionTypes.FACES_FORM_RESET;
}

interface FacesFormFindStarted {
  type: FacesFormActionTypes.FACES_FORM_FIND_STARTED;
}

interface FacesFormFindSuccess {
  type: FacesFormActionTypes.FACES_FORM_FIND_SUCCESS;
  payload: any;
}

interface FacesFormFindError {
  type: FacesFormActionTypes.FACES_FORM_FIND_ERROR;
}

interface FacesFormCreateStarted {
  type: FacesFormActionTypes.FACES_FORM_CREATE_STARTED;
}

interface FacesFormCreateSuccess {
  type: FacesFormActionTypes.FACES_FORM_CREATE_SUCCESS;
}

interface FacesFormCreateError {
  type: FacesFormActionTypes.FACES_FORM_CREATE_ERROR;
}

interface FacesFormUpdateStarted {
  type: FacesFormActionTypes.FACES_FORM_UPDATE_STARTED;
}

interface FacesFormUpdateSuccess {
  type: FacesFormActionTypes.FACES_FORM_UPDATE_SUCCESS;
}

interface FacesFormUpdateError {
  type: FacesFormActionTypes.FACES_FORM_UPDATE_ERROR;
}

export type FacesFormAction =
  FacesFormReset
  | FacesFormFindStarted
  | FacesFormFindSuccess
  | FacesFormFindError
  | FacesFormCreateStarted
  | FacesFormCreateSuccess
  | FacesFormCreateError
  | FacesFormUpdateStarted
  | FacesFormUpdateSuccess
  | FacesFormUpdateError
