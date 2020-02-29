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
      <Modal show={this.props.show}>
        <ModalHeader>
          <Modal titleClass>Error</Modal>
        </ModalHeader>

        <ModalBody>
          <h1 className="text-center">
            {
              //<Glyphicon glyph="alert" />
            }
          </h1>
          <h5 className="text-center">{this.props.errorMessage}</h5>
        </ModalBody>
      </Modal>
    );
  }
}
