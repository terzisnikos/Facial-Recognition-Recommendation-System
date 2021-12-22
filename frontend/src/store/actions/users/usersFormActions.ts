import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'store/actions/authActions';
import { toast } from 'react-toastify';
import { UsersFormAction, UsersFormActionTypes } from "types/redux/users/usersForm";
import { Dispatch } from "redux";

const actions = {
  doNew: () => {
    return {
      type: UsersFormActionTypes.USERS_FORM_RESET,
    };
  },

  doFind: (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: UsersFormActionTypes.USERS_FORM_FIND_STARTED,
      });

      axios.get(`/users/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: UsersFormActionTypes.USERS_FORM_FIND_SUCCESS,
          payload: record,
        });
      })
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: UsersFormActionTypes.USERS_FORM_FIND_ERROR,
      });

      dispatch(push('/admin/users'));
    }
  },

  doCreate: (values: any) => async (dispatch: Dispatch<UsersFormAction | Function | any>) => {
    try {
      dispatch({
        type: UsersFormActionTypes.USERS_FORM_CREATE_STARTED,
      });

      axios.post('/users', { data: values }).then(res => {
        dispatch({
          type: UsersFormActionTypes.USERS_FORM_CREATE_SUCCESS,
        });

        toast.success('Users created');
        dispatch(push('/admin/users'));
      })
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: UsersFormActionTypes.USERS_FORM_CREATE_ERROR,
      });
    }
  },

  doUpdate: (id: string, values: any, isProfile: boolean) => async (
    dispatch: Dispatch<UsersFormAction | Function | any>,
  ) => {
    try {
      dispatch({
        type: UsersFormActionTypes.USERS_FORM_UPDATE_STARTED,
      });

      await axios.put(`/users/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: UsersFormActionTypes.USERS_FORM_UPDATE_SUCCESS,
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Users updated');
        dispatch(push('/admin/users'));
      }
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: UsersFormActionTypes.USERS_FORM_UPDATE_ERROR,
      });
    }
  }

};

export default actions;

