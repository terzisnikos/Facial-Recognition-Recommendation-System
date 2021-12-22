import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'store/actions/authActions';
import { toast } from 'react-toastify';
import { FacesFormAction, FacesFormActionTypes } from "types/redux/faces/facesForm";
import { Dispatch } from "redux";

const actions = {
  doNew: () => {
    return {
      type: FacesFormActionTypes.FACES_FORM_RESET,
    };
  },

  doFind: (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: FacesFormActionTypes.FACES_FORM_FIND_STARTED,
      });

      axios.get(`/faces/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: FacesFormActionTypes.FACES_FORM_FIND_SUCCESS,
          payload: record,
        });
      })
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: FacesFormActionTypes.FACES_FORM_FIND_ERROR,
      });

      dispatch(push('/admin/faces'));
    }
  },

  doCreate: (values: any) => async (dispatch: Dispatch<FacesFormAction | Function | any>) => {
    try {
      dispatch({
        type: FacesFormActionTypes.FACES_FORM_CREATE_STARTED,
      });

      axios.post('/faces', { data: values }).then(res => {
        dispatch({
          type: FacesFormActionTypes.FACES_FORM_CREATE_SUCCESS,
        });

        toast.success('Faces created');
        dispatch(push('/admin/faces'));
      })
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: FacesFormActionTypes.FACES_FORM_CREATE_ERROR,
      });
    }
  },

  doUpdate: (id: string, values: any, isProfile: boolean) => async (
    dispatch: Dispatch<FacesFormAction | Function | any>,
  ) => {
    try {
      dispatch({
        type: FacesFormActionTypes.FACES_FORM_UPDATE_STARTED,
      });

      await axios.put(`/faces/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: FacesFormActionTypes.FACES_FORM_UPDATE_SUCCESS,
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Faces updated');
        dispatch(push('/admin/faces'));
      }
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: FacesFormActionTypes.FACES_FORM_UPDATE_ERROR,
      });
    }
  }

};

export default actions;

