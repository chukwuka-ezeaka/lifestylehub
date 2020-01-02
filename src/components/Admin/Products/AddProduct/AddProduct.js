import React, { Component } from 'react';
import Content from './Content';
import LoaderSmall from '../../../Loaders/Loader';
import { toast } from 'react-toastify';
import {
    Card,
    CardHeader,
    CardBody,
    FormRadio,
    FormInput,
  InputGroup,
  InputGroupAddon,
  Button,
  Row,
  Col
  } from "shards-react";

class AddProduct extends Component {
    constructor(){
        super();
        this.state={
            categories: [],
            isLoading: true,
            category: '',
            newCategory: '',
            requestPending: false
        }
    }

    notify = (message) => {
        switch(this.state.type){
          case "success":
                  toast.success(message);
              break;
          case "warn":
              toast.warn("Error: " + message);
              break;
          default:
              break;
        }
      }


    handleCategory = (event) => {
        let selectedCategory = event.target.value;
        this.setState({ category: selectedCategory });
    }

   

    componentDidMount = () => {
       this.getCategories()
    }

    componentWillUnmount = () => this.abortController.abort();

    abortController = new window.AbortController(); 

    render() { 
        const { categories, isLoading, category } = this.state;
        return (
            <Row>
            <Col lg="8">
              <Content category={category}/>
            </Col>
            <Col lg="4">
                <Card small className="mb-3">
                    <CardHeader className="border-bottom">
                    <h6 className="m-0">Category</h6>
                    </CardHeader>
                    <CardBody className="p-3">
                    <fieldset>
                    {!isLoading ?
                    categories ? categories.map((category, index)  => {
                            return(
                                <FormRadio name="category" onClick={this.handleCategory} key={category.id} value={category.id}>
                                    {category.name}
                                </FormRadio>
                            )
                        })
                        : ""
                    :
                    <LoaderSmall />
                    }
                    
                    </fieldset>
                    {this.state.requestPending ? <LoaderSmall /> : ""}
                    <InputGroup className="ml-auto">
                    <FormInput id="newCategory" placeholder="New category" />
                    <InputGroupAddon type="append">
                        <Button theme="white" className="px-2 bg-success" onClick={this.onSubmitRequest}>
                        <i className="material-icons white">add</i>
                        </Button>
                    </InputGroupAddon>
                    </InputGroup>
                        
                    </CardBody>
                </Card>
         
            </Col>
          </Row> 
            );
    }

    getCategories = () => {
        fetch('https://lshub.herokuapp.com/api/v1/content/category/list',{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + localStorage.getItem('Auth'),
                signal: this.abortController.signal
            }
        })
        .then(response => response.json())
        .then(object => {
            this.setState({
                categories: object.data,
                isLoading: false
            });
        })
        .catch(err => {
            this.setState({
                loading: false
             });
            if (err.name === 'AbortError') return; // expected, this is the abort, so just return
            throw err;
        });
    }

    onSubmitRequest = () => {
        this.setState({requestPending: true});
        let newCategory = document.getElementById('newCategory').value;
      fetch('https://lshub.herokuapp.com/api/v1/content/category/create',{
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'bearer ' + localStorage.getItem('Auth')
          },
          body: JSON.stringify({
              name: newCategory
          })
      })
      .then(response => response.json())
      .then(data => {
          this.setState({requestPending: false});
          switch(data.status){
              case "success":
                  this.setState({type: "success"});
                  this.notify(data.message); 
                  this.getCategories();
              break;
              case "fail":
                  this.setState({type: "warn"});
                  this.notify(data.message); 
              break;
              default:
                      this.setState({type: "warn"});
                  this.notify(data.message);
              break;
          }
      ;})
      .catch(err => {
        this.setState({requestPending: false});
          this.setState({errMessage: 'Error' + err});
      })
    }
}
 
export default AddProduct;