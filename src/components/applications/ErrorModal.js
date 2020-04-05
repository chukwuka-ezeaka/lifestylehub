import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "shards-react";

/**
 *
 * Renders a Error modal if app encounter any error.
 */

export default class ErrorModal extends Component {
  render() {
    const { show, errorMessage, onToggle } = this.props;
    return (
      <Modal open={show} toggle={onToggle}>
        <ModalHeader>Error</ModalHeader>
        <ModalBody className="text-center">
          {
            //   <h1>
            //     <Glyphicon glyph="alert" />
            // </h1>
          }
          {errorMessage}
        </ModalBody>
      </Modal>
    );
  }
}
