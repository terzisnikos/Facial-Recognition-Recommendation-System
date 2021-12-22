import {
  ReportsFormState,
  ReportsFormAction,
  ReportsFormActionTypes
} from "types/redux/reports/reportsForm";

const initialData: ReportsFormState = {
  findLoading: false,
  saveLoading: false,
  record: null,
};

export default (state = initialData, action: ReportsFormAction): ReportsFormState => {
  switch (action.type) {
    case ReportsFormActionTypes.REPORTS_FORM_RESET:
      return {
        ...state,
      }
    case ReportsFormActionTypes.REPORTS_FORM_FIND_STARTED:
      return {
        ...state,
        record: null,
        findLoading: true,
      }
    case ReportsFormActionTypes.REPORTS_FORM_FIND_SUCCESS:
      return {
        ...state,
        record: action.payload,
        findLoading: false,
      }
    case ReportsFormActionTypes.REPORTS_FORM_FIND_ERROR:
      return {
        ...state,
        record: null,
        findLoading: false,
      }
    case ReportsFormActionTypes.REPORTS_FORM_CREATE_STARTED:
      return {
        ...state,
        saveLoading: true,
      }
    case ReportsFormActionTypes.REPORTS_FORM_CREATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      }
    case ReportsFormActionTypes.REPORTS_FORM_CREATE_ERROR:
      return {
        ...state,
        saveLoading: false,
      }
    case ReportsFormActionTypes.REPORTS_FORM_UPDATE_STARTED:
      return {
        ...state,
        saveLoading: true,
      }
    case ReportsFormActionTypes.REPORTS_FORM_UPDATE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
      }
    case ReportsFormActionTypes.REPORTS_FORM_UPDATE_ERROR:
      return {
        ...state,
        saveLoading: false,
      }
    default:
      return state;
  }
}
