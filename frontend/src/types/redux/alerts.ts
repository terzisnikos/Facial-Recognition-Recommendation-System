export interface AlertState {
  alertsList: any,
}

export enum AlertsActionTypes {
  DISMISS_ALERT = "DISMISS_ALERT",
}

interface DismissAlert {
  type: AlertsActionTypes.DISMISS_ALERT;
  payload: number;
}

export type AlertsAction = DismissAlert;
