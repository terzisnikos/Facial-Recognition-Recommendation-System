import { AlertsActionTypes } from "types/redux/alerts";

export function dismissAlert(id: string) {
  return {
    type: AlertsActionTypes.DISMISS_ALERT,
    id,
  };
}
