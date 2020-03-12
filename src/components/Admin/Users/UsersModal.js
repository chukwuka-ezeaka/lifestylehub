import React from "react";

import LoaderSmall from '../../Loaders/LoaderSmall';
import {
  Modal,
  ModalBody, 
  ModalHeader,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";

import './UsersModal.css';
import HttpService from "../../../utils/API";
import UserAccountDetails from "../../user-profile/UserAccountDetails";
import UserDetails from "../../user-profile/UserDetails";

const _http = new HttpService();

class UsersModal extends React.Component{
  constructor(){
    super();
    this.state = {
      roles: [],
      loading: false,
      countries: [],
      categories: []
    }
  }

  handleRole = (event) => {
    this.setState({
      loading: true
   });
    const userId = event.target.id;
    const roleId = event.target.value;
    const payload = {
      user_id: userId,
      role_id: roleId
    }
    
    this.props.updateRole(payload);
  }

  getCategories = () => {
    if(!this.state.categories[0]){
      const url = 'content/category/list';
      _http.sendGet(url)
      .then(response => {
          response.data ?
          this.setState({ categories: response.data})
          :
          _http.notify(response.message);
      })
  }
  }
  
  getCountries = () => {
  if(!this.state.countries[0]){
    const url = 'region/country/list';
    _http.sendGet(url)
    .then(response => {
        response.data ?
        this.setState({ countries: response.data})
        :
        _http.notify(response.message);
    })
  }
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

// componentDidUpdate(prevProps, prevState){
//   if(prevProps.user !== this.props.user){
//     this.setState({showViews: views});
//     this.showContent(this.state.path);
//   }
// }

abortController = new window.AbortController(); 

render(){
  const {toggle, open, user, updateProfile} = this.props;
  const { roles, loading } = this.state;
  
      return (
        <div>
          <Modal size="lg" open={open}>
            <ModalHeader toggle={toggle}>
              {open ? user.firstname + " " + user.lastname : ''}
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
            <ModalBody className="px-2 py-2">
              <Row>
                <Col md="5">
                  <UserDetails user={user} pending={this.state.requestPending}/>
                </Col>
                <Col md="7">
                  <UserAccountDetails 
                  user={user}
                  getCategories={this.getCategories} 
                  categories={this.state.categories} 
                  getCountries={this.getCountries} 
                  countries={this.state.countries}
                  updateProfile={updateProfile}
                  pending={this.state.requestPending}
                  />
                </Col>
              </Row>
              
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }

  export default UsersModal;