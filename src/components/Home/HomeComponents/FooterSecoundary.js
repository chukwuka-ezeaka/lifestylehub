import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import { Link } from "react-router-dom";

class FooterSecoundary extends Component {
  render() {
    return (
      <div className="footer-secoundary sec-padding section-fulldark">
        <Container>
          <Row>
            <Col md="12" className="col-centered text-center">
              <img src={require("../../../assets/images/logo.jpeg")} alt="" />
              <br />
              <br />
              <h4 className="text-white">Address</h4>
              <h6 className="text-light opacity-6">
                1234 new lorem Rd.
                <br />
                ipsum city, cA 012345
                <br />
                (0123) 123-456-789
              </h6>
              <ul className="footer-quick-links">
                <li>
                  <Link to={{ pathname: "/" }}>Home</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/about" }}>About Us</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/contact" }}>Contact</Link>
                </li>
              </ul>
              <div className="divider-line solid light opacity-1"></div>
              <ul className="footer-social-icons round">
                <li>
                  <Link className="twitter" to={{ pathname: "/" }}>
                    <i className="fa fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to={{ pathname: "/" }}>
                    <i className="fa fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link className="active" to={{ pathname: "/" }}>
                    <i className="fa fa-google-plus"></i>
                  </Link>
                </li>
                <li>
                  <Link to={{ pathname: "/" }}>
                    <i className="fa fa-linkedin"></i>
                  </Link>
                </li>
                <li>
                  <Link to={{ pathname: "/" }}>
                    <i className="fa fa-dribbble"></i>
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FooterSecoundary;
