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

const UpdateProfile = ({ title }) => (
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
                  <label htmlFor="feFirstName">Full Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    value="Sierra"
                    onChange={() => {}}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Username</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value="Brooks"
                    onChange={() => {}}
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
            
                    onChange={() => {}}
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <FormInput
                    type="text"
                    id="phone"
                    placeholder="Phone Number"
            
                    onChange={() => {}}
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
                  onChange={() => {}}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="address">Address</label>
                <FormInput
                  id="address"
                  placeholder="Address"
                  onChange={() => {}}
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
                    onChange={() => {}}
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="birthday">Birthday</label>
                  <FormInput
                    type="date"
                    id="birthday"
                    placeholder="Phone Number"
                    onChange={() => {}}
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
                    onChange={() => {}}
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="specialty">Specialty</label>
                  <FormInput
                    type="text"
                    id="specialty"
                    placeholder="Specialty"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              
              <Row form>
                {/* Description */}
                <Col md="12" className="form-group">
                  <label htmlFor="workHistory">Work History</label>
                  <FormTextarea 
                  id="workHistory" rows="3" 
                  onChange={() => {}}
                  />
                </Col>
              </Row>
              <Button
               theme="accent"
               onClick={() => {}}
               >Update Profile</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UpdateProfile.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UpdateProfile.defaultProps = {
  title: "Profile Details"
};

export default UpdateProfile;
