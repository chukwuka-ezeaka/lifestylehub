import React from "react";
import {
  Modal,
  ModalBody, 
  ModalHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";

import './UsersModal.css';

class UsersModal extends React.Component{
  

  componentDidMount = () => {
    //fetch('https://pacific-hollows-12017.herokuapp.com/users', {
    fetch('https://lshub.herokuapp.com/api/v1/account/role/list',{
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + localStorage.getItem('Auth')
      },
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

render(){
  const {toggle, open, user} = this.props;
      return (
        <div>
          <Modal size="lg" open={open}>
            <ModalHeader toggle={toggle}>
              {user ? user.fullname : ''}
                  <div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon type="prepend">
                        <InputGroupText className="bg-green text-white">Role</InputGroupText>
                      </InputGroupAddon>
                      <FormSelect>
                        <option>{user ? user.accounttype : ''}</option>
                        <option>Vendor</option>
                        <option>Counsellor</option>
                        <option>Subscriberr</option>
                      </FormSelect>
                    </InputGroup>
                  </div>
            </ModalHeader>
            <ModalBody>
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
                            <label htmlFor="feEmail">Email</label>
                            <FormInput
                              type="email"
                              id="feEmail"
                              placeholder="Email Address"
                              value="sierra@example.com"
                              onChange={() => {}}
                              autoComplete="email"
                            />
                          </Col>
                          {/* Password */}
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">Phone Number</label>
                            <FormInput
                              type="text"
                              id="fePassword"
                              placeholder="Phone Number"
                              value="EX@MPL#P@$$w0RD"
                              onChange={() => {}}
                              autoComplete="current-password"
                            />
                          </Col>
                        </Row>
                        <Row>
                          
                          </Row>
                          <FormGroup>
                          <label htmlFor="feAddress">Location</label>
                          <FormInput
                            id="feAddress"
                            placeholder="Location"
                            value="1234 Main St."
                            onChange={() => {}}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="feAddress">Address</label>
                          <FormInput
                            id="feAddress"
                            placeholder="Address"
                            value="1234 Main St."
                            onChange={() => {}}
                          />
                        </FormGroup>
                        <Row form>
                          {/* Email */}
                          <Col md="6" className="form-group">
                            <label htmlFor="feEmail">Industry</label>
                            <FormInput
                              type="text"
                              id="feEmail"
                              placeholder="Email Address"
                              value="sierra@example.com"
                              onChange={() => {}}
                              autoComplete="email"
                            />
                          </Col>
                          {/* Password */}
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">Birthday</label>
                            <FormInput
                              type="date"
                              id="fePassword"
                              placeholder="Phone Number"
                              value="EX@MPL#P@$$w0RD"
                              onChange={() => {}}
                              autoComplete="current-password"
                            />
                          </Col>
                        </Row>
                        <Row form>
                          {/* Email */}
                          <Col md="6" className="form-group">
                            <label htmlFor="feEmail">Years of Experience</label>
                            <FormInput
                              type="email"
                              id="feEmail"
                              placeholder="number"
                              value="1"
                              onChange={() => {}}
                              autoComplete="email"
                            />
                          </Col>
                          {/* Password */}
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">Specialty</label>
                            <FormInput
                              type="text"
                              id="fePassword"
                              placeholder="Specialty"
                              value=""
                              onChange={() => {}}
                              autoComplete="current-password"
                            />
                          </Col>
                        </Row>
                        
                        <Row form>
                          {/* Description */}
                          <Col md="12" className="form-group">
                            <label htmlFor="feDescription">Work History</label>
                            <FormTextarea id="feDescription" rows="3" />
                          </Col>
                        </Row>
                        <Button theme="accent">Update Profile</Button>
                      </Form>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }

  export default UsersModal;