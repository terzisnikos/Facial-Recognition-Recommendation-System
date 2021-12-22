import { applyMiddleware, createStore, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers/rootReducer";

export const history = createBrowserHistory();

export function getHistory() {
  return history;
}

export const store = createStore(
  rootReducer(history),
  compose(applyMiddleware(routerMiddleware(history), thunk))
)
