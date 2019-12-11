import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile/UserDetails";
import UserAccountDetails from "../components/user-profile/UserAccountDetails";

const update = () =>{
  document.body.style.backgroundColor = 'white';
}

const UserProfile = () => {
  update();
  return (
  <Container fluid className="main-content-container mt-2 px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="4">
        <UserDetails />
      </Col>
      <Col lg="8">
        <UserAccountDetails />
      </Col>
    </Row>
  </Container>
);
  }

export default UserProfile;
