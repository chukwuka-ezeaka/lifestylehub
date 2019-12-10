import React from "react";
import { Container, Row, Col } from "shards-react";

//import PageTitle from "../components/common/PageTitle";
import Users from '../components/Users/Users';

class Dashboard extends React.Component {
  
  componentDidMount() {
    document.body.style.backgroundColor = 'white';
  }

  render(){
    return(
      <Container fluid className="main-content-container px-4 pb-4">

        <Row>
          <Col lg="9" md="12">
            <Users />
          </Col>

          <Col lg="3" md="12">

          </Col>
        </Row>
      </Container>
    );
    }
  }

export default Dashboard;
