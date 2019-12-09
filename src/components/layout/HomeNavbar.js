import React from "react";
//import { faSearch } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import PropTypes from "prop-types";
//import classNames from "classnames";
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
        <Navbar type="dark" theme="default" expand="md">
          <NavbarBrand href="/">Lifestyle Academy</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
  
          <Collapse open={this.state.collapseOpen} navbar>
            
  
            <Nav navbar className="ml-auto">
            <Nav navbar>
              <NavItem>
                <NavLink href="/register">
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signin" >
                  Sign In
                </NavLink>
              </NavItem>
            </Nav>
            </Nav>
          </Collapse>
        </Navbar>
      );
    }
  }
 