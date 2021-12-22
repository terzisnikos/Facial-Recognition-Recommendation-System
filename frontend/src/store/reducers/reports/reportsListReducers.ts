import {
  ReportsListState,
  ReportsListAction,
  ReportsListActionTypes
} from "types/redux/reports/reportsList";

const initialData: ReportsListState = {
  rows: [],
  loading: false,
  count: 0,
  modalOpen: false,
  idToDelete: null,
};

export default (state = initialData, action: ReportsListAction): ReportsListState => {
  switch (action.type) {
    case ReportsListActionTypes.REPORTS_LIST_FILTERED:
      return {
        ...state,
        rows: action.payload!.rows,
        loading: false,
      }
    case ReportsListActionTypes.REPORTS_LIST_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      }
    case ReportsListActionTypes.REPORTS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        rows: action.payload!.rows,
        loading: false,
        count: action.payload!.count,
      }
    case ReportsListActionTypes.REPORTS_LIST_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        rows: []
      }
    case ReportsListActionTypes.REPORTS_LIST_DELETE_STARTED:
      return {
        ...state,
        loading: true
      }
    case ReportsListActionTypes.REPORTS_LIST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      }
    case ReportsListActionTypes.REPORTS_LIST_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      }
    case ReportsListActionTypes.REPORTS_LIST_OPEN_CONFIRM:
      return {
        ...state,
        loading: false,
        modalOpen: true,
        idToDelete: action.payload.id,
      }
    case ReportsListActionTypes.REPORTS_LIST_CLOSE_CONFIRM:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      }
    default:
      return state;
  }
}
