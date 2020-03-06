import React from "react";

import LoaderSmall from '../../Loaders/LoaderSmall';
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
import HttpService from "../../../utils/API";

const _http = new HttpService();

class UsersModal extends React.Component{
  constructor(){
    super();
    this.state = {
      roles: [],
      loading: false
    }
  }

  handleRole = (event) => {
    this.setState({
      loading: true
   });
    const userId = event.target.id;
    const roleId = event.target.value;
    //console.log(userId, value)

    const url = "account/user/role/assign";
    const postData = {
      user_id: userId,
      role_id: roleId
    }
    _http.sendPost(url, postData)
    .then(response => {
        if(response.data ){
            this.setState({loading: false});
            let type = "";
            if(response.status === "success"){
                type = "success";
                _http.notify(response.message, type)
            }else{
                type = "warn";
                _http.notify(response.message, type)
            }
        
        }else{
            _http.notify(response.message)
            this.setState({loading: false })
        }
    })
  }


  componentDidMount = () => {
    const url = 'account/role/list';
    _http.sendGet(url)
    .then(res => {
        this.setState({
          roles: res.data
        })
    })
  }

componentWillUnmount = () => {
  this.abortController.abort();
};

abortController = new window.AbortController(); 

render(){
  const {toggle, open, user} = this.props;
  const { roles, loading } = this.state;
  
      return (
        <div>
          <Modal size="lg" open={open}>
            <ModalHeader toggle={toggle}>
              {open ? user.fullname : ''}
                  <div>
                    {loading ? <LoaderSmall /> : ''}
                    <InputGroup className="mb-3">
                      <InputGroupAddon type="prepend">
                        <InputGroupText className="bg-green text-white">Role</InputGroupText>
                      </InputGroupAddon>
                      <FormSelect id={open? user.id : ""} onChange={this.handleRole}>
                      <option value={open ? user.UserRole.Role.id : ''}>{open ? user.UserRole.Role.name : ''}</option>
                        {roles ? roles.map((role)  => {
                          return(
                            <option key={role.id} value={role.id}>{role.name}</option>
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
                        <Button theme="accent" className="mr-1">Update</Button> 
                        <Button theme="accent" className="mr-3 bg-warning">Block</Button>
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