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

class SingleMedia extends React.Component{
  

render(){
  const {toggle, open, media} = this.props;
  let playAudio = "";
  if(media){
   return(
    playAudio =  <Modal size="md" open={open} centered>
    <ModalHeader toggle={toggle}>
      {media.title}
    </ModalHeader>
    <ModalBody>
        <GetAudio audio={media.content_media.url}/>
    </ModalBody>
  </Modal>
   )
  }
  
      return (
        <div>
         {playAudio}
        </div>
      );
    }
  }

  export default SingleMedia;