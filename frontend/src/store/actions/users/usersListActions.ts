import Errors from 'components/FormItems/error/errors';
import axios from 'axios';
import { UsersListActionTypes, UsersListAction } from "types/redux/users/usersList";
import { Dispatch } from "redux";

async function list(filter?: any) {
  const response = await axios.get(
    `/users?page=${filter.page}&limit=${filter.limit}&users=${filter.users ? filter.users : ''}`,
  );
  return response.data;
}

async function filterUsers(request: any, filter: any) {
  const response = await axios.get(`/users?page=${filter.page}&limit=${filter.limit}${request}`);
  return response.data;
}

const actions = {

  doFilter: (request: any, filter: any) => async (
    dispatch: Dispatch
  ) => {
    try {

      const response = await filterUsers(request, filter);

      dispatch({
        type: UsersListActionTypes.USERS_LIST_FILTERED,
        payload: {
          rows: response.rows,
        },
      });
    } catch (error: any) {
      Errors.handle(error);
      dispatch({
        type: UsersListActionTypes.USERS_LIST_FETCH_ERROR,
      })
    }
  },

  doFetch: (filter: any, keepPagination = false) => async (
    dispatch: Dispatch,
  ) => {
    try {
      dispatch({
        type: UsersListActionTypes.USERS_LIST_FETCH_STARTED,
        payload: { filter, keepPagination },
      });

      const response = await list(filter);

      dispatch({
        type: UsersListActionTypes.USERS_LIST_FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: UsersListActionTypes.USERS_LIST_FETCH_ERROR,
      });
    }
  },

  doDelete: (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: UsersListActionTypes.USERS_LIST_DELETE_STARTED,
      });

      await axios.delete(`/users/${id}`)

      dispatch({
        type: UsersListActionTypes.USERS_LIST_DELETE_SUCCESS,
      });

      const response = await list();
      dispatch({
        type: UsersListActionTypes.USERS_LIST_FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });

    } catch (error: any) {
      Errors.handle(error);

      dispatch({
        type: UsersListActionTypes.USERS_LIST_DELETE_ERROR,
      });
    }
  },
  doOpenConfirm: (id: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: UsersListActionTypes.USERS_LIST_OPEN_CONFIRM,
      payload: {
        id: id
      },
    });
  },
  doCloseConfirm: () => async (dispatch: Dispatch) => {
    dispatch({
      type: UsersListActionTypes.USERS_LIST_CLOSE_CONFIRM,
    });
  },
};


export default actions;
