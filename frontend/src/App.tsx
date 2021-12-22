import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, Router } from 'react-router';
import { AdminRoute, UserRoute, AuthRoute } from 'routes/RouteComponents';
import { ConnectedRouter } from 'connected-react-router';
import { getHistory } from 'store';
import { useTypedSelector } from "hooks/useTypedSelector";

import 'styles/theme.scss';

import Starter from "pages/starter";
import ErrorPage from 'pages/error';
import LayoutComponent from 'components/Layout';
import DocumentationLayoutComponent from 'documentation/DocumentationLayout';
import Login from 'pages/auth/login';
import Verify from 'pages/auth/verify';
import Register from 'pages/auth/register';
import Reset from 'pages/auth/reset';
import Forgot from 'pages/auth/forgot';

const App = () => {
  const currentUser = useTypedSelector((store) => store.auth.currentUser);
  const loadingInit = useTypedSelector((store) => store.auth.loadingInit);

  const dispatch = useDispatch();

  if (loadingInit) {
    return <div/>;
  }

  return (
    <div>
      <ConnectedRouter history={getHistory()}>
        <Router history={getHistory()}>
          <Switch>
            <Route
              path="/documentation"
              exact
              render={() => <Redirect to="/documentation/getting-started/overview"/>}
            />
            <Route path="/documentation" component={DocumentationLayoutComponent}/>
            <Route path="/" exact render={() => <Redirect to="/app"/>}/>
            <Route path="/app" exact render={() => <Redirect to="/app/dashboard"/>}/>
            <UserRoute path="/app" dispatch={dispatch} component={LayoutComponent}/>
            <AdminRoute
              path="/admin"
              currentUser={currentUser}
              dispatch={dispatch}
              component={LayoutComponent}
            />
            <AuthRoute dispatch={dispatch} path="/starter" exact component={Starter}/>
            <AuthRoute dispatch={dispatch} path="/register" exact component={Register}/>
            <AuthRoute dispatch={dispatch} path="/login" exact component={Login}/>
            <AuthRoute dispatch={dispatch} path="/verify-email" exact component={Verify}/>
            <AuthRoute dispatch={dispatch} path="/password-reset" exact component={Reset}/>
            <AuthRoute dispatch={dispatch} path="/forgot" exact component={Forgot}/>
            <Route path="/error" exact component={ErrorPage}/>
            <Redirect from="*" to="/app/dashboard"/>
          </Switch>
        </Router>
      </ConnectedRouter>
    </div>
  );
}

export default React.memo(App);
