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

class UpdateReflection extends React.Component {
  constructor(props) {
    super(props);
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
    const { reflection, title } = this.props;
    return (
      <Form onSubmit={this.handlePublish}>
        <FormGroup>
          <label htmlFor="Title">Title</label>
          <FormInput
            id="title"
            placeholder="Title"
            defaultValue={reflection.title}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Content</label>
          <FormTextarea
            id="content"
            placeholder="Content"
            rows="10"
            defaultValue={reflection.content}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="Tags">Tags</label>
          <FormInput
            id="tags"
            placeholder="Tags"
            defaultValue={reflection.tags}
          />
        </FormGroup>

        <Row>
          <Col md="6">
            <FormGroup>
              <label htmlFor="coverImage">Cover Image</label>
              <FormInput id="coverImage" placeholder="Image link" type="file" />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label htmlFor="audio">Audio File</label>
              <FormInput id="audio" placeholder="Audio link" type="file" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <label htmlFor="Author">Author</label>
              <FormInput
                id="author"
                placeholder="Author"
                defaultValue={reflection.author}
                required
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label htmlFor="date">Publish Date</label>
              <FormInput
                id="date"
                type="date"
                defaultValue={reflection.date}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="mb-0">
          <Button
            theme="accent"
            type="submit"
            disabled={this.state.requestPending}
          >
            {this.state.requestPending ? <LoaderSmall /> : "Update Reflection"}
          </Button>
        </FormGroup>
      </Form>
    );
  }

  handlePublish = event => {
    event.preventDefault();
    this.setState({ requestPending: true });

    const audioUrl = "media/manager/audio/single/create";
    const imageUrl = "media/manager/image/single/create";

    const audio = document.getElementById("audio");
    const image = document.getElementById("coverImage");
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const tags = document.getElementById("tags").value;
    const author = document.getElementById("author").value;
    const date = document.getElementById("date").value;
    const audioData = new FormData();
    const imageData = new FormData();

    if (audio.files[0]) {
      audioData.append("title", title);
      audioData.append("description", content);
      audioData.append("tags", tags);
      audioData.append("admin", 1);
      audioData.append("audio", audio.files[0]);
    }
    if (image.files[0]) {
      imageData.append("title", title);
      imageData.append("description", content);
      imageData.append("tags", tags);
      imageData.append("admin", 1);
      imageData.append("image", image.files[0]);
    }

    if (image.files[0] && audio.files[0]) {
      axios
        .all([
          _http.sendPost(audioUrl, audioData),
          _http.sendPost(imageUrl, imageData)
        ])
        .then(
          axios.spread((response1, response2) => {
            let audioRes = response1.data;
            let imageRes = response2.data;
            if (audioRes.status === 1 && imageRes.status === 1) {
              const payload = {
                title: title,
                content: content,
                author: author,
                date: date,
                image_link: imageRes.url,
                audio_link: audioRes.url
              };
              this.update(payload);
            }
          })
        );
    } else if (image.files[0]) {
      _http.sendPost(imageUrl, imageData).then(response => {
        let imageRes = response.data;
        if (imageRes.status === 1) {
          const payload = {
            title: title,
            content: content,
            author: author,
            date: date,
            image_link: imageRes.url,
            audio_link: this.props.reflection.audio_link
          };
          this.update(payload);
        }
      });
    } else if (audio.files[0]) {
      _http.sendPost(audioUrl, audioData).then(response => {
        let audioRes = response.data;
        if (audioRes.status === 1) {
          const payload = {
            title: title,
            content: content,
            author: author,
            date: date,
            image_link: this.props.reflection.image_link,
            audio_link: audioRes.url
          };
          this.update(payload);
        }
      });
    } else {
      const payload = {
        title: title,
        content: content,
        author: author,
        date: date,
        image_link: this.props.reflection.image_link,
        audio_link: this.props.reflection.audio_link
      };
      this.update(payload);
    }
  };

  update = payload => {
    const reflectionUrl = `reflection/${this.props.reflection.id}`;
    _http.sendPut(reflectionUrl, payload).then(response => {
      this.setState({ requestPending: false });
      if (response.data) {
        let type = "";
        if (response.status === "success") {
          type = "success";
          _http.notify(response.message, type);
        } else {
          type = "warn";
          _http.notify(response.message, type);
        }
      } else {
        _http.notify(response.message);
        this.setState({ requestPending: false });
      }
    });
  };
}

UpdateReflection.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UpdateReflection.defaultProps = {
  title: "Update Reflection"
};

export default UpdateReflection;
