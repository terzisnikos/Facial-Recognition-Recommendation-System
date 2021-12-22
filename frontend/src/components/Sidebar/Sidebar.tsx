import React, { useEffect, useRef } from 'react';
import { useDispatch} from 'react-redux';
import { useTypedSelector } from "hooks/useTypedSelector";
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup/LinksGroup';
import { changeActiveSidebarItem } from 'store/actions/navigationActions';

import classnames from "classnames";

import s2 from './LinksGroup/LinksGroup.module.scss';

const Sidebar = () => {

  const sidebarOpened = useTypedSelector(store => store.navigation.sidebarOpened);
  const activeItem = useTypedSelector(store => store.navigation.activeItem);
  const currentUser = useTypedSelector(store => store.auth.currentUser);

  const dispatch = useDispatch();

  const navEl: any = useRef(null);

  useEffect(() => {
    if (navEl) {
        navEl.current.addEventListener('transitionend', () => {
          if (sidebarOpened) {
            navEl.current.classList.add(s.sidebarOpen)
          }
        }, false);
        if (sidebarOpened) {
          navEl.current.style.height = `${navEl.current.scrollHeight}px`;
        } else {
          navEl.current.classList.remove(s.sidebarOpen);
          navEl.current.style.height = '';
//          setTimeout(() => {
//            navEl.current.style.height = '';
//          }, 0)
        }
    }
  }, [sidebarOpened])

    return (
        <nav ref={navEl} className={s.root} >
          <header className={s.logo}>
            <a href="/"><span className="fw-bold">Facial Recognition<br/>Recommendation<br/>System</span></a>
          </header>
          <ul className={s.nav}>

          <LinksGroup
            onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={activeItem}
            header="Dashboard"
            link="/app/dashboard"
            isHeader
            iconName="la-home"
          />

          {currentUser && currentUser.role === 'admin' &&
            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Users"
              link="/admin/users"
              isHeader
              iconName="la-users"
            />
          }

          {currentUser && currentUser.role === 'admin' &&
            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Reports"
              link="/admin/reports"
              isHeader
              iconName="la-file-alt"
            />
          }

          {currentUser && currentUser.role === 'admin' &&
            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Advertisments"
              link="/admin/advertisments"
              isHeader
              iconName="la-photo-video"
            />
          }

          {currentUser && currentUser.role === 'admin' &&
            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Faces"
              link="/admin/faces"
              isHeader
              iconName="la-eye"
            />
          }

            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="My Profile"
              link="/app/profile"
              isHeader
              iconName="la-user"
            />

            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Change Password"
              link="/app/password"
              isHeader
              iconName="la-key"
            />

          <LinksGroup
            onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={activeItem}
            header="Documentation"
            link="/documentation"
            isHeader
            iconName="la-book"
            index="documentation"
            labelColor="success"
            target="_blank"
          />

          <li className={classnames('link-wrapper', s2.headerLink)}>
            <a
              target={"_blank"}
              href={process.env.NODE_ENV === 'production' ? window.location.origin + '/api-docs' : 'http://localhost:8080/api-docs'}
            >
              <span className={classnames('icon', s2.icon)}>
                <i className={`la la-book`} />
              </span>
              API docs
            </a>
          </li>
        </ul>
      </nav >
    );
}

export default Sidebar;
