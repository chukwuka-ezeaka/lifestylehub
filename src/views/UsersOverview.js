import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import HttpService from '../utils/API';

import PageTitle from "../components/common/PageTitle";
import Loader from "../components/Loaders/Loader";
import ViewUsers from "../components/Admin/Users/ViewUsers";

const _http = new HttpService();

const views = {
  showVendors: false,
  showAdmin: false,
  showCoaches: false,
  showSubscribers: false,
  showVendorCoaches: false
}

class UsersOverview extends React.Component {
   constructor(props){
        super(props);
        this.state={
            users: [],
            loading: true,
            type: '',
            typeName: '',
            path: '',
            errorMessage: '',
            requestPending: false
        }
    }
  

showContent = (handle) => {
  switch(handle){
    case '/users/vendors':
      this.setState({type: 'vendors',typeName: 'Vendors'})
      break;
    case '/users/admins':
      this.setState({type: 'admins',typeName: 'Admins'})
      break;
    case '/users/subscribers':
      this.setState({type: 'subscribers',typeName: 'Subscribers'})
      break;
    case '/users/coaches':
        this.setState({type: 'coaches',typeName: 'Coaches'})
        break;
      case '/users/vendorCoaches':
        this.setState({type: 'vendorcoachs',typeName: ''})
        break;
    default:
      this.setState({type: 'users',typeName: 'Users'})
      break;
  }
}

componentDidMount(){
  this.unlisten = this.props.history.listen((location, action) => {
    this.setState({path: location.pathname});
  });
  const handle = this.props.location.pathname;
  this.showContent(handle);
 
  this.getUser();
}

getUser = () => {
  const url = "account/user/list/with_roles";
  _http.sendGet(url)
  .then(response => {
    response.data ?
    this.setState({ errorMessage: '', users: response.data, loading: false })
    :
    this.setState({ errorMessage: response.message, loading: false })
  })
}

componentDidUpdate(prevProps, prevState){
  if(prevState.path !== this.state.path){
    this.setState({showViews: views});
    this.showContent(this.state.path);
  }
}



updateRole = (payload) => {
    this.setState({
      requestPending: true
  });
    const url = "account/user/role/assign";

    _http.sendPost(url, payload)
    .then(response => {
      console.log(response)
      this.setState({ requestPending: false });
      let type = "";
      if(response.status === "success"){
          type = "success";
          _http.notify(response.message, type)
      }else{
          type = "warn";
          _http.notify(response.message, type)
      }
  });

}



updateProfile = (payload, id) => {
  this.setState({ requestPending: true})
    const url = `account/user/${id}`;
  _http.sendPut(url, payload)
  .then(response => {
      this.setState({ requestPending: false, disable: false });
      // if(response.data ){
          let type = "";
          if(response.status === "success"){
            this.setState({ requestPending: false})
              type = "success";
              _http.notify("Profile updated successfully", type);
              this.getUser();
          }else{
            this.setState({ requestPending: false})
              type = "warn";
              _http.notify(response.message, type)
          }
      
  });
} 

componentWillUnmount = () => {
  this.abortController.abort();
  this.unlisten();
};

abortController = new window.AbortController(); 

  render(){
    const {users, loading, errorMessage, requestPending, type, typeName } = this.state;
    let payload = [];
    let notEmpty = () => users.length > 0;
    
   if(type === 'admins') payload = notEmpty() ? users.filter(user => {
      return user.UserRole.roleId === 75;
    }) : users;

    if(type === 'vendors') payload = notEmpty() ? users.filter(user => {
      return user.UserRole.roleId === 99;
    }) : users;
    
    if(type === 'subscribers') payload = notEmpty() ? users.filter(user => {
      return user.UserRole.roleId === 87;
    }) : users;

    if(type === 'coaches') payload = notEmpty() ? users.filter(user => {
      return user.UserRole.roleId === 100 || user.UserRole.roleId === 103;
    }) : users;

    if(type === 'users') payload = users;

    // let vendorCoaches = notEmpty() ? users.filter(user => {
    //   return user.UserRole.roleId === 103;
    // }) : users;

    return(
      loading ?
      <Container fluid className="main-content-container px-2 pb-4">
       <Loader />
      </Container>
    :
      <Container fluid className="main-content-container px-4 pb-4 mb-3">
         <Row noGutters className="page-header">
              <PageTitle sm="4" title="Users Overview" subtitle="Users" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12"> 
              <ViewUsers 
              users={payload}
              typeName={typeName}
              error={errorMessage}
              profileUpdate={this.updateProfile}
              pending={requestPending}
              roleUpdate={this.updateRole}
              loading={loading}/>
          </Col>
        </Row>
      </Container>
    );
    }
  }

export default withRouter(UsersOverview);
