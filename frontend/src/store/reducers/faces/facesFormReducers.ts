import {
  FacesFormState,
  FacesFormAction,
  FacesFormActionTypes
} from "types/redux/faces/facesForm";

const initialData: FacesFormState = {
  findLoading: false,
  saveLoading: false,
  record: null,
};

export default (state = initialData, action: FacesFormAction): FacesFormState => {
  switch (action.type) {
    case FacesFormActionTypes.FACES_FORM_RESET:
      return {
        ...state,
      }
    case FacesFormActionTypes.FACES_FORM_FIND_STARTED:
      return {
        ...state,
        record: null,
        findLoading: true,
      }
    case FacesFormActionTypes.FACES_FORM_FIND_SUCCESS:
      return {
        ...state,
        record: action.payload,
        findLoading: false,
      }
    case FacesFormActionTypes.FACES_FORM_FIND_ERROR:
      return {
        ...state,
        record: null,
        findLoading: false,
      }
    case FacesFormActionTypes.FACES_FORM_CREATE_STARTED:
      return {
        ...state,
        saveLoading: true,
      }
    case FacesFormActionTypes.FACES_FORM_CREATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      }
    case FacesFormActionTypes.FACES_FORM_CREATE_ERROR:
      return {
        ...state,
        saveLoading: false,
      }
    case FacesFormActionTypes.FACES_FORM_UPDATE_STARTED:
      return {
        ...state,
        saveLoading: true,
      }
    case FacesFormActionTypes.FACES_FORM_UPDATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      }
    case FacesFormActionTypes.FACES_FORM_UPDATE_ERROR:
      return {
        ...state,
        saveLoading: false,
      }
    default:
      return state;
  }
}
