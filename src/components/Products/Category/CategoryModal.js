import React from "react";
import {
  Modal,
  ModalBody, 
  ModalHeader,
  // ListGroup,
  // ListGroupItem,
  Row,
  Col,
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

import './CategoryModal.css';
import CreateCategory from "./CreateCategory";
import GetImage from "../../common/getImage";

class CategoryModal extends React.Component{
  

render(){
  const {toggle, open, category} = this.props;
  console.log(category)
      return (
        <Modal size="lg" open={open} centered>
            <ModalHeader toggle={toggle}>
                {category.name}
            </ModalHeader>
            <ModalBody>
            <Row>
                <Col>
                    <GetImage image={category.image_url} width="300px"/>
                </Col>
                <Col>
                    <CreateCategory category={category}/>
                </Col>
            </Row>
      </ModalBody>
    </Modal>
      );
    }
  }

  export default CategoryModal;