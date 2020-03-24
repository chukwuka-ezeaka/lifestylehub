import React from "react";
import {
  Modal,
  ModalBody, 
  ModalHeader,
  // ListGroup,
  // ListGroupItem,
  // Row,
  // Col,
  // Form,
  // FormGroup,
  // FormInput,
  // FormTextarea,
  // Button,
  // InputGroup,
  // InputGroupAddon,
  // InputGroupText,
  // FormSelect
} from "shards-react";

import './SingleMediaModal.css';
import GetAudio from "../../common/GetAudio";
import GetVideo from "../../common/GetVideo";

class SingleMedia extends React.Component{
  

render(){
  const {toggle, open, media} = this.props;
  let playMedia = "";
  if(media){
    let getMedia = null;
    if(media.content_media.media_type.id === 1){
      getMedia = <GetVideo width="100%" video={media.content_media.url}/>;
    }
    if(media.content_media.media_type.id === 5){
      getMedia = <GetAudio width="100%" audio={media.content_media.url}/>;
    }
    return(
      playMedia =  <Modal size="lg" open={open} centered>
      <ModalHeader toggle={toggle}>
        {media.title}
      </ModalHeader>
      <ModalBody>
        <div>
          {getMedia}
        </div>
      </ModalBody>
    </Modal>
    )
  }
  
      return (
        <div>
         {playMedia}
        </div>
      );
    }
  }

  export default SingleMedia;