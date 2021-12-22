import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'store/actions/authActions';
import { toast } from 'react-toastify';
import { ReportsFormAction, ReportsFormActionTypes } from "types/redux/reports/reportsForm";
import { Dispatch } from "redux";

const actions = {
  doNew: () => {
    return {
      type: ReportsFormActionTypes.REPORTS_FORM_RESET,
    };
  },

  doFind: (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ReportsFormActionTypes.REPORTS_FORM_FIND_STARTED,
      });

      axios.get(`/reports/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: ReportsFormActionTypes.REPORTS_FORM_FIND_SUCCESS,
          payload: record,
        });
      })
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: ReportsFormActionTypes.REPORTS_FORM_FIND_ERROR,
      });

      dispatch(push('/admin/reports'));
    }
  },

  doCreate: (values: any) => async (dispatch: Dispatch<ReportsFormAction | Function | any>) => {
    try {
      dispatch({
        type: ReportsFormActionTypes.REPORTS_FORM_CREATE_STARTED,
      });

      axios.post('/reports', { data: values }).then(res => {
        dispatch({
          type: ReportsFormActionTypes.REPORTS_FORM_CREATE_SUCCESS,
        });

        toast.success('Reports created');
        dispatch(push('/admin/reports'));
      })
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: ReportsFormActionTypes.REPORTS_FORM_CREATE_ERROR,
      });
    }
  },

  doUpdate: (id: string, values: any, isProfile: boolean) => async (
    dispatch: Dispatch<ReportsFormAction | Function | any>,
  ) => {
    try {
      dispatch({
        type: ReportsFormActionTypes.REPORTS_FORM_UPDATE_STARTED,
      });

      await axios.put(`/reports/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: ReportsFormActionTypes.REPORTS_FORM_UPDATE_SUCCESS,
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Reports updated');
        dispatch(push('/admin/reports'));
      }
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: ReportsFormActionTypes.REPORTS_FORM_UPDATE_ERROR,
      });
    }
  }

};

export default actions;

