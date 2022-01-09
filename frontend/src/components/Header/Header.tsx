import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  UncontrolledAlert,
  Dropdown,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  ButtonGroup,
  Button,
  Form,
  FormGroup,
} from 'reactstrap';
import Notifications from '../Notifications';
import { logoutUser } from 'store/actions/authActions';
import { openSidebar, closeSidebar, changeSidebarPosition, changeSidebarVisibility } from 'store/actions/navigationActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import sender1 from '../../images/1.png';
import sender2 from '../../images/2.png';
import sender3 from '../../images/3.png';

import adminDefault from '../../images/chat/chat2.png';

import s from './Header.module.scss';

const Header = () => {

  const dispatch = useDispatch();
  const sidebarOpened = useTypedSelector((store) => store.navigation.sidebarOpened);
  const sidebarStatic = useTypedSelector((store) => store.navigation.sidebarStatic);
  const sidebarVisibility = useTypedSelector((store) => store.navigation.sidebarVisibility);
  const sidebarPosition = useTypedSelector((store) => store.navigation.sidebarPosition);
  const currentUser = useTypedSelector((store) => store.auth.currentUser);

  const [visible, setVisible] = useState(true);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationsOpen((prevState) => !prevState);
  };

  const onDismiss = () => {
    setVisible(false);
  }

  const doLogout = () => {
    dispatch(logoutUser());
  }

  const toggleMessagesDropdown = () => {
    setMessagesOpen(prevState => !prevState);
  }

  const toggleSupportDropdown =() => {
    setSupportOpen(prevState => !prevState);
  }

  const toggleSettingsDropdown =() => {
    setSettingsOpen(prevState => !prevState);
  }

  const toggleSearchOpen = () => {
    setSearchOpen(prevState => !prevState);
  }

  const toggleSidebar = () => {
    sidebarOpened
      ? dispatch(closeSidebar())
      : dispatch(openSidebar())
  }

  const moveSidebar = (position: string) => {
    dispatch(changeSidebarPosition(position));
  }

  const toggleVisibilitySidebar = (visibility: string) => {
    dispatch(changeSidebarVisibility(visibility));
  }

  const user = currentUser;
  const avatar = user && user.avatar && user.avatar.length && user.avatar[0].publicUrl;
  const firstUserLetter = user && (user.firstName|| user.email)[0].toUpperCase();

  return (
    <Navbar className={`d-print-none`}>
      <div className={s.burger}>
        <NavLink onClick={toggleSidebar} className={`d-md-none ${s.navItem} text-white`} href="#">
          <i className="fa fa-bars" />
        </NavLink>
      </div>
      <div className={`d-print-none ${s.root}`}>

      {/* 
      <UncontrolledAlert
          className={`${s.alert} mr-3 d-lg-down-none animate__animated animate__bounceIn animate__delay-1s`}
        >
          <i className="fa fa-info-circle mr-1" /> Check out Light Blue{' '}
          <button className="btn-link" onClick={() => setSettingsOpen(true)}>
            <i className="fa fa-cog" />
          </button>{' '}
          on the right!
      </UncontrolledAlert> 
      */}

        <Collapse className={`${s.searchCollapse} ml-lg-0 mr-md-3`} isOpen={searchOpen}>
          <InputGroup className={`${s.navbarForm} ${searchFocused ? s.navbarFormFocused : ''}`}>
            <InputGroupAddon addonType="prepend" className={s.inputAddon}>
              <InputGroupText>
                <i className="fa fa-search" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              id="search-input-2"
              placeholder="Search..."
              className="input-transparent"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </InputGroup>
        </Collapse>
        <Form className="d-md-down-none mr-3 ml-3" inline>
          <FormGroup>
            <InputGroup className={`input-group-no-border ${s.searchForm}`}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className={s.inputGroupText}>
                  <i className="fa fa-search text-white" />
                </InputGroupText>
              </InputGroupAddon>
              <Input id="search-input" className="input-transparent" placeholder="Search" />
            </InputGroup>
          </FormGroup>
        </Form>
        <Nav className="ml-md-0">
          <Dropdown
            nav
            isOpen={notificationsOpen}
            toggle={toggleNotifications}
            id="basic-nav-dropdown"
            className={`${s.notificationsMenu}`}
          >
            <DropdownToggle nav caret style={{ color: '#c1c3cf', padding: 0 }}>
              <span className={`${s.avatar} rounded-circle float-left`}>
                {avatar ? (
                  <img
                    src={avatar}
                    alt="..."
                    title={user && (user.firstName || user.email)}
                  />
                ) : user && user.role === 'admin' ? (
                  <img
                    src={adminDefault}
                    alt="..."
                    title={user && (user.firstName || user.email)}
                  />
                ) : (
                  <span title={user && (user.firstName || user.email)}>{firstUserLetter}</span>
                )}
              </span>
              <span className={`small d-sm-down-none ${sidebarStatic ? s.adminEmail : ''}`}>
                {user ? user.firstName || user.email : 'Philip smith'}
              </span>
              <Badge className={`d-sm-down-none ${s.badge}`} color="primary">
                9
              </Badge>
            </DropdownToggle>
            <DropdownMenu
              right
              className={`${s.notificationsWrapper} py-0 animate__animated animate__faster animate__fadeInUp`}
            >
              <Notifications />
            </DropdownMenu>
          </Dropdown>
          <NavItem className="d-lg-none">
            <NavLink onClick={toggleSearchOpen} className={s.navItem} href="#">
              <i className="las la-search text-white"/>
            </NavLink>
          </NavItem>
          <Dropdown nav isOpen={messagesOpen} toggle={toggleMessagesDropdown}>
            <DropdownToggle nav className={`d-sm-down-none ${s.navItem} text-white`}>
              <i className="las la-comment-alt"/>
            </DropdownToggle>
            <DropdownMenu right className={`${s.dropdownMenu} ${s.messages}`}>
              <DropdownItem>
                <img className={s.image} src={sender1} alt="" />
                <div className={s.details}>
                  <div>Jane Hew</div>
                  <div className={s.text}>Hey, John! How is it going? ...</div>
                </div>
              </DropdownItem>
              <DropdownItem>
                <img className={s.image} src={sender2} alt="" />
                <div className={s.details}>
                  <div>Alies Rumiancaŭ</div>
                  <div className={s.text}>I will definitely buy this template</div>
                </div>
              </DropdownItem>
              <DropdownItem>
                <img className={s.image} src={sender3} alt="" />
                <div className={s.details}>
                  <div>Michał Rumiancaŭ</div>
                  <div className={s.text}>Is it really Lore ipsum? Lore ...</div>
                </div>
              </DropdownItem>
              <DropdownItem>
                {/* eslint-disable-next-line */}
                <a href="#" className="text-white">
                  See all messages <i className="fa fa-arrow-right" />
                </a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem className={`${s.divider} d-none d-sm-block text-white`} />
          <Dropdown
            className="d-none d-sm-block"
            nav
            isOpen={settingsOpen}
            toggle={toggleSettingsDropdown}
          >
            <DropdownToggle nav className={`${s.navItem} text-white`}>
              <i className="las la-cog"/>
            </DropdownToggle>
            <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
              <h6>Sidebar on the</h6>
              <ButtonGroup size="sm">
                <Button
                  color="dark"
                  onClick={() => moveSidebar('left')}
                  className={sidebarPosition === 'left' ? 'active' : ''}
                >
                  Left
                </Button>
                <Button
                  color="dark"
                  onClick={() => moveSidebar('right')}
                  className={sidebarPosition === 'right' ? 'active' : ''}
                >
                  Right
                </Button>
              </ButtonGroup>
              <h6 className="mt-2">Sidebar</h6>
              <ButtonGroup size="sm">
                <Button
                  color="dark"
                  onClick={() => toggleVisibilitySidebar('show')}
                  className={sidebarVisibility === 'show' ? 'active' : ''}
                >
                  Show
                </Button>
                <Button
                  color="dark"
                  onClick={() => toggleVisibilitySidebar('hide')}
                  className={sidebarVisibility === 'hide' ? 'active' : ''}
                >
                  Hide
                </Button>
              </ButtonGroup>
            </DropdownMenu>
          </Dropdown>
          <Dropdown
            className="d-none d-sm-block"
            nav
            isOpen={supportOpen}
            toggle={toggleSupportDropdown}
          >
            <DropdownToggle nav className={`${s.navItem} text-white`}>
              <i className="las la-globe"/>
              <span className={s.count}>8</span>
            </DropdownToggle>
            <DropdownMenu right className={`${s.dropdownMenu} ${s.support}`}>
              <DropdownItem>
                <Badge color="danger">
                  <i className="fa fa-bell-o" />
                </Badge>
                <div className={s.details}>Check out this awesome ticket</div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="warning">
                  <i className="fa fa-question-circle" />
                </Badge>
                <div className={s.details}>What is the best way to get ...</div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="success">
                  <i className="fa fa-info-circle" />
                </Badge>
                <div className={s.details}>This is just a simple notification</div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="info">
                  <i className="fa fa-plus" />
                </Badge>
                <div className={s.details}>12 new orders has arrived today</div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="danger">
                  <i className="fa fa-tag" />
                </Badge>
                <div className={s.details}>One more thing that just happened</div>
              </DropdownItem>
              <DropdownItem>
                {/* eslint-disable-next-line */}
                <a href="#" className="text-white">
                  See all tickets <i className="fa fa-arrow-right" />
                </a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem>
            <NavLink onClick={doLogout} className={`${s.navItem} text-white`} href="#">
              <i className="las la-sign-out-alt"/>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
}

export default Header;
