import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  Button
} from "shards-react";

const UserAccountDetails = ({ title }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="firstname">Full Name</label>
                  <FormInput
                    id="firstname"
                    placeholder="First Name"
                    onChange={() => {}}
                    disabled
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="lastname">Username</label>
                  <FormInput
                    id="lastname"
                    placeholder="Last Name"
                    onChange={() => {}}
                    disabled
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="email">Email</label>
                  <FormInput
                    type="email"
                    id="email"
                    placeholder="Email Address"
            
                    value={() => {}}
                    disabled
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <FormInput
                    type="text"
                    id="phone"
                    placeholder="Phone Number"
            
                    value={() => {}}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                  <p className="ml-4" style={{color: 'red'}}>please update the following feilds</p>
                </Row>
                <FormGroup>
                <label htmlFor="location">Location</label>
                <FormInput
                  id="location"
                  placeholder="Location"
                  value={() => {}}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="address">Address</label>
                <FormInput
                  id="address"
                  placeholder="Address"
                  value={() => {}}
                  disabled
                />
              </FormGroup>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="industry">Industry</label>
                  <FormInput
                    type="text"
                    id="industry"
                    placeholder="Industry"
                    value={() => {}}
                    disabled
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="birthday">Birthday</label>
                  <FormInput
                    type="date"
                    id="birthday"
                    placeholder="Phone Number"
                    value={() => {}}
                    disabled
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="experience">Years of Experience</label>
                  <FormInput
                    type="number"
                    id="experience"
                    placeholder="number"
                    value={() => {}}
                    disabled
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="specialty">Specialty</label>
                  <FormInput
                    type="text"
                    id="specialty"
                    placeholder="Specialty"
                    value={() => {}}
                    disabled
                  />
                </Col>
              </Row>
              
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="workHistory">Work History</label>
                  <FormTextarea 
                  id="workHistory" rows="3" 
                  value={() => {}}
                  disabled
                  />
                </Col>
              </Row>
              <Button
               theme="accent"
               onClick={() => {}}
               >Edit</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Profile Details"
};

export default UserAccountDetails;
