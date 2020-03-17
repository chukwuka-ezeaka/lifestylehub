import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import {
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  Collapse
} from "shards-react";
import "./SidebarNavItem.css";

import { Dispatcher, Constants } from "../../../flux";

class SidebarNavItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
      // user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {}
    };
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }
  render() {
    const { visible } = this.state;
    const { item } = this.props;
    return (
      <NavItem
        className="pointer nav-caret"
        tag={Dropdown}
        toggle={this.toggleUserActions}
      >
        {item.subMenu === "" ? (
          <li>
            <NavLink
              tag={RouteNavLink}
              to={item.to}
              onClick={this.handleToggleSidebar}
            >
              {item.htmlBefore && (
                <div
                  className="d-inline-block item-icon-wrapper"
                  dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
                />
              )}
              {item.title && <span className="text-muted">{item.title}</span>}
              {item.htmlAfter && (
                <div
                  className="d-inline-block item-icon-wrapper"
                  dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
                />
              )}
            </NavLink>
          </li>
        ) : (
          <li>
            <DropdownToggle tag={NavLink} to={item.to}>
              {item.htmlBefore && (
                <div
                  className="d-inline-block item-icon-wrapper"
                  dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
                />
              )}
              {item.title && <span className="text-muted">{item.title}</span>}
              {item.htmlAfter && (
                <div
                  className="d-inline-block item-icon-wrapper"
                  dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
                />
              )}
            </DropdownToggle>
            <Collapse open={visible} style={{ background: "transparent" }}>
              {item.subMenu.map((menu, index) => {
                return (
                  <NavLink
                    key={index}
                    tag={RouteNavLink}
                    to={menu.to}
                    className="px-5 "
                    onClick={this.handleToggleSidebar}
                  >
                    {menu.htmlBefore && (
                      <div
                        className="d-inline-block item-icon-wrapper"
                        dangerouslySetInnerHTML={{ __html: menu.htmlBefore }}
                      />
                    )}
                    {menu.title && (
                      <span className="text-muted">{menu.title}</span>
                    )}
                    {menu.htmlAfter && (
                      <div
                        className="d-inline-block item-icon-wrapper"
                        dangerouslySetInnerHTML={{ __html: menu.htmlAfter }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </Collapse>
          </li>
        )}
      </NavItem>
    );
  }
}

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
