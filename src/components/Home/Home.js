import React from "react";
import {
  Container,
  Row,
  Col
  //   Card,
  //   CardBody,
  //   CardFooter,
  //   Badge,
  //   Button
} from "shards-react";

import "./css/style.css";
import "./css/icon-font.css";

class Landing extends React.Component {
  render() {
    return (
      <Container fluid className="main-content-container">
        <header class="header">
          <Row>
            <Col lg="6" md="12" sm="24">
              <div class="header__text-box">
                <h1 class="heading-primary">
                  <span class="heading-primary--main">LIFESTYLE HUB</span>
                  <span class="heading-primary--sub">Live YOur best life</span>
                </h1>

                <a
                  href="#download"
                  class="btn btn--1 btn--animated"
                  title="Download App Now"
                >
                  <i class="icon_cloud-download_alt"></i> Download App
                </a>
                <a
                  href="#features"
                  class="btn btn--2 btn--animated"
                  title="Learn more about app's features"
                >
                  Learn More
                </a>
              </div>
            </Col>
            <Col lg="6" md="12" sm="24"></Col>
          </Row>
        </header>
        <section className="section-features">
          <div class="u-center-text u-margin-buttom-big">
            <h2 class="heading-secoundary">WHY CHOOSE US</h2>
            <div class="sub-heading">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum
            </div>
          </div>
          <Row className="feature-margin">
            <Col lg="3" md="6" sm="12">
              <div class="feature-box">
                <i class="feature-box__icon icon-basic-world"></i>
                <h3 class="heading-tertiary">Explore</h3>
                <p class="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  sapiente aperiam ipsam id tenetur veniam sequi dolorum
                  aspernatur facere.
                </p>
              </div>
            </Col>
            <Col lg="3" md="6" sm="12">
              <div class="feature-box">
                <i class="feature-box__icon icon-basic-compass"></i>
                <h3 class="heading-tertiary">See the world</h3>
                <p class="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  sapiente aperiam ipsam id tenetur veniam sequi dolorum
                  aspernatur facere.
                </p>
              </div>
            </Col>
            <Col lg="3" md="6" sm="12">
              <div class="feature-box">
                <i class="feature-box__icon icon-basic-map"></i>
                <h3 class="heading-tertiary">Find your way</h3>
                <p class="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  sapiente aperiam ipsam id tenetur veniam sequi dolorum
                  aspernatur facere.
                </p>
              </div>
            </Col>
            <Col lg="3" md="6" sm="12">
              <div class="feature-box">
                <i class="feature-box__icon icon-basic-heart"></i>
                <h3 class="heading-tertiary">Live healthy</h3>
                <p class="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                  sapiente aperiam ipsam id tenetur veniam sequi dolorum
                  aspernatur facere.
                </p>
              </div>
            </Col>
          </Row>
        </section>
        <section className="section-contact">
          <div className="container">
            <div className="row text-center section-heading">
              <Col lg="12" md="24" sm="48">
                <h2 class="lg-title mb-2">Have any questions on mind?</h2>
                <p class="mb-5">
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
                  class="contact__form"
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
                  <div class="row">
                    <Col lg="12" md="24" sm="48">
                      <div class="form-group">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          class="form-control"
                          placeholder="Enter your Subject *"
                          required="required"
                        />
                      </div>
                    </Col>
                    <Col lg="12" md="24" sm="48">
                      <div class="form-group">
                        <textarea
                          name="message"
                          id="message"
                          cols="30"
                          rows="6"
                          class="form-control"
                          placeholder="Enter your Message"
                          required="required"
                        ></textarea>
                      </div>
                    </Col>

                    <Col lg="12" md="24" sm="48">
                      <div class="submit text-center">
                        <input
                          name="submit"
                          type="submit"
                          class="btn btn-primary btn-lg"
                          value="Submit Now"
                        />
                        <p class="pt-3">* We will not spam on you inbox.</p>
                      </div>
                    </Col>
                  </div>
                </form>
              </Col>
            </div>
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
