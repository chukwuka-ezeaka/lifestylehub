import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";
import "./layout.css";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <section className="section-footer">
    <div class="first-footer">
      <div class="container">
        <Row>
          <div class="col-md-4 footer-block wow fadeIn" data-wow-delay="0.30s">
            <div class="heading">
              <h3>ABOUT LIFESTYLE</h3>
            </div>
            <p>
              Nullam hendrerit sem ullamcorper erat ut luctus proin aenean
              nullam sagittis praesent, donec faucibus rutrum fusce ante rutrum
              curabitur lacus{" "}
            </p>
          </div>
          <div class="col-md-4 footer-block wow fadeIn" data-wow-delay="0.35s">
            <div class="heading">
              <h3>CONTACT</h3>
            </div>
            <ul class="list-unstyled">
              <li>
                <i class="fa fa-map-marker"></i> 15A Hendon Ave Mount Albert
                Auckland New Zealand .
              </li>
              <li>
                <i class="fa fa-envelope"></i> support@LifeStyle.com
              </li>
              <li>
                <i class="fa fa-phone"></i> +64-7589-6477
              </li>
            </ul>
          </div>
          <div class="col-md-4 footer-block wow fadeIn" data-wow-delay="0.40s">
            <div class="heading">
              <h3>STAY IN TOUCH</h3>
            </div>
            <p>
              Nullam hendrerit sem ullamcorper erat ut luctus proin aenean
              nullam sagittis praesent, donec faucibus rutrum fusce ante rutrum
              curabitur lacus{" "}
            </p>
          </div>
        </Row>
      </div>
    </div>
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
  </section>
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
  copyright: "Copyright © 2019 Lifestyle Hub",
  menuItems: []
};

export default MainFooter;
