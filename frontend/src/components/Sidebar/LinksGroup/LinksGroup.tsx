import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Badge } from 'reactstrap';
import { Route } from 'react-router';
import classnames from 'classnames';

import s from './LinksGroup.module.scss';

type LinksGroupProps = {
  header?: string,
  link?: string,
  childrenLinks?: Array<{}>,
  iconName?: string,
  className?: string,
  badge?: string,
  label?: string,
  activeItem?: string,
  isHeader?: boolean,
  index?: string,
  deep?: number,
  onActiveSidebarItemChange?: (activeItem: string) => void,
  labelColor?: string,
  exact?: boolean,
  target?: string
}

const LinksGroup = (props: LinksGroupProps) => {
  const {
    header,
    link = '',
    childrenLinks = null,
    iconName,
    className = '',
    badge,
    label = '',
    activeItem = '',
    isHeader = false,
    index,
    deep = 0,
    onActiveSidebarItemChange,
    labelColor,
    exact = true,
    target
  } = props;

  const [headerLinkWasClicked, setHeaderLinkWasClicked] = useState(true);

  const togglePanelCollapse = (link: string) => {
    if (onActiveSidebarItemChange) {
      onActiveSidebarItemChange(link);
    }
    setHeaderLinkWasClicked(
      (prevState) => !prevState || (!!activeItem && !activeItem.includes(index!)),
    );
  };

  let isOpen = false;

  if (index) {
    isOpen = !!activeItem && activeItem.includes(index) && headerLinkWasClicked;
  }

  if (!childrenLinks) {
    if (isHeader) {
      return (
        <li className={classnames('link-wrapper', s.headerLink, className)}>
          <NavLink
            to={link}
            activeClassName={s.headerLinkActive}
            exact={exact}
            target={target}
          >
              <span className={classnames('icon', s.icon)}>
                <i className={`la ${iconName}`} />
              </span>
            {header} {label && <sup className={`${s.headerLabel} ${s.headerUpdate} text-${labelColor || 'warning'}`}>{label}</sup>}
            {badge && <Badge className={s.badge} pill>9</Badge>}
          </NavLink>
        </li>
      );
    }
    return (
      <li>
        <NavLink
          to={link}
          activeClassName={s.headerLinkActive}
          style={{ paddingLeft: `${26 + (10 * (deep - 1))}px` }}
          onClick={(e) => {
            // able to go to link is not available(for Demo)
            if (link.includes('menu')) {
              e.preventDefault();
            }
          }}
          exact={exact}
        >
          {header} {label && <sup className={`${s.headerLabel} text-${labelColor || 'warning'}`}>{label}</sup>}
        </NavLink>
      </li>
    );
  }
  /* eslint-disable */
  return (
    <Route
      path={link}
      children={(params) => {
        const { match } = params;
        return (
          <li className={classnames('link-wrapper', { [s.headerLink]: isHeader }, className)}>
            <a className={classnames({ [s.headerLinkActive]: match }, { [s.collapsed]: isOpen }, "d-flex")}
               style={{ paddingLeft: `${deep == 0 ? 50 : 26 + 10 * (deep - 1)}px` }}
               onClick={() => togglePanelCollapse(link)}
            >
              {isHeader ?
                <span className={classnames('icon', s.icon)}>
                    <i className={`fi ${iconName}`} />
                  </span> : null
              }
              {header} {label && <sup className={`${s.headerLabel} ${s.headerNode} ml-1 text-${labelColor || 'warning'}`}>{label}</sup>}
              <b className={['la la-angle-left', s.caret].join(' ')} />
            </a>
            {/* eslint-enable */}
            <Collapse className={s.panel} isOpen={isOpen}>
              <ul>
                {childrenLinks &&
                  childrenLinks.map((child: LinksGroupProps, ind): JSX.Element | null => (
                    <LinksGroup
                      onActiveSidebarItemChange={onActiveSidebarItemChange}
                      activeItem={activeItem}
                      header={child.header}
                      link={child.link}
                      index={child.index}
                      childrenLinks={child.childrenLinks}
                      deep={deep + 1}
                      key={ind} // eslint-disable-line
                    />
                  ))}
              </ul>
            </Collapse>
          </li>
        );
      }}
    />
  );
}

export default LinksGroup;
