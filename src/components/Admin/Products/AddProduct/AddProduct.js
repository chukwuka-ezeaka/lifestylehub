import React, { Component } from 'react';
import Media from './Media';
import LoaderSmall from '../../../Loaders/LoaderSmall';
import {
    Card,
    CardHeader,
    CardBody,
    FormInput,
  InputGroup,
  InputGroupAddon,
  Button,
  Row,
  Col
  } from "shards-react";
import HttpService from '../../../../utils/API';

const _http = new HttpService();

class AddProduct extends Component {
    constructor(){
        super();
        this.state={
            newCategory: '',
            requestPending: false
        }
    }

    handleCategory = (event) => {
        let category = event.target.value;
        this.setState({ newCategory: category });
    }

    render() { 
        const { requestPending } = this.state;
        return (
            <Row>
            <Col lg="8">
              <Media/>
            </Col>
            <Col lg="4">
                <Card small className="mb-3">
                    <CardHeader className="border-bottom">
                    <h6 className="m-0">Add Media</h6>
                    </CardHeader>
                    <CardBody className="p-3">
                    
                    <InputGroup className="ml-auto">
                    <FormInput id="newCategory" onChange={this.handleCategory} placeholder="New category" />
                    <InputGroupAddon type="append">
                        <Button theme="white" className="px-2 bg-success" onClick={this.onSubmitRequest}>
                        {requestPending ? <LoaderSmall /> : <i className="material-icons white">add</i>}
                        </Button>
                    </InputGroupAddon>
                    </InputGroup>
                        
                    </CardBody>
                </Card>
         
            </Col>
          </Row> 
            );
    }

    onSubmitRequest = () => {
        this.setState({requestPending: true});
        const url = "content/category/create";
        const postData = {
            name: this.state.newCategory
        }
        _http.sendPost(url, postData)
        .then(response => {
            if(response.data ){
                this.setState({requestPending: false});
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
        })
    }
}
 
export default AddProduct;