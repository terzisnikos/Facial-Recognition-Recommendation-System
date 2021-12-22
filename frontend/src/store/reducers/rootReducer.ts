import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History} from "history";
import {store} from "../index";

import authReducer from "store/reducers/authReducer";
import alertsReducer from "store/reducers/alertsReducer";
import navigationReducer from "store/reducers/navigationReducer";
import layoutReducer from "store/reducers/layoutReducer";

import users from 'store/reducers/users/usersReducers';

import reports from 'store/reducers/reports/reportsReducers';

import advertisments from 'store/reducers/advertisments/advertismentsReducers';

import faces from 'store/reducers/faces/facesReducers';

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    layout: layoutReducer,
    alerts: alertsReducer,
    auth: authReducer,
    navigation: navigationReducer,

    users,

    reports,

    advertisments,

    faces,

});

export type RootState = ReturnType<typeof store.getState>;
