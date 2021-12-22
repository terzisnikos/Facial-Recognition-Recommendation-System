import {
  AdvertismentsFormState,
  AdvertismentsFormAction,
  AdvertismentsFormActionTypes
} from "types/redux/advertisments/advertismentsForm";

const initialData: AdvertismentsFormState = {
  findLoading: false,
  saveLoading: false,
  record: null,
};

export default (state = initialData, action: AdvertismentsFormAction): AdvertismentsFormState => {
  switch (action.type) {
    case AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_RESET:
      return {
        ...state,
      }
    case AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_FIND_STARTED:
      return {
        ...state,
        record: null,
        findLoading: true,
      }
    case AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_FIND_SUCCESS:
      return {
        ...state,
        record: action.payload,
        findLoading: false,
      }
    case AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_FIND_ERROR:
      return {
        ...state,
        record: null,
        findLoading: false,
      }
    case AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_CREATE_STARTED:
      return {
        ...state,
        saveLoading: true,
      }
    case AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_CREATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      }
    case AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_CREATE_ERROR:
      return {
        ...state,
        saveLoading: false,
      }
    case AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_UPDATE_STARTED:
      return {
        ...state,
        saveLoading: true,
      }
    case AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_UPDATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      }
    case AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_UPDATE_ERROR:
      return {
        ...state,
        saveLoading: false,
      }
    default:
      return state;
  }
}
