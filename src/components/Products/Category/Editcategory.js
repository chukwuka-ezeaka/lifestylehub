import React, { Component } from 'react';

import LoaderSmall from '../../Loaders/LoaderSmall';
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

const _http = new HttpService()

class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            description: '',
            errMessage: '',
            requestPending: false,
            category: {},
            isLoading: true
         };
      }

      handleCategory = (event) => {
        const val = event.target.value;
        const data = (val.trim()).replace(' ', '_');
        const newDetails = {
            ...this.state.category,
          }
          newDetails.name = data;
          this.setState({category: newDetails});
      }

    handleDescription = (event) => {
        const newDetails = {
            ...this.state.category,
          }
          newDetails.description = event.target.value;
          this.setState({category: newDetails});
    }

    componentDidMount(){
        const params = queryString.parse(this.props.location.search)
        const id = params.id;
        const url = `content/category/${id}`;
        _http.sendGet(url)
        .then(response => {
            response.data ?
            this.setState({ errorMessage: '', category: response.data, isLoading: false })
            :
            this.setState({ errorMessage: response.message, isLoading: false })
        })
    }
    componentWillUnmount = () => this.abortController.abort();

    abortController = new window.AbortController(); 



    render() { 
        const {category} = this.state;
        return ( 
          <>
                {this.state.requestPending === true ?
                    <LoaderSmall/>
                :
                    ""}
             <Row>
                <Col>
                    <GetImage image={category.image_url} width="300px"/>
                </Col>
                <Col>
                <ListGroup flush className="p-4">
                    <Form onSubmit={this.onSubmitRequest}>
                        <FormGroup>
                            <label htmlFor="name">Category Name</label>
                            <FormInput
                                id="name"
                                type="text"
                                defaultValue={category ? category.name : ""}
                                onChange={this.handleCategory} placeholder="Name"required />
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="description">Description</label>
                            <FormTextarea
                            id="description"
                            rows="5"
                            defaultValue={category
                                    ? category.description : ""}
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
                </Col>
            </Row>
       </>
           
         );
    }

    onSubmitRequest = (event) => {
        event.preventDefault();
        this.setState({requestPending: true});
        const image = document.getElementById('image');

        if(image.files[0]){
            const imageUrl = 'media/manager/image/single/create';
            const imageData =  new FormData();
            const name = this.state.category.name;
            const description =  this.state.category.description;
            console.log(description);
            imageData.append('title', name)
            imageData.append('description', description)
            imageData.append('image', image.files[0])

                _http.sendPost(imageUrl, imageData)
                .then(response => {
                    let  imageRes = response.data;
                // console.log(imageRes)
                    if(imageRes.status === 1){
                        const payload = {
                            "name": name,
                            "description": description,
                            "image_url": imageRes.url
                        }
                    
                        const categoryId = this.state.category.id;
                        const url = `content/category/${categoryId}`
                        const request = _http.sendPut(url, payload);

                    request.then(response => {
                        this.setState({ requestPending: false });
                        if(response.data ){
                            this.setState({requestPending: true});
                            if(response.status === "success"){
                                _http.notify(response.message, "success")
                            }else{
                                _http.notify(response.message)
                            }
                        
                        }else{
                            _http.notify(response.message)
                            this.setState({requestPending: false })
                        }
                    });
                    }
                })
                .catch(err => console.log(err))
            }else{
                const categoryId = this.state.category.id;
                const payload = {
                    "name": this.state.category.name,
                    "description": this.state.category.description,
                }
                const url = `content/category/${categoryId}`
                const request = _http.sendPut(url, payload);

                request.then(response => {
                    this.setState({ requestPending: false });
                    if(response.data ){
                        if(response.status === "success"){
                            _http.notify(response.message, "success")
                        }else{
                            _http.notify(response.message)
                        }
                    
                    }else{
                        _http.notify(response.message)
                        this.setState({requestPending: false })
                    }
                });
            }
        }
}
 
export default EditCategory;
