import list from 'store/reducers/reports/reportsListReducers';
import form from 'store/reducers/reports/reportsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
