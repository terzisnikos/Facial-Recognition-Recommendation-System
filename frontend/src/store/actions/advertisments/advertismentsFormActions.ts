import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'store/actions/authActions';
import { toast } from 'react-toastify';
import { AdvertismentsFormAction, AdvertismentsFormActionTypes } from "types/redux/advertisments/advertismentsForm";
import { Dispatch } from "redux";

const actions = {
  doNew: () => {
    return {
      type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_RESET,
    };
  },

  doFind: (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_FIND_STARTED,
      });

      axios.get(`/advertisments/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_FIND_SUCCESS,
          payload: record,
        });
      })
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_FIND_ERROR,
      });

      dispatch(push('/admin/advertisments'));
    }
  },

  doCreate: (values: any) => async (dispatch: Dispatch<AdvertismentsFormAction | Function | any>) => {
    try {
      dispatch({
        type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_CREATE_STARTED,
      });

      axios.post('/advertisments', { data: values }).then(res => {
        dispatch({
          type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_CREATE_SUCCESS,
        });

        toast.success('Advertisments created');
        dispatch(push('/admin/advertisments'));
      })
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_CREATE_ERROR,
      });
    }
  },

  doUpdate: (id: string, values: any, isProfile: boolean) => async (
    dispatch: Dispatch<AdvertismentsFormAction | Function | any>,
  ) => {
    try {
      dispatch({
        type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_UPDATE_STARTED,
      });

      await axios.put(`/advertisments/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_UPDATE_SUCCESS,
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Advertisments updated');
        dispatch(push('/admin/advertisments'));
      }
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: AdvertismentsFormActionTypes.ADVERTISMENTS_FORM_UPDATE_ERROR,
      });
    }
  }

};

export default actions;

