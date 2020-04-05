import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "shards-react";

class FirstSection extends Component {
  render() {
    return (
      <div className="vertical-align">
        <div className=" bg-opacity-8">
          <Container className="sec-tpadding-2 sec-bpadding-2">
            <Row>
              <Col md="12" className="text-center">
                <Col sm="12">
                  <div className="sec-title-container less-padding-1 text-center">
                    <h5 className="font-weight-4 less-mar-1 line-height-4 text-primary opacity-9">
                      We help you get by
                    </h5>
                    <h2 className="font-weight-6 less-mar-1 line-height-5 text-white">
                      We offer best Lifestyle tips for you daily. Get unlimited
                      tips and many more
                    </h2>
                    <div className="ce-title-line"></div>
                    <br />
                    <h6 className="ce-sub-text raleway opacity-6 text-white">
                      Praesent mattis commodo augue Aliquam ornare hendrerit
                      augue Cras tellus In pulvinar lectus a est Curabitur eget
                      orci Cras laoreet ligula Etiam .
                    </h6>
                  </div>
                </Col>
                <div className="clearfix"></div>
                <Link
                  className="btn btn-prim btn-round btn-medium uppercase"
                  to={{ pathname: "/" }}
                >
                  <i className="fa fa-play-circle" aria-hidden="true"></i> Read
                  more
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default FirstSection;
