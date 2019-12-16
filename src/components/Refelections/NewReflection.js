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
  Row
} from "shards-react";

class NewReflection extends React.Component{
    constructor(){
        super();
        this.state ={
            title: '',
            description: '',
            imageLink: '',
            audioLink: '',
            author: ''
        }
    }

    handleAudio = (event) => {
        this.setState({audioLink: event.target.files[0]});
    }

    handleAuthor = (event) => {
        this.setState({author: event.target.value});
    }

    handleDescription = (event) => {
        this.setState({description: event.target.value});
    }

    handleImage = (event) => {
        this.setState({imageLink: event.target.files[0]});
        console.log(this.state.imageLink)
    }

    handleTitle = (event) => {
        this.setState({title: event.target.value});
    }

    checkMimeType=(event)=>{
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
      
      }

    handlePublish = (event) => {
        event.preventDefault();
        fetch('https://lshub.herokuapp.com/api/v1/reflection/create',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + localStorage.getItem('Auth')
            },
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.description,
                image_link: this.state.imageLink,
                audio_link: this.state.audioLink,
                author: this.state.author
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    

    render(){
        const { title, user } = this.props;
        return (
            <Card small className="h-100">
                {/* Card Header */}
                <CardHeader className="border-bottom">
                <h6 className="m-0">{title}</h6>
                </CardHeader>

                <CardBody className="d-flex flex-column">
                <Form className="quick-post-form">
                    <FormGroup>
                    <FormInput placeholder="Title" onChange={this.handleTitle}/>
                    </FormGroup>

                    <FormGroup>
                    <FormTextarea placeholder="Description" onChange={this.handleDescription}/>
                    </FormGroup>

                    <Row>
                    <Col md="6">
                    <FormGroup>
                        <label htmlFor="coverImage">Cover Image</label>
                        <FormInput id="coverImage" type="file" onChange={this.handleImage}/>
                        </FormGroup>
                    </Col>
                    {/* Last Name */}
                    <Col md="6">
                    <FormGroup>
                        <label htmlFor="audio">Audio File</label>
                        <FormInput id="audio" type="file" onChange={this.handleAudio}/>
                    </FormGroup>
                    </Col>
                    </Row>

                    <FormGroup>
                    <FormInput placeholder="Author" onChange={this.handleAuthor}/>
                    </FormGroup>

                    <FormGroup className="mb-0">
                    <Button theme="accent" type="submit" onClick={this.handlePublish}>
                        Publish Reflection
                    </Button>
                    </FormGroup>
                </Form>
                </CardBody>
            </Card>
            );
        }
    }

NewReflection.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

NewReflection.defaultProps = {
  title: "New Reflection"
};

export default NewReflection;