import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "shards-react";
// import Glyphicon from "react-bootstrap/Glyphicon";
// import Modal from "react-bootstrap/lib/Modal";
/**
 *
 * Renders a Error modal if app encounter any error.
 */

export default class ErrorModal extends Component {
  state = {};
  render() {
    return (
      <Modal open={this.props.show}>
        <ModalHeader>Error</ModalHeader>
        <ModalBody className="text-center">
          {
            //   <h1>
            //     <Glyphicon glyph="alert" />
            // </h1>
          }
          {this.props.errorMessage}
        </ModalBody>
      </Modal>
    );
  }
}
