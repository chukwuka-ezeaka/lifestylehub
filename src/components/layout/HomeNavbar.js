import React from "react";
//import { faSearch } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import PropTypes from "prop-types";
//import classNames from "classnames";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarToggler,
  // NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  Collapse,
} from "shards-react";

//import NavbarToggle from "./MainNavbar/NavbarToggle";

export default class NavExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen,
      },
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen,
      },
    });
  }

  render() {
    return (
      <Navbar
        type="dark"
        style={{ backgroundColor: "transparent" }}
        theme="default"
        expand="md"
        navbar-fixed-top="true"
      >
        <NavLink to={{ pathname: "/" }}>
          <img
            id="main-logo"
            className="d-inline-block align-top mr-1"
            style={{ maxWidth: "55px" }}
            src={require("../../assets/images/logo.png")}
            alt="Dashboard"
          />
        </NavLink>

        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar className="ml-auto">
            <Nav navbar>
              {/* <NavItem>
                <NavLink className="nav-link" to={{ pathname: "/about" }}>
                  About Us
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink className="nav-link" to={{ pathname: "/contact" }}>
                  Contact Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to={{ pathname: "/signin" }}>
                  Sign In
                </NavLink>
              </NavItem>
              {/* {<NavItem>
                <NavLink className="nav-link" to={{ pathname: "/register" }}>Register</NavLink>
              </NavItem>} */}
            </Nav>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
