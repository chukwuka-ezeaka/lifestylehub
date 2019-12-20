import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, } from "shards-react";

import MainNavbar from "../components/layout/HomeNavbar";
//import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import './Home.css'

const HomeLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid className="body">
    <Row>
      <Col
        className="main-content p-0"
        lg={{ size: 12, offset: 0 }}
        md={{ size: 12, offset: 0 }}
        sm="12"
        tag="main"
      >
        {!noNavbar && <MainNavbar />}
        {children}
        
      </Col>
    </Row>
    {!noFooter && <MainFooter />}
  </Container>
);

HomeLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

HomeLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default HomeLayout;
