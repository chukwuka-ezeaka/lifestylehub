import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col} from "shards-react";
import CreateCategory from './Category';
import ViewCategories from './ViewCategories';

//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'tachyons';

class Categories extends React.Component {
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
         
        
            <Row>
              {/* Editor */}
              <Col lg="6" md="12">
                <ViewCategories />
              </Col>
        
              {/* Sidebar Widgets */}
              <Col lg="6" md="12">
                <CreateCategory />
              </Col>
            </Row>
          </Container>
        )
    }
}

export default withRouter(Categories);