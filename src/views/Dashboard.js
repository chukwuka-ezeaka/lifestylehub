import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";

//import PageTitle from "../components/common/PageTitle";
import Users from '../components/Admin/Users/Users';

class Dashboard extends React.Component {
  
  componentWillMount() {
    if(!localStorage.getItem('Auth')){
      this.props.history.push('/signin');
    }
  }

  render(){
    return(
      <Container fluid className="main-content-container px-4 pb-4">

        <Row>
          <Col lg="12" md="12">
            <Users />
          </Col>
        </Row>
      </Container>
    );
    }
  }

export default withRouter(Dashboard);
