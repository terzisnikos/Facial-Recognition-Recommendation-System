import Errors from 'components/FormItems/error/errors';
import axios from 'axios';
import { ReportsListActionTypes, ReportsListAction } from "types/redux/reports/reportsList";
import { Dispatch } from "redux";

async function list(filter?: any) {
  const response = await axios.get(
    `/reports?page=${filter.page}&limit=${filter.limit}&reports=${filter.reports ? filter.reports : ''}`,
  );
  return response.data;
}

async function filterReports(request: any, filter: any) {
  const response = await axios.get(`/reports?page=${filter.page}&limit=${filter.limit}${request}`);
  return response.data;
}

const actions = {

  doFilter: (request: any, filter: any) => async (
    dispatch: Dispatch
  ) => {
    try {

      const response = await filterReports(request, filter);

      dispatch({
        type: ReportsListActionTypes.REPORTS_LIST_FILTERED,
        payload: {
          rows: response.rows,
        },
      });
    } catch (error: any) {
      Errors.handle(error);
      dispatch({
        type: ReportsListActionTypes.REPORTS_LIST_FETCH_ERROR,
      })
    }
  },

  doFetch: (filter: any, keepPagination = false) => async (
    dispatch: Dispatch,
  ) => {
    try {
      dispatch({
        type: ReportsListActionTypes.REPORTS_LIST_FETCH_STARTED,
        payload: { filter, keepPagination },
      });

      const response = await list(filter);

      dispatch({
        type: ReportsListActionTypes.REPORTS_LIST_FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: ReportsListActionTypes.REPORTS_LIST_FETCH_ERROR,
      });
    }
  },

  doDelete: (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ReportsListActionTypes.REPORTS_LIST_DELETE_STARTED,
      });

      await axios.delete(`/reports/${id}`)

      dispatch({
        type: ReportsListActionTypes.REPORTS_LIST_DELETE_SUCCESS,
      });

      const response = await list();
      dispatch({
        type: ReportsListActionTypes.REPORTS_LIST_FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });

    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: ReportsListActionTypes.REPORTS_LIST_DELETE_ERROR,
      });
    }
  },
  doOpenConfirm: (id: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: ReportsListActionTypes.REPORTS_LIST_OPEN_CONFIRM,
      payload: {
        id: id
      },
    });
  },
  doCloseConfirm: () => async (dispatch: Dispatch) => {
    dispatch({
      type: ReportsListActionTypes.REPORTS_LIST_CLOSE_CONFIRM,
    });
  },
};


export default actions;
