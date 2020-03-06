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
} from "shards-react";
import HttpService from "../../utils/API";
import LoaderSmall from "../Loaders/LoaderSmall";

const _http = new HttpService();

class CreatePost extends React.Component{
    constructor(){
        super();
        this.state ={
            content: '',
            requestPending: false,
            errMessage: '',
            status: '',
            tags: ''
        }
    }
    

    handleContent = (event) => {
        this.setState({content: event.target.value});
    }

    handleTags = (event) => {
        this.setState({tags: event.target.value});
    }


    render(){
        const { title } = this.props;
        return (
            <Card small className="h-100">
                {/* Card Header */}
                <CardHeader className="border-bottom">
                <h6 className="m-0">{title}</h6>
                </CardHeader>

                <CardBody className="d-flex flex-column">
                
                <Form onSubmit={this.handlePublish}>
                   
                    <FormGroup>
                        <FormTextarea placeholder="Content" rows="7" onChange={this.handleContent} required/>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="Tags">Tags</label>
                        <FormInput placeholder="Tags" onChange={this.handleTags} required/>
                    </FormGroup>

                   <FormGroup className="mb-0">
                    <Button theme="accent" type="submit" disabled={this.state.requestPending}>
                    {this.state.requestPending  ? <LoaderSmall/>: 'Publish'}
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

        const payload = {
            "content": this.state.content,
            "tags": this.state.tags,
	        "status": "publish"
        }
        const url = 'post/create';
        _http.sendPost(url, payload)
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
    }

CreatePost.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

CreatePost.defaultProps = {
  title: "New Post"
};

export default CreatePost;