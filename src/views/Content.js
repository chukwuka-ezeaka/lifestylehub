import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import AddContent from "../components/Content/AddContent";
import SidebarCategories from "../components/Content/SidebarCategories";

//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'tachyons';

class Content extends React.Component {
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
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
        return(
            <Container fluid className="main-content-container px-4 pb-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Add New Content" subtitle="Content" className="text-sm-left" />
            </Row>
        
            <Row>
              {/* Editor */}
              <Col lg="9" md="12">
                <AddContent user={ user }/>
              </Col>
        
              {/* Sidebar Widgets */}
              <Col lg="3" md="12">
              <SidebarCategories user={ user }/>
              </Col>
            </Row>
          </Container>
        )
    }
}

export default withRouter(Content);