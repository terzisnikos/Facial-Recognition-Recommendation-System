import list from 'store/reducers/faces/facesListReducers';
import form from 'store/reducers/faces/facesFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
