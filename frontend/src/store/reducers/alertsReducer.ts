import {
  AlertsAction,
  AlertsActionTypes,
  AlertState
} from "types/redux/alerts";

const defaultState = {
  alertsList: [
    {
      id: 0,
      title: 'Sales Report',
      value: 16,
      color: 'primary',
      footer: 'Calculating x-axis bias... 65%',
    },
    {
      id: 1,
      title: 'Personal Responsibility',
      value: 23,
      color: 'danger',
      footer: 'Provide required notes',
    },
  ],
};

export default function alertsReducer(state = defaultState, action: AlertsAction): AlertState  {
  let index;
  switch (action.type) {
    case AlertsActionTypes.DISMISS_ALERT:
      state.alertsList.forEach((alert, alertIndex) => {
        if (alert.id === action.payload) {
          index = alertIndex;
        }
      });
      return Object.assign({}, state, {
        alertsList: [
          ...state.alertsList.slice(0, index),
        ],
      });
    default:
      return state;
  }
}
