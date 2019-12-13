/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";

import {
  Container,
  Row,
  Col
} from "shards-react";

import './Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    return (
      <div class="view">
        <Container>
          <Row >
          <Col lg="12" md="12" className="image-row">
              <img
                className="mr-2 logo"
                src={require("../assets/logo.jpeg")}
                alt="User Avatar"
              />
          </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
