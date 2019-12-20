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
  constructor(){
    super();
    this.state = {
      roles: []
    }
  }

  componentDidMount = () => {
    fetch('https://lshub.herokuapp.com/api/v1/account/role/list',{
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + localStorage.getItem('Auth'),
      },
    })
    .then(response => response.json())
    .then(object => this.setState({roles: object.data}))
    .catch(err => console.log(err))
}

render(){
  const {toggle, open, user, role} = this.props;
  const { roles } = this.state;
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
                        <option value={role ? role.name : ''} className="bg-grey">{role ? role.name : ''}</option>
                        {roles ? roles.map((role)  => {
                          return(
                            <option key={role.id} value={role.name}>{role.name}</option>
                          )
                        })
                      : ''}
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
                              value={user? user.fullname : ''}
                              onChange={() => {}}
                              disabled
                            />
                          </Col>
                          {/* Last Name */}
                          <Col md="6" className="form-group">
                            <label htmlFor="feLastName">Username</label>
                            <FormInput
                              id="feLastName"
                              placeholder="Last Name"
                              onChange={() => {}}
                              disabled
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
                              value={user ? user.email : ''}
                              onChange={() => {}}
                              disabled
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
                              onChange={() => {}}
                              disabled
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
                            disabled
                          />
                        </FormGroup>
                        <FormGroup>
                          <label htmlFor="feAddress">Address</label>
                          <FormInput
                            id="feAddress"
                            placeholder="Address"
                            value="1234 Main St."
                            onChange={() => {}}
                            disabled
                          />
                        </FormGroup>
                        <Row form>
                          {/* Email */}
                          <Col md="6" className="form-group">
                            <label htmlFor="feEmail">Industry</label>
                            <FormInput
                              type="text"
                              id="feEmail"
                              placeholder="Industery"
                              value=""
                              onChange={() => {}}
                              disabled
                            />
                          </Col>
                          {/* Password */}
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">Birthday</label>
                            <FormInput
                              type="date"
                              id="fePassword"
                              onChange={() => {}}
                              disabled
                            />
                          </Col>
                        </Row>
                        <Row form>
                          {/* Email */}
                          <Col md="6" className="form-group">
                            <label htmlFor="feEmail">Years of Experience</label>
                            <FormInput
                              type="number"
                              id="feEmail"
                              placeholder="number"
                              value="1"
                              onChange={() => {}}
                              disabled
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
                              disabled
                            />
                          </Col>
                        </Row>
                        
                        <Row form>
                          {/* Description */}
                          <Col md="12" className="form-group">
                            <label htmlFor="feDescription">Work History</label>
                            <FormTextarea id="feDescription" rows="3"
                            disabled
                             />
                          </Col>
                        </Row>
                        <Button theme="accent">Update</Button>
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