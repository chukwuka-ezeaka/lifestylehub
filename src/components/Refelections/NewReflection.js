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
            authur: ''
        }
    }

    handleAudio = (event) => {
        this.setState({audioLink: event.target.value});
    }

    handleAurthur = (event) => {
        this.setState({authur: event.target.value});
    }

    handleDescription = (event) => {
        this.setState({description: event.target.value});
    }

    handleImage = (event) => {
        this.setState({imageLink: event.target.value});
    }

    handleTitle = (event) => {
        this.setState({title: event.target.value});
    }

    handlePublish = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/api/v1/auth/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.description,
                image_llink: this.state.imageLink,
                audio_link: this.state.audioLink,
                authur: this.state.authur
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
                    <FormInput placeholder="Aurthur" onChange={this.handleAurthur}/>
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