import React from "react";
import { 
    FormCheckbox,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    FormInput,
    FormTextarea,
    FormSelect,
    Button,
    Col,
    Row
} from "shards-react";

const Subscriptions = () => (
  <Row>
  <Col lg="8" className="pb-4">
      <Card small className="h-100">
          {/* Card Header */}
          <CardHeader className="border-bottom">
          <h6 className="m-0">Subscriptions</h6>
          </CardHeader>

          <CardBody className="d-flex flex-column">
            <fieldset>
            <FormCheckbox toggle small>
                Subscription based on Authors
            </FormCheckbox>
            </fieldset>
            <fieldset>
            <FormCheckbox toggle small>
                Subscription based on Categories
            </FormCheckbox>
            </fieldset>
          </CardBody>
      </Card>
  </Col>
 
</Row>
);

export default Subscriptions;
