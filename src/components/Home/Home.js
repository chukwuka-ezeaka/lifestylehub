import React from "react";
import { Container, Row, Col } from "shards-react";

import "./css/style.css";
import "./css/icon-font.css";

class Landing extends React.Component {
  render() {
    return (
      <Container fluid className="main-content-container">
        <header className="header">
          <Row>
            <Col lg="6" md="12" sm="24">
              <div className="header__text-box">
                <h1 className="heading-primary">
                  <span className="heading-primary--main">LIFESTYLE HUB</span>
                  <span className="heading-primary--sub">
                    Live YOur best life
                  </span>
                </h1>

                <a
                  href="#download"
                  className="btn btn--1 btn--animated"
                  title="Download App Now"
                >
                  <i className="icon_cloud-download_alt"></i> Download App
                </a>
                <a
                  href="#features"
                  className="btn btn--2 btn--animated"
                  title="Learn more about app's features"
                >
                  Learn More
                </a>
              </div>
            </Col>
            <Col lg="6" md="12" sm="24"></Col>
          </Row>
        </header>
        <section className="section-features" id="about">
          <div className="u-center-text u-margin-buttom-big">
            <h2 className="heading-secoundary">WHY CHOOSE US</h2>
            <div className="sub-heading">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum
            </div>
          </div>
          <Row className="feature-margin">
            <Col lg="3" md="6" sm="12">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-world"></i>
                <h3 className="heading-tertiary">Explore</h3>
                <p className="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  sapiente aperiam ipsam id tenetur veniam sequi dolorum
                  aspernatur facere.
                </p>
              </div>
            </Col>
            <Col lg="3" md="6" sm="12">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-compass"></i>
                <h3 className="heading-tertiary">See the world</h3>
                <p className="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  sapiente aperiam ipsam id tenetur veniam sequi dolorum
                  aspernatur facere.
                </p>
              </div>
            </Col>
            <Col lg="3" md="6" sm="12">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-map"></i>
                <h3 className="heading-tertiary">Find your way</h3>
                <p className="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  sapiente aperiam ipsam id tenetur veniam sequi dolorum
                  aspernatur facere.
                </p>
              </div>
            </Col>
            <Col lg="3" md="6" sm="12">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-heart"></i>
                <h3 className="heading-tertiary">Live healthy</h3>
                <p className="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  sapiente aperiam ipsam id tenetur veniam sequi dolorum
                  aspernatur facere.
                </p>
              </div>
            </Col>
          </Row>
        </section>
        <section className="section-contact" id="contact">
          <div className="container">
            <div className="row text-center section-heading">
              <Col lg="12" md="24" sm="48">
                <h2 className="lg-title mb-2">Have any questions on mind?</h2>
                <p className="mb-5">
                  Our duty towards you is to share our experience we're reaching
                  in our work path with you.
                </p>
              </Col>
            </div>

            <div className="row justify-content-center">
              <Col lg="8" md="16" sm="32">
                <form
                  action="mail.php"
                  method="post"
                  id="main_contact_form"
                  className="contact__form"
                >
                  <div className="row">
                    <Col lg="12" md="24" sm="48">
                      <div
                        className="alert alert-success contact__msg"
                        style={{ display: "none" }}
                        role="alert"
                      >
                        Your message was sent sucesfully
                      </div>
                    </Col>
                  </div>

                  <div className="row">
                    <Col lg="6" md="12" sm="24">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Enter your Name"
                        />
                      </div>
                    </Col>
                    <Col lg="6" md="12" sm="24">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder="Enter your Email *"
                          required="required"
                        />
                      </div>
                    </Col>
                  </div>
                  <div className="row">
                    <Col lg="12" md="24" sm="48">
                      <div className="form-group">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          className="form-control"
                          placeholder="Enter your Subject *"
                          required="required"
                        />
                      </div>
                    </Col>
                    <Col lg="12" md="24" sm="48">
                      <div className="form-group">
                        <textarea
                          name="message"
                          id="message"
                          cols="30"
                          rows="6"
                          className="form-control"
                          placeholder="Enter your Message"
                          required="required"
                        ></textarea>
                      </div>
                    </Col>

                    <Col lg="12" md="24" sm="48">
                      <div className="submit text-center">
                        <input
                          name="submit"
                          type="submit"
                          className="btn btn-primary btn-lg"
                          value="Submit Now"
                        />
                        <p className="pt-3">* We will not spam on you inbox.</p>
                      </div>
                    </Col>
                  </div>
                </form>
              </Col>
            </div>
          </div>
        </section>
        <section className="section-footer">
          <div class="container">
            <Row>
              <div
                class="col-md-4 footer-block wow fadeIn"
                data-wow-delay="0.30s"
              >
                <div class="heading">
                  <h3>ABOUT LIFESTYLE</h3>
                </div>
                <p>
                  Nullam hendrerit sem ullamcorper erat ut luctus proin aenean
                  nullam sagittis praesent, donec faucibus rutrum fusce ante
                  rutrum curabitur lacus{" "}
                </p>
              </div>
              <div
                class="col-md-4 footer-block wow fadeIn"
                data-wow-delay="0.35s"
              >
                <div class="heading">
                  <h3>CONTACT</h3>
                </div>
                <ul class="list-unstyled">
                  <li>
                    <i class="fa fa-map-marker"></i> 15A Hendon Ave Mount Albert
                    Auckland New Zealand.
                  </li>
                  <li>
                    <i class="fa fa-envelope"></i> support@LifeStyle.com
                  </li>
                  <li>
                    <i class="fa fa-phone"></i> +64-7589-6477
                  </li>
                </ul>
              </div>
              <div
                class="col-md-4 footer-block wow fadeIn"
                data-wow-delay="0.40s"
              >
                <div class="heading">
                  <h3>STAY IN TOUCH</h3>
                </div>
                <p>
                  Nullam hendrerit sem ullamcorper erat ut luctus proin aenean
                  nullam sagittis praesent, donec faucibus rutrum fusce ante
                  rutrum curabitur lacus{" "}
                </p>
              </div>
            </Row>
          </div>
        </section>
      </Container>
    );
  }
}
//     <Row>
//       <Col lg="3" md="6" sm="12" className="mb-4"></Col>
//     </Row>

export default Landing;
