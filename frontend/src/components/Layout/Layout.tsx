import React from 'react';
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// @ts-ignore
import Hammer from 'rc-hammerjs';
import Header from '../Header';
import Sidebar from '../Sidebar';
import BreadcrumbHistory from '../BreadcrumbHistory';
import { openSidebar, closeSidebar } from 'store/actions/navigationActions';
import s from './Layout.module.scss';

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';
import UsersViewPage from 'pages/CRUD/Users/page/UsersViewPage';

import ReportsFormPage from 'pages/CRUD/Reports/form/ReportsFormPage';
import ReportsTablePage from 'pages/CRUD/Reports/table/ReportsTablePage';
import ReportsViewPage from 'pages/CRUD/Reports/page/ReportsViewPage';

import AdvertismentsFormPage from 'pages/CRUD/Advertisments/form/AdvertismentsFormPage';
import AdvertismentsTablePage from 'pages/CRUD/Advertisments/table/AdvertismentsTablePage';
import AdvertismentsViewPage from 'pages/CRUD/Advertisments/page/AdvertismentsViewPage';

import FacesFormPage from 'pages/CRUD/Faces/form/FacesFormPage';
import FacesTablePage from 'pages/CRUD/Faces/table/FacesTablePage';
import FacesViewPage from 'pages/CRUD/Faces/page/FacesViewPage';

import ChangePasswordFormPage from 'pages/CRUD/ChangePassword/ChangePasswordFormPage';
import Dashboard from '../../pages/dashboard';
import { useTypedSelector } from "hooks/useTypedSelector";

const Layout = () => {
  const sidebarOpened = useTypedSelector((store) => store.navigation.sidebarOpened);
  const sidebarPosition = useTypedSelector((store) => store.navigation.sidebarPosition);
  const sidebarVisibility = useTypedSelector((store) => store.navigation.sidebarVisibility);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleSwipe = (e: any) => {
    if ('ontouchstart' in window) {
      if (e.direction === 4) {
        dispatch(openSidebar());
        return;
      }
      if (e.direction === 2 && sidebarOpened) {
        dispatch(closeSidebar());
        return;
      }
    }
  };

    return (
      <div
        className={[s.root, 'sidebar-' + sidebarPosition, 'sidebar-' + sidebarVisibility].join(' ')}
      >
        <div className={s.wrap}>
          <Header />
          <Sidebar />
          <Hammer onSwipe={handleSwipe}>
            <main className={s.content}>
            <BreadcrumbHistory url={location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route path={"/app/dashboard"} exact component={Dashboard} />
                    <Route path={"/app/profile"} exact component={UsersFormPage} />
                    <Route path={"/app/password"} exact component={ChangePasswordFormPage} />

                    <Route path={"/admin/users"} exact component={UsersTablePage} />
                    <Route path={"/admin/users/new"} exact component={UsersFormPage} />
                    <Route path={"/admin/users/:id/edit"} exact component={UsersFormPage} />
                    <Route path={"/admin/users/:id"} exact component={UsersViewPage} />

                    <Route path={"/admin/reports"} exact component={ReportsTablePage} />
                    <Route path={"/admin/reports/new"} exact component={ReportsFormPage} />
                    <Route path={"/admin/reports/:id/edit"} exact component={ReportsFormPage} />
                    <Route path={"/admin/reports/:id"} exact component={ReportsViewPage} />

                    <Route path={"/admin/advertisments"} exact component={AdvertismentsTablePage} />
                    <Route path={"/admin/advertisments/new"} exact component={AdvertismentsFormPage} />
                    <Route path={"/admin/advertisments/:id/edit"} exact component={AdvertismentsFormPage} />
                    <Route path={"/admin/advertisments/:id"} exact component={AdvertismentsViewPage} />

                    <Route path={"/admin/faces"} exact component={FacesTablePage} />
                    <Route path={"/admin/faces/new"} exact component={FacesFormPage} />
                    <Route path={"/admin/faces/:id/edit"} exact component={FacesFormPage} />
                    <Route path={"/admin/faces/:id"} exact component={FacesViewPage} />

                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}>
                Facial Recognition Recommendation System - 
                made by <a href="https://github.com/terzisnikos">Nikos Terzis  </a>
                 <i className="lab la-github"></i>
              </footer>
            </main>
          </Hammer>
        </div>
      </div>
    );
}

export default Layout;
