import React, { Component } from "react";
import { Modal, ModalBody } from "shards-react";
// import Glyphicon from "react-bootstrap/lib/Glyphicon";
// import Modal from "react-bootstrap/lib/Modal";

/**
 *
 * Renders a loader modal.
 */

export default class LoadingModal extends Component {
  state = {};
  render() {
    return (
      <Modal show={this.props.show}>
        <ModalBody>
          <h1 className="text-center">
            {
              //<Glyphicon glyph="refresh" />
            }
          </h1>
          <h5 className="text-center">Loading...</h5>
        </ModalBody>
      </Modal>
    );
  }
}
