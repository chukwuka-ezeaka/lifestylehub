import React from "react";
import { Container, Row, Col } from "shards-react";
import { Link } from "react-router-dom";
import "./About.css";

class About extends React.Component {
  render() {
    return (
      <div>
        <section className="about about-section_padding">
          <Container>
            <Row>
              <Col md="6" className=" margin-bottom">
                <img
                  src="http://via.placeholder.com/1000x800"
                  alt=""
                  className="img-responsive"
                />
              </Col>

              <Col md="6" className="column-left">
                <Col sm="12" className="nopadding">
                  <div className="title-container text-left">
                    <h5 className="font-weight-4 less-mar-1 line-height-4 text-primary">
                      What Lifestyle offer
                    </h5>
                    <h2 className="font-weight-6 less-mar-1 line-height-4">
                      We offer daily lifestyle tips for healthy living
                    </h2>
                    <div className="title-line_left"></div>
                  </div>
                </Col>
                <br />
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Suspendisse et justo. Praesent mattis commodo augue. Aliquam
                  ornare hendrerit augue. Cras tellus. In pulvinar lectus a est.
                  Curabitur eget orci. Cras laoreet ligula. Etiam sit amet
                  dolor. Vestibulum ante ipsum primis in faucibus orci luctus
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Suspendisse et justo.
                </p>
                <br />
                <br />
                <Link
                  className="btn btn-prim btn-round uppercase"
                  to={{ pathname: "/" }}
                >
                  Read more
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="feature about-section_padding section-light about-section_background-image">
          <Container>
            <Row>
              <Col sm="12">
                <div className="title-container text-center">
                  <h5 className="font-weight-4 less-mar-1 line-height-4 text-primary">
                    Meet Our Team
                  </h5>
                  <h2 className="font-weight-6 less-mar-1 line-height-5">
                    Professional Expertises
                  </h2>
                  <div className="title-line"></div>
                  <h6 className="sub-text raleway opacity-7">
                    Praesent mattis commodo augue Aliquam ornare hendrerit augue
                    Cras tellus In pulvinar lectus a est Curabitur eget orci
                    Cras laoreet ligula Etiam .
                  </h6>
                </div>
              </Col>
              <Col md="4">
                <div className="feature-box text-center margin-bottom">
                  <div className="text-box shadow">
                    <div className="top-line"></div>
                    <h5 className="title font-weight-5">
                      How Lifestyle Started
                    </h5>
                    <p>
                      Praesent mattis commodo augue Aliquam ornare hendrerit
                      augue Cras tellus In pulvinar lectus a est .
                    </p>
                    <br />
                    <br />
                    <Link
                      className="btn btn-prim btn-round btn-medium uppercase"
                      to={{ pathname: "/" }}
                    >
                      Read more
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </div>
              </Col>

              <Col md="4">
                <div className="feature-box text-center margin-bottom">
                  <div className="text-box shadow">
                    <div className="top-line"></div>
                    <h5 className="title font-weight-5">
                      Our Successful Journey
                    </h5>
                    <p>
                      Praesent mattis commodo augue Aliquam ornare hendrerit
                      augue Cras tellus In pulvinar lectus a est .
                    </p>
                    <br />
                    <br />
                    <Link
                      className="btn btn-prim btn-round btn-medium uppercase"
                      to={{ pathname: "/" }}
                    >
                      Read more
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </div>
              </Col>

              <Col md="4">
                <div className="feature-box text-center margin-bottom">
                  <div className="text-box shadow">
                    <div className="top-line"></div>
                    <h5 className="title font-weight-5">
                      Our unique Challenges
                    </h5>
                    <p>
                      Praesent mattis commodo augue Aliquam ornare hendrerit
                      augue Cras tellus In pulvinar lectus a est .
                    </p>
                    <br />
                    <br />
                    <Link
                      className="btn btn-prim btn-round btn-medium uppercase"
                      to={{ pathname: "/" }}
                    >
                      Read more
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}
export default About;
