import React from 'react';
import Login from 'pages/auth/login';
import { logoutUser } from 'store/actions/authActions';
import { Redirect, Route, RouteProps } from 'react-router';
import { AnyAction, Dispatch } from 'redux';

type Routes = {
  currentUser?: {
    [name: string]: string
  };
  dispatch: Dispatch;
}

export const AdminRoute = ({currentUser, dispatch, component, ...rest}: RouteProps & Routes) => {
  if (!currentUser || currentUser.role !== 'admin' || !Login.isAuthenticated()) {
    return (<Redirect to="/app/dashboard"/>)
  } else if (currentUser && currentUser.role === 'admin') {
    return (
      <Route {...rest} render={props => (React.createElement((component as unknown) as string, props))}/>
    );
  } else {
    return null
  }
};

export const UserRoute = ({dispatch, component, ...rest}: RouteProps & Routes) => {
  if (!Login.isAuthenticated()) {
    dispatch(logoutUser());
    return (<Redirect to="/starter"/>)
  } else {
    return ( // eslint-disable-line
      <Route {...rest} render={props => (React.createElement((component as unknown) as string, props))}/>
    );
  }
};

export const AuthRoute = ({dispatch, component, ...rest}: RouteProps & Routes) => {
  const {from} = rest.location!.state as AnyAction & {from: string} || {from: {pathname: '/app'}};

  if (Login.isAuthenticated()) {
    return (
      <Redirect to={from}/>
    );
  } else {
    return (
      <Route {...rest} render={props => (React.createElement((component as unknown) as string, props))}/>
    );
  }
};
