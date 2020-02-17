import React from "react";
import { Col, FormCheckbox } from "shards-react";

const Invite = () => (
  <Col sm="12" md="4" className="mb-3">
    <fieldset>
      <FormCheckbox toggle small>
        Default
      </FormCheckbox>
    </fieldset>
  </Col>
);

export default Invite;
