import {
  FacesListState,
  FacesListAction,
  FacesListActionTypes
} from "types/redux/faces/facesList";

const initialData: FacesListState = {
  rows: [],
  loading: false,
  count: 0,
  modalOpen: false,
  idToDelete: null,
};

export default (state = initialData, action: FacesListAction): FacesListState => {
  switch (action.type) {
    case FacesListActionTypes.FACES_LIST_FILTERED:
      return {
        ...state,
        rows: action.payload!.rows,
        loading: false,
      }
    case FacesListActionTypes.FACES_LIST_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      }
    case FacesListActionTypes.FACES_LIST_FETCH_SUCCESS:
      return {
        ...state,
        rows: action.payload!.rows,
        loading: false,
        count: action.payload!.count,
      }
    case FacesListActionTypes.FACES_LIST_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        rows: []
      }
    case FacesListActionTypes.FACES_LIST_DELETE_STARTED:
      return {
        ...state,
        loading: true
      }
    case FacesListActionTypes.FACES_LIST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      }
    case FacesListActionTypes.FACES_LIST_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      }
    case FacesListActionTypes.FACES_LIST_OPEN_CONFIRM:
      return {
        ...state,
        loading: false,
        modalOpen: true,
        idToDelete: action.payload.id,
      }
    case FacesListActionTypes.FACES_LIST_CLOSE_CONFIRM:
      return {
        ...state,
        loading: false,
        modalOpen: false,
      }
    default:
      return state;
  }
}
