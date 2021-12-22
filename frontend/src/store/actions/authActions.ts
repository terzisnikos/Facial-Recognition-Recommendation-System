import axios from 'axios';
import config from '../../config';
import jwt from "jsonwebtoken";
import { toast } from 'react-toastify';
import {push} from 'connected-react-router';
import Errors from 'components/FormItems/error/errors';
import {AnyAction, Dispatch} from "redux";
import { AuthAction, AuthActionTypes } from "types/redux/auth";

async function findMe() {
  const response = await axios.get('/auth/me');
  return response.data;
}

export function authError(payload: string) {
  return {
    type: AuthActionTypes.AUTH_FAILURE,
    payload,
  };
}

export function doInit() {
  return async (dispatch: Dispatch<AuthAction | Function | any>) => {
    try {
      let currentUser = null;
      let token = localStorage.getItem('token');
      if (token) {
        currentUser = await findMe();
      }
      dispatch({
        type: AuthActionTypes.AUTH_INIT_SUCCESS,
        payload: {
          currentUser,
        },
      });
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: AuthActionTypes.AUTH_INIT_ERROR,
        payload: error,
      });
    }
  }
}

export function logoutUser(): AnyAction & any {
  return (dispatch: Dispatch) => {
    dispatch({
      type: AuthActionTypes.LOGOUT_REQUEST,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    axios.defaults.headers.common['Authorization'] = "";
    dispatch({
      type: AuthActionTypes.LOGOUT_SUCCESS,
    });
    dispatch(push('/login'));
  };
}

export function receiveToken(token: any) {
  return (dispatch: Dispatch) => {
    let user = jwt.decode(token);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS
    });
    dispatch(push('/app'));
  }
}

export function loginUser(creds: any) {
  return (dispatch: Dispatch<AuthAction | Function | any>) => {
    dispatch({
      type: AuthActionTypes.LOGIN_REQUEST,
    });
    if (creds.social) {
      window.location.href = config.baseURLApi + "/auth/signin/" + creds.social;
    } else if (creds.email.length > 0 && creds.password.length > 0) {
      axios.post("/auth/signin/local", creds).then(res => {
        const token = res.data;
        dispatch(receiveToken(token));
        dispatch(doInit());
        dispatch(push('/app'));
      })
    } else {
      dispatch(authError('Something was wrong. Try again'));
    }
  };
}

export function verifyEmail(token: string) {
  return(dispatch: Dispatch<AuthAction> | Function | any) => {
    axios.put("/auth/verify-email", {token}).then(verified => {
      if (verified) {
        toast.success("Your email was verified");
      }
    }).catch(err => {
      toast.error(err.response.data);
    }).finally(() => {
      dispatch(push('/login'));
    })
  }
}

export function resetPassword(token: string, password: string) {
  return (dispatch: Dispatch<AuthAction> | Function | any) => {
    dispatch({
      type: AuthActionTypes.RESET_REQUEST,
    });
    axios.put("/auth/password-reset", {token, password}).then(res => {
      dispatch({
        type: AuthActionTypes.RESET_SUCCESS,
      });
      toast.success("Password has been updated");
      dispatch(push('/login'));
    }).catch(err => {
      dispatch(authError(err.response.data));
    })
  }
}

export function sendPasswordResetEmail(email: string) {
  return (dispatch: Dispatch<AuthAction> | Function | any) => {
    dispatch({
      type: AuthActionTypes.PASSWORD_RESET_EMAIL_REQUEST,
    });
    axios.post("/auth/send-password-reset-email", {email}).then(res => {
      dispatch({
        type: AuthActionTypes.PASSWORD_RESET_EMAIL_SUCCESS,
      });
      toast.success("Email with resetting instructions has been sent");
      dispatch(push('/login'));
    }).catch(err => {
      dispatch(authError(err.response.data));
    })
  }
}

export function registerUser(creds: any) {
  return (dispatch: Dispatch<AuthAction> | Function | any) => {
    dispatch({
      type: AuthActionTypes.REGISTER_REQUEST,
    });

    if (creds.email.length > 0 && creds.password.length > 0) {
      axios.post("/auth/signup", creds).then(res => {
        dispatch({
          type: AuthActionTypes.REGISTER_SUCCESS
        });
        toast.success("You've been registered successfully. Please check your email for verification link");
        dispatch(push('/login'));
      }).catch(err => {
        dispatch(authError(err.response.data));
      })

    } else {
      dispatch(authError('Something was wrong. Try again'));
    }
  };
}
