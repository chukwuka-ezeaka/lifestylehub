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

class CreateCategory extends Component {
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


    componentWillUnmount = () => this.abortController.abort();

    abortController = new window.AbortController(); 



    render() { 
        //const {category} = this.props;
        return ( 
            
          <>
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
                                defaultValue={this.props.category ? this.props.category.name : ""}
                                onChange={this.handleCategory} placeholder="Name"required />
                        </FormGroup>
                        <FormGroup>
                        <label htmlFor="description">Description</label>
                            <FormTextarea
                            id="description"
                            rows="5"
                            defaultValue={this.props.category
                                    ? this.props.category.description : ""}
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
       </>
           
         );
    }

    onSubmitRequest = (event) => {
        event.preventDefault();
        this.setState({requestPending: true});
        const image = document.getElementById('image');

        if(image.files[0]){
            let url = "";
            let request = "";
            let categoryId  = "";
            const imageUrl = 'media/manager/image/single/create';
            const imageData =  new FormData();
            const name = this.state.name ? this.state.name : this.props.category.name;
            const description =  this.state.description ? this.state.description : this.props.category.description;
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
                    if(this.props.category){
                        categoryId = this.props.category.id;
                        url = `content/category/${categoryId}`
                        request = _http.sendPut(url, payload);
                    }else{
                        url = "content/category/create";
                        request =  _http.sendPost(url, payload);
                    }
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
                const categoryId = this.props.category.id;
                const payload = {
                    "name": this.props.category.name,
                    "description": this.props.category.description,
                }
                const url = `content/category/${categoryId}`
                _http.sendPut(url, payload)
                .then(response => {
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
 
export default CreateCategory;