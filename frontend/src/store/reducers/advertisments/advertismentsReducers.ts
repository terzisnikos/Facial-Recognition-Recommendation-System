import list from 'store/reducers/advertisments/advertismentsListReducers';
import form from 'store/reducers/advertisments/advertismentsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
