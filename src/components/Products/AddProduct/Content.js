import React from "react";
import PropTypes from "prop-types";
//import AddCategory from './AddCategory'
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  FormSelect,
  Button,
  Col,
  Row
} from "shards-react";
import HttpService from "../../../utils/API";
import LoaderSmall from "../../Loaders/LoaderSmall"

const _http = new HttpService();

class Content extends React.Component{
    constructor(){
        super();
        this.state ={
            user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {},
            title: '',
            description: '',
            category: 0,
            requestPending: false,
            loading: false,
            errMessage: '',
            categories: []
        }
    }

    handleDescription = (event) => {
        this.setState({description: event.target.value});
    }

    handleTitle = (event) => {
        this.setState({title: event.target.value});
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
        const { user, categories} = this.state;
        const { title } = this.props;
        return (
            <Row>
            <Col lg="8" className="pb-4">
                <Card small className="h-100">
                    {/* Card Header */}
                    <CardHeader className="border-bottom">
                    <h6 className="m-0">{title}</h6>
                    </CardHeader>

                    <CardBody className="d-flex flex-column">
                    
                    <Form onSubmit={this.handlePublish}>
                    <FormGroup>
                        <label htmlFor={user.id}>Category</label>
                        <FormSelect id={user.id} onChange={this.handleCategory} onClick={this.getCategory} required>
                        <option>Select...</option>
                            {categories.map((category)  => {
                            return(
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                            })
                        }
                        </FormSelect>
                    </FormGroup>
                        <FormGroup>
                            <label htmlFor="Title">Title</label>
                            <FormInput placeholder="Title" onChange={this.handleTitle} required/>
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="description">Main body</label>
                            <FormTextarea rows="7"placeholder="main body..." onChange={this.handleDescription} required/>
                        </FormGroup>

                        <Row>
                        <Col md="6">
                        <FormGroup>
                            <label htmlFor="coverImage">Cover Image</label>
                            <FormInput id="coverImage" placeholder="Image link" type="file" required/>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                    
                        </Col>
                        </Row>
                        <FormGroup className="mb-0">
                        <Button theme="accent" type="submit" disabled={this.state.requestPending}>
                        {this.state.requestPending  ? <LoaderSmall/>: 'Publish Content'}
                        </Button>
                        </FormGroup>
                    </Form>
                    </CardBody>
                </Card>
            </Col>
            <Col lg="4" className="pb-4">
                   {/* {<AddCategory/>} */}
            </Col>
          </Row> 
            );
        }

   

        getCategory = () => {
            const url = 'content/category/list';
            this.setState({loading: true});
            _http.sendGet(url)
            .then(response => {
                response.data ?
                this.setState({ errorMessage: '', categories: response.data, loading: false })
                :
                this.setState({ errorMessage: response.message, loading: false })
            })
        }

        handlePublish = (event) => {
            event.preventDefault();
            this.setState({requestPending: true, disable: true});
            const url = 'media/manager/image/single/create';

            const file = document.getElementById('coverImage');
            
            const data = new FormData();
            data.append('title', this.state.title)
            data.append('description', this.state.description)
            data.append('content_type_id', 7)
            data.append('category_id', this.state.category)
            data.append('image', file.files[0])

            //post image data
            _http.sendPost(url, data)
            .then(res => {
                if(res.data){
                    const payload = {
                        "content_media_id" : res.data.id,
                        "owner_id" : this.state.user.id,
                        "category_id" : this.state.category,
                        "content_type_id" : 7,
                        "title" : this.state.title,
                        "description" : this.state.description,
                        // "content_art" : contnet_art
                    }
                    const contentUrl = 'content/create';

                    //post content data
                _http.sendPost(contentUrl, payload)
                .then(response => {
                    this.setState({ requestPending: false });
                    if(response.data ){
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
            });
        }
    }

Content.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Content.defaultProps = {
  title: "New Text"
};

export default Content;