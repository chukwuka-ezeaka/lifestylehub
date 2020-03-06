import React from "react";
//import { faSearch } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import PropTypes from "prop-types";
//import classNames from "classnames";
<<<<<<< HEAD
=======
import { Link } from "react-router-dom";
>>>>>>> 6925eb1f70fae88b6fa5cf800204563df576196f
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse
} from "shards-react";

//import NavbarToggle from "./MainNavbar/NavbarToggle";

export default class NavExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
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
        <NavbarBrand href="/">
          <img
            id="main-logo"
            className="d-inline-block align-top mr-1"
            style={{ maxWidth: "55px" }}
            src={require("../../assets/images/logo.jpeg")}
            alt="Dashboard"
          />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar className="ml-auto">
            <Nav navbar>
              <NavItem>
<<<<<<< HEAD
<<<<<<< HEAD
                <NavLink href="#about">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#contact">Contact Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signin">Sign In</NavLink>
=======
                <NavLink className="nav-link" to={{ pathname: "/about" }}>
                  About Us
                </NavLink>
=======
                <NavLink href="/about">About Us</NavLink>
>>>>>>> 6925eb1f70fae88b6fa5cf800204563df576196f
              </NavItem>
              <NavItem>
                <NavLink href="/contact">Contact Us</NavLink>
              </NavItem>
              <NavItem>
<<<<<<< HEAD
                <NavLink className="nav-link" to={{ pathname: "/signin" }}>
                  Sign In
                </NavLink>
>>>>>>> undid sidebar changes
=======
                <NavLink href="/signin">Sign In</NavLink>
>>>>>>> 6925eb1f70fae88b6fa5cf800204563df576196f
              </NavItem>
              {/* {<NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>} */}
            </Nav>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
