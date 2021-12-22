import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { UsersFormAction, UsersFormActionTypes } from "types/redux/users/usersForm";
import { Dispatch } from "redux";

const actions = {
  doChangePassword: ({newPassword, currentPassword}: any) => async (
    dispatch: Dispatch<UsersFormAction | Function | any>
  ) => {
    try {
      dispatch({
        type: UsersFormActionTypes.USERS_FORM_CREATE_STARTED,
      });
      await axios.put('/auth/password-update', {newPassword, currentPassword})
      dispatch({
        type: UsersFormActionTypes.USERS_FORM_UPDATE_SUCCESS,
      });

      toast.success('Password has been updated');
      dispatch(push('/app/dashboard'));

    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: UsersFormActionTypes.USERS_FORM_CREATE_ERROR,
      });
    }
  },
};

export default actions;

