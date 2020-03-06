import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

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
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
              <div className="divider-line solid light opacity-1"></div>
              <ul className="footer-social-icons round">
                <li>
                  <a className="twitter" href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="active" href="#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-dribbble"></i>
                  </a>
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
