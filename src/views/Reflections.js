import React from 'react';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import SidebarCategories from "../components/Refelections/SidebarCategories";
import NewReflection from "../components/Refelections/NewReflection";

//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'tachyons';

class Reflections extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        const { user } = this.props;
        return(
            <Container fluid className="main-content-container px-4 pb-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Add New Reflection" subtitle="Reflections" className="text-sm-left" />
            </Row>
        
            <Row>
              {/* Editor */}
              <Col lg="9" md="12">
                <NewReflection user={ user }/>
              </Col>
        
              {/* Sidebar Widgets */}
              <Col lg="3" md="12">
                <SidebarCategories />
              </Col>
            </Row>
          </Container>
        )
    }
}

export default Reflections;