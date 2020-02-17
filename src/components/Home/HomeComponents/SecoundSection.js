import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

class SecoundSection extends Component {
  render() {
    return (
      <section className="sec-padding section-light section-pattren-4">
        <Container>
          <Row>
            <Col sm="12">
              <div className="sec-title-container text-center">
                <h5 className="font-weight-4 less-mar-1 line-height-4 text-primary opacity-9">
                  Our Services
                </h5>
                <h2 className="font-weight-6 less-mar-1 line-height-5">
                  Best Popular Services
                </h2>
                <div className="ce-title-line"></div>
                <h6 className="ce-sub-text raleway opacity-7">
                  Praesent mattis commodo augue Aliquam ornare hendrerit augue
                  Cras tellus In pulvinar lectus a est Curabitur eget orci Cras
                  laoreet ligula Etiam .
                </h6>
              </div>
            </Col>
            <div className="clearfix"></div>
            <Col md="4">
              <div className="ce-feature-box-14 primary">
                <div className="text-box text-center">
                  <div className="icon-plain-small center dark icon">
                    <span className="icon-toolbox"></span>
                  </div>
                  <div>
                    <h5 className="title font-weight-5">Health tips</h5>
                    <p className="small-text">
                      Vestibulum ante ipsum primis sit amet justo elit faucibus
                      orci luctus ultrices posuere.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="ce-feature-box-14 primary active">
                <div className="text-box text-center">
                  <div className="icon-plain-small center dark icon">
                    <span className="icon-lock"></span>
                  </div>
                  <div>
                    <h5 className="title font-weight-5">Daily Advice</h5>
                    <p className="small-text">
                      Vestibulum ante ipsum primis sit amet justo elit faucibus
                      orci luctus ultrices posuere.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="ce-feature-box-14 primary">
                <div className="text-box text-center">
                  <div className="icon-plain-small center dark icon">
                    <span className="icon-heart"></span>
                  </div>
                  <div>
                    <h5 className="title font-weight-5">
                      Beautiful Living Tips
                    </h5>
                    <p className="small-text">
                      Vestibulum ante ipsum primis sit amet justo elit faucibus
                      orci luctus ultrices posuere.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <div className="clearfix"></div>
            <div className="col-divider-margin-4"></div>
            <Col md="4">
              <div className="ce-feature-box-14 primary">
                <div className="text-box text-center">
                  <div className="icon-plain-small center dark icon">
                    <span className="icon-video"></span>
                  </div>
                  <div>
                    <h5 className="title font-weight-5">
                      Custom Encouragments
                    </h5>
                    <p className="small-text">
                      Vestibulum ante ipsum primis sit amet justo elit faucibus
                      orci luctus ultrices posuere.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="ce-feature-box-14 primary">
                <div className="text-box text-center">
                  <div className="icon-plain-small center dark icon">
                    <span className="icon-heart"></span>
                  </div>
                  <div>
                    <h5 className="title font-weight-5">Live Large</h5>
                    <p className="small-text">
                      Vestibulum ante ipsum primis sit amet justo elit faucibus
                      orci luctus ultrices posuere.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="ce-feature-box-14 primary">
                <div className="text-box text-center">
                  <div className="icon-plain-small center dark icon">
                    <span className="icon-lock"></span>
                  </div>
                  <div>
                    <h5 className="title font-weight-5">Adventure</h5>
                    <p className="small-text">
                      Vestibulum ante ipsum primis sit amet justo elit faucibus
                      orci luctus ultrices posuere.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default SecoundSection;
