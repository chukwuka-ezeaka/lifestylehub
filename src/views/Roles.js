import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import CreateRole from "../components/Admin/Roles/CreateRole";
import ViewRoles from "../components/Admin/Roles/ViewRoles";

//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'tachyons';

class Roles extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount() {
        if(!localStorage.getItem('Auth')){
          this.props.history.push('/signin');
        }
      }

    render(){
        return(
            <Container fluid className="main-content-container px-4 pb-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="View / Create Roles" subtitle="Roles" className="text-sm-left" />
            </Row>
        
            <Row>
              {/* Editor */}
              <Col lg="6" md="12">
                <ViewRoles />
              </Col>
        
              {/* Sidebar Widgets */}
              <Col lg="6" md="12">
                <CreateRole />
              </Col>
            </Row>
          </Container>
        )
    }
}

export default withRouter(Roles);