import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  Button,
  Col,
  Row,
  FormSelect
} from "shards-react";
import HttpService from "../../../../utils/API";
import LoaderSmall from "../../../Loaders/LoaderSmall";

const _http = new HttpService();

class Content extends React.Component{
    constructor(){
        super();
        this.state ={
            user: localStorage.getItem('user'),
            title: '',
            type:'',
            types:[],
            category: '',
            categories:[],
            errorMessage: ''
        }
    }
  
    handleTitle = (event) => {
        this.setState({title: event.target.value});
    }

    handleType = (event) => {
        this.setState({content: event.target.value});
    }

    handleCategory = (event) => {
        this.setState({category: event.target.value});
    }

   /* checkMimeType=(event)=>{
        //getting file object
        let file = event.target.file[0] 
        //define message container
        let err = ''
        // list allow mime type
       const types = ['image/png', 'image/jpeg', 'image/gif']
         // compare file type find doesn't matach
             if (types.every(type => file.type !== type)) {
             // create error message and assign to container   
             err += file.type+' is not a supported format\n';
           }
       if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            console.log(err)
             return false; 
        }
       return true;
      
      }*/


    render(){
        const { title } = this.props;
        const { types, user, categories} = this.state;
        return (
            <Card small className="h-100">
                {/* Card Header */}
                <CardHeader className="border-bottom">
                <h6 className="m-0">{title}</h6>
                </CardHeader>

                <CardBody className="d-flex flex-column">
                <Form onSubmit={this.handlePublish}>
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label htmlFor={user.id}>Content type</label>
                            <FormSelect id={user.id} onChange={this.handleType} onClick={this.getType} required>
                            <option>Select...</option>
                                {types ? types.map((type)  => {
                                return(
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                )
                                })
                            : <option><LoaderSmall/></option>}
                            </FormSelect>
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                            <label htmlFor={user.id}>Category</label>
                            <FormSelect id={user.id} onChange={this.handleCategory} onClick={this.getCategory} required>
                            <option>Select...</option>
                                {categories ? categories.map((category)  => {
                                return(
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )
                                })
                            : <option><LoaderSmall/></option>}
                            </FormSelect>
                        </FormGroup>
                        </Col>
                    </Row>     
                    <FormGroup>
                        <label htmlFor="title">Title</label>
                        <FormInput id="Title" type="text" placeholder="Title" onChange={this.handleTitle} required/>
                     </FormGroup>

                    <Row>
                    <Col md="6">
                    <FormGroup>
                        <label htmlFor="coverImage">Select File</label>
                        <FormInput id="coverImage" type="file" onChange={this.handleFile} required/>
                        </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup className="mb-0">
                    <Button theme="accent" type="submit" >
                        Publish Content
                    </Button>
                    </FormGroup>
                </Form>
                </CardBody>
            </Card>
            );
        }

        handlePublish = (event) => {
            event.preventDefault();
            this.setState({requestPending: true});
            const url = "#";
            const postData = {
                name: this.state.permission
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

        getType = () => {
            const url = 'content/type/list';
            _http.sendGet(url)
            .then(response => {
                response.data ?
                this.setState({ errorMessage: '', types: response.data, loading: false })
                :
                this.setState({ errorMessage: response.message, loading: false })
            })
        }

        getCategory = () => {
            const url = 'content/category/list';
            _http.sendGet(url)
            .then(response => {
                response.data ?
                this.setState({ errorMessage: '', categories: response.data, loading: false })
                :
                this.setState({ errorMessage: response.message, loading: false })
            })
        }

      
    }

Content.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Content.defaultProps = {
  title: "Add Content"
};

export default Content;