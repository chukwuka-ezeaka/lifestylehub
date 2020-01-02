import React from "react";
import PropTypes from "prop-types";
import LoaderSmall from '../../Loaders/LoaderSmall';
import { toast } from 'react-toastify';
import axios from 'axios';
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
            content: '',
            imageLink: '',
            audioLink: '',
            author: '',
            requestPending: false,
            errMessage: '',
            type: '',
            date: '',
            tags: ''
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
      
    handleAuthor = (event) => {
        this.setState({author: event.target.value});
    }

    handleContent = (event) => {
        this.setState({content: event.target.value});
    }

    handleTags = (event) => {
        this.setState({tags: event.target.value});
    }

    handleTitle = (event) => {
        this.setState({title: event.target.value});
    }

    handleDate = (event) => {
        this.setState({date: event.target.value});
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

      handlePublish = (event) => {
        event.preventDefault();
        this.setState({requestPending: true});

        const headers = { headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            Authorization : `Bearer ${localStorage.getItem('Auth')}
            `} 
        }

        const audio = document.getElementById('audio');
        const image = document.getElementById('coverImage');
        
         const audioData = new FormData();
       audioData.append('title', this.state.title)
       audioData.append('description', this.state.content)
       audioData.append('tags', this.state.tags)
       audioData.append('admin', 1)
       audioData.append('audio', audio.files[0])

        const imageData =  new FormData();
        imageData.append('title', this.state.title)
        imageData.append('description', this.state.content)
        imageData.append('tags', this.state.tags)
        imageData.append('admin', 1)
        imageData.append('image', image.files[0])

        
        
        axios.all([
            axios.post('https://lshub.herokuapp.com/api/v1/media/manager/audio/single/create', audioData, headers),
            axios.post('https://lshub.herokuapp.com/api/v1/media/manager/image/single/create', imageData, headers)
          ])
          .then(axios.spread((response1, response2)=> {
              let  audioRes = response1.data.data;
              let  imageRes = response2.data.data;
              console.log(audioRes)
              console.log(imageRes)
              if(audioRes.status === 1 && imageRes.status === 1){
                  const payload = {
                      "title": this.state.title,
                      "content": this.state.content,
                      "author": this.state.author,
                      "date": this.state.date,
                      "image_link": imageRes.url,
                      "audio_link":  audioRes.url,

                  }

                axios.post('https://lshub.herokuapp.com/api/v1/reflection/create', payload, headers)
                .then(object => {
                        this.setState({ requestPending: false });
                        switch(object.data.status){
                        case "success":
                            this.setState({type: "success"});
                            this.notify(object.data.message); 
                        break;
                        case "fail":
                            this.setState({type: "warn"});
                            this.notify(object.data.message); 
                        break;
                        default:
                                this.setState({type: "warn"});
                            this.notify(object.data.message);
                        break;
                    }
                        console.log(object);
                    }, (error) => {
                        this.setState({ requestPending: false });
                        this.setState({type: "warn"});
                        this.notify("Something went wrong please try again..."); 
                        console.log(error);
                    });
              }
          }),
          (error) => {
            this.setState({ requestPending: false });
            this.setState({type: "warn"});
            this.notify("Something went wrong please try again..."); 
            console.log(error);
        });
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
                
                <Form className="quick-post-form" onSubmit={this.handlePublish}>
                    <FormGroup>
                        <label htmlFor="Title">Title</label>
                        <FormInput placeholder="Title" onChange={this.handleTitle} required/>
                    </FormGroup>

                    <FormGroup>
                        <FormTextarea placeholder="Content" onChange={this.handleContent} required/>
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="Tags">Tags</label>
                        <FormInput placeholder="Tags" onChange={this.handleTags} />
                    </FormGroup>

                    <Row>
                    <Col md="6">
                    <FormGroup>
                        <label htmlFor="coverImage">Cover Image</label>
                        <FormInput id="coverImage" placeholder="Image link" type="file" required/>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                    <FormGroup>
                        <label htmlFor="audio">Audio File</label>
                        <FormInput id="audio"placeholder="Audio link" type="file" required/>
                    </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <FormGroup>
                        <label htmlFor="Author">Author</label>
                        <FormInput placeholder="Author" onChange={this.handleAuthor} required/>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <label htmlFor="date">Date</label>
                            <FormInput id="date" type="date" onChange={this.handleDate} required/>
                        </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup className="mb-0">
                    <Button theme="accent" type="submit" disabled={this.state.requestPending}>
                    {this.state.requestPending  ? <LoaderSmall/>: 'Publish Reflection'}
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