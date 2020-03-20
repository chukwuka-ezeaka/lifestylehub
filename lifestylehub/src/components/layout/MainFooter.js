import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";
import "./layout.css";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer footer-bottom d-flex px-3">
    <Container fluid={contained}>
      <Row>
        {
          <Nav>
            {menuItems.map((item, idx) => (
              <NavItem key={idx}>
                <NavLink tag={Link} to={item.to}>
                  {item.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        }
        <span className="copyright ml-auto my-auto mr-auto">{copyright}</span>
      </Row>
    </Container>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  copyright: "Copyright © 2019 Lifestyle Hub | All rights reserved.",
  menuItems: []
};

export default MainFooter;
