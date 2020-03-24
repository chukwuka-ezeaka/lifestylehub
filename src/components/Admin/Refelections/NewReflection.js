import React from "react";
import PropTypes from "prop-types";
import LoaderSmall from "../../Loaders/LoaderSmall";
import axios from "axios";
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
import HttpService from "../../../utils/API";

const _http = new HttpService();

class NewReflection extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      imageLink: "",
      audioLink: "",
      author: "",
      requestPending: false,
      errMessage: "",
      type: "",
      date: "",
      tags: ""
    };
  }

  handleAuthor = event => {
    this.setState({ author: event.target.value });
  };

  handleContent = event => {
    this.setState({ content: event.target.value });
  };

  handleTags = event => {
    this.setState({ tags: event.target.value });
  };

  handleTitle = event => {
    this.setState({ title: event.target.value });
  };

  handleDate = event => {
    this.setState({ date: event.target.value });
  };

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

  render() {
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
              <FormInput
                placeholder="Title"
                onChange={this.handleTitle}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormTextarea
                placeholder="Content"
                onChange={this.handleContent}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="Tags">Tags</label>
              <FormInput placeholder="Tags" onChange={this.handleTags} />
            </FormGroup>

    handlePublish = (event) => {
        event.preventDefault();
        this.setState({requestPending: true});

        const audioUrl = 'media/manager/audio/single/create';
        const imageUrl = 'media/manager/image/single/create';

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
            _http.sendPost(audioUrl, audioData),
            _http.sendPost(imageUrl, imageData)
            ])
            .then(axios.spread((response1, response2)=> {
                let  audioRes = response1.data;
                let  imageRes = response2.data;
               // console.log(audioRes)
               // console.log(imageRes)
                if(audioRes.status === 1 && imageRes.status === 1){
                    const payload = {
                        "title": this.state.title,
                        "content": this.state.content,
                        "author": this.state.author,
                        "date": this.state.date,
                        "image_link": imageRes.url,
                        "audio_link":  audioRes.url,

                    }
                const reflectionUrl = 'reflection/create';
                _http.sendPost(reflectionUrl, payload)
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
              } else {
                _http.notify(response.message);
                this.setState({ requestPending: false });
              }
            });
          }
        })
      );
  };
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
