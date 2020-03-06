import React, { Component } from "react";
import { Modal, ModalBody } from "shards-react";

/**
 *
 * Renders a loader modal.
 */

export default class LoadingModal extends Component {
  state = {};
  render() {
    return (
      <Modal className="text-center" open={this.props.show}>
        <ModalBody>
          {
            // <h1 className="text-center">
            //     //<Glyphicon glyph="refresh" />
            // </h1>
          }
          Loading...
        </ModalBody>
      </Modal>
    );
  }
}
