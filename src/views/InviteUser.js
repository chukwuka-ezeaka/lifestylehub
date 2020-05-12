import React from "react";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import Invite from "../components/Admin/Users/Invite";

const InviteUsers= () => {
  return (
    <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header">
      <PageTitle sm="4" title="Invite users" subtitle="USERS" className="text-sm-left" />
    </Row>
      <Invite />
  </Container>
     
  );
};

export default InviteUsers;
