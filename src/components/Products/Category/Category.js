import React, { Component } from 'react';

import { Container, Row, Col} from "shards-react";
import LoaderSmall from '../../Loaders/LoaderSmall';
import ViewCategories from './ViewCategories';
import {
    Card,
    CardHeader,
    ListGroup,
    FormInput,
    Button,
    FormGroup,
    FormTextarea,
    Form
  } from "shards-react";
import HttpService from '../../../utils/API';
import CreateCategory from './CreateCategory';

const _http = new HttpService()

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            errMessage: '',
            requestPending: false,
            categories: [],
            isLoading: true
         };
      }

    componentDidMount(){
        this.getCategories();
    }   

    componentWillUnmount = () => this.abortController.abort();

    abortController = new window.AbortController(); 



    render() { 
        //const {category} = this.props;
        return ( 
            <Container fluid className="main-content-container px-4 pb-4">
         
        
            <Row>
              <Col lg="7" md="7">
                <ViewCategories categories={this.state.categories} isLoading={this.state.isLoading}/>
              </Col>
        
              <Col lg="5" md="5">
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                  <h6 className="m-0">Create Category</h6>
                  </CardHeader>
                    <CreateCategory />
                </Card>
               </Col>
            </Row>
          </Container>
           
         );
    }

    getCategories = () => {
        const url = 'content/category/list';
        _http.sendGet(url)
        .then(response => {
            response.data ?
            this.setState({ errorMessage: '', categories: response.data, isLoading: false })
            :
            this.setState({ errorMessage: response.message, isLoading: false })
        })
    }

   
}
 
export default Category;