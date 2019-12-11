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

  componentDidMount() {
    document.body.style.backgroundColor = 'white';
  }

  render() {

    return (
      <div class="view">
        <Row>
          <h1>WELCOME TO LIFESTYLE ACADEMY</h1>
        </Row>
      </div>
    );
  }
}

export default Home;
