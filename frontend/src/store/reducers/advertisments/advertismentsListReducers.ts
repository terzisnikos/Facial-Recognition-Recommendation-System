import {
  AdvertismentsListState,
  AdvertismentsListAction,
  AdvertismentsListActionTypes
} from "types/redux/advertisments/advertismentsList";

const initialData: AdvertismentsListState = {
  rows: [],
  loading: false,
  count: 0,
  modalOpen: false,
  idToDelete: null,
};

export default (state = initialData, action: AdvertismentsListAction): AdvertismentsListState => {
  switch (action.type) {
    case AdvertismentsListActionTypes.ADVERTISMENTS_LIST_FILTERED:
      return {
        ...state,
        rows: action.payload!.rows,
        loading: false,
      }
    case AdvertismentsListActionTypes.ADVERTISMENTS_LIST_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      }
    case AdvertismentsListActionTypes.ADVERTISMENTS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        rows: action.payload!.rows,
        loading: false,
        count: action.payload!.count,
      }
    case AdvertismentsListActionTypes.ADVERTISMENTS_LIST_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        rows: []
      }
    case AdvertismentsListActionTypes.ADVERTISMENTS_LIST_DELETE_STARTED:
      return {
        ...state,
        loading: true
      }
    case AdvertismentsListActionTypes.ADVERTISMENTS_LIST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      }
    case AdvertismentsListActionTypes.ADVERTISMENTS_LIST_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      }
    case AdvertismentsListActionTypes.ADVERTISMENTS_LIST_OPEN_CONFIRM:
      return {
        ...state,
        loading: false,
        modalOpen: true,
        idToDelete: action.payload.id,
      }
    case AdvertismentsListActionTypes.ADVERTISMENTS_LIST_CLOSE_CONFIRM:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      }
    default:
      return state;
  }
}
