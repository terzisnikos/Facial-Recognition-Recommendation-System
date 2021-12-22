import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { store } from 'store/index';

const DEFAULT_ERROR_MESSAGE = 'Error';

function selectErrorMessage(error: {[rest: string]: any}) {
  if (error && error.response && error.response.data) {
    const data = error.response.data;

    if (data.error && data.error.message) {
      return data.error.message;
    }

    return String(data);
  }

  return error.message || DEFAULT_ERROR_MESSAGE;
}

function selectErrorCode(error: {[rest: string]: any}) {
  if (error && error.response && error.response.status) {
    return error.response.status;
  }

  return 500;
}

export default class Errors {
  static handle(error: string) {
    if (process.env.NODE_ENV !== 'test') {
      // @ts-ignore
      console.error(selectErrorMessage(error));
      console.error(error);
    }

    // @ts-ignore
    if (selectErrorCode(error) === 403) {
      // @ts-ignore
      store.dispatch(push('/403'));
      return;
    }

    // @ts-ignore
    if (selectErrorCode(error) === 400) {
      // @ts-ignore
      toast.error(selectErrorMessage(error));
      return;
    }
    // @ts-ignore
    store.dispatch(push('/500'));
  }

  static errorCode(error: string) {
    // @ts-ignore
    return selectErrorCode(error);
  }

  static selectMessage(error: string) {
    // @ts-ignore
    return selectErrorMessage(error);
  }

  static showMessage(error: string) {
    // @ts-ignore
    toast.error(selectErrorMessage(error));
  }
}
