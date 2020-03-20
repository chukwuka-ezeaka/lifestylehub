import React, { Component } from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  // Nav,
  // NavItem,
  // NavLink,
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // InputGroup,
  // InputGroupAddon,
  InputGroupText,
  // FormInput,
  Collapse
} from "shards-react";

/**
 *
 * Renders top navbar and shows the current signed in user.
 */
export default class NavBar extends Component {
  state = {};
  render() {
    return (
      <Navbar inverse>
        <Navbar>
          <NavbarBrand>Cool Chat</NavbarBrand>
          <NavbarToggler />
        </Navbar>
        <Collapse>
          <InputGroupText pullRight>
            Signed in as:&nbsp;
            <span className="signed-in-user">
              {(this.props.signedInUser || {}).name}
            </span>
          </InputGroupText>
        </Collapse>
      </Navbar>
    );
  }
}
