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
import HttpService from '../../../API';

const _http = new HttpService()
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            description: '',
            errMessage: '',
            requestPending: false,
            categories: [],
            isLoading: true
         };
      }

      handleCategory = (event) => {
        const val = event.target.value;
        const data = (val.trim()).replace(' ', '_');
        this.setState({name: data})
      }

    handleDescription = (event) => {
        const val = event.target.value;
        this.setState({description: val})
    }

    componentDidMount(){
        this.getCategories();
    }   

    componentWillUnmount = () => this.abortController.abort();

    abortController = new window.AbortController(); 



    render() { 
        return ( 
            <Container fluid className="main-content-container px-4 pb-4">
         
        
            <Row>
              <Col lg="6" md="12">
                <ViewCategories categories={this.state.categories} isLoading={this.state.isLoading}/>
              </Col>
        
              <Col lg="6" md="12">
                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                    <h6 className="m-0">Create Category</h6>
                    </CardHeader>
                    {this.state.requestPending === true ?
                        <LoaderSmall/>
                    :
                        ""}
                    <ListGroup flush className="p-4">
                        <Form onSubmit={this.onSubmitRequest}>
                            <FormGroup>
                                <label htmlFor="name">Category Name</label>
                                <FormInput
                                    id="name"
                                    type="text"
                                    onChange={this.handleCategory} placeholder="Name"required />
                            </FormGroup>
                            <FormGroup>
                            <label htmlFor="description">Description</label>
                                <FormTextarea
                                id="description"
                                rows="5"
                                onChange={this.handleDescription} placeholder="Description" required/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="image">Display Image</label>
                                <FormInput
                                id="image"
                                type="file"
                               placeholder="image" required/>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" theme="success" disabled={this.state.requestPending}>Add</Button>
                            </FormGroup>
                    </Form>
                    </ListGroup>
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

    onSubmitRequest = (event) => {
        event.preventDefault();
        this.setState({requestPending: true});
        const imageUrl = 'media/manager/image/single/create';
        const image = document.getElementById('image');

        const imageData =  new FormData();
        imageData.append('title', this.state.name)
        imageData.append('description', this.state.description)
        imageData.append('image', image.files[0])

            _http.sendPost(imageUrl, imageData)
            .then(response => {
                let  imageRes = response.data;
                console.log(imageRes)
                if(imageRes.status === 1){
                    const payload = {
                        "name": this.state.name,
                        "description": this.state.description,
                        "image_url": imageRes.url
                    }
                
                const url = "content/category/create";
                _http.sendPost(url, payload)
                .then(response => {
                    this.setState({ requestPending: false });
                    if(response.data ){
                        this.setState({requestPending: true});
                        let type = "";
                        if(response.status === "success"){
                            type = "success";
                            _http.notify(response.message, type)
                        }else{
                            type = "warn";
                            _http.notify(response.message, type)
                        }
                    
                    }else{
                        _http.notify(response.message)
                        this.setState({requestPending: false })
                    }
                });
                }
            })
            .catch(err => console.log(err))
        }
}
 
export default Category;