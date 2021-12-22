import ReactDOM from 'react-dom';
import { AnyAction } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import { store } from './store';
import config from 'config';
import App from 'App';
import { doInit } from 'store/actions/authActions';

axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common['Content-Type'] = "application/json";
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

store.dispatch((doInit() as any) as AnyAction);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root'),
);

