import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
<<<<<<< HEAD:src/views/UsersOverview.js
import HttpService from '../utils/API';
=======
import HttpService from "../API";
>>>>>>> homefeature:lifestylehub/src/views/UsersOverview.js

import PageTitle from "../components/common/PageTitle";
import Users from '../components/Admin/Users/Users';
import Vendors from '../components/Admin/Users/Vendors';
import Admins from '../components/Admin/Users/Admins';
import Subscribers from '../components/Admin/Users/Subscribers';
import Coaches from '../components/Admin/Users/Coaches';
import Loader from "../components/Loaders/Loader";

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
            showViews: views,
            path: '',
            errorMessage: '',
            requestPending: false
        }
    }
  

showContent = (handle) => {
  switch(handle){
    case '/users/vendors':
      this.setState({showViews: {showVendors: true}})
      break;
    case '/users/admins':
      this.setState({showViews: {showAdmin: true}})
      break;
    case '/users/subscribers':
      this.setState({showViews: {showSubscribers: true}})
      break;
    case '/users/coaches':
        this.setState({showViews: {showCoaches: true}})
        break;
      case '/users/vendorCoaches':
        this.setState({showViews: {showVendorCoaches: true}})
        break;
    default:
      this.setState({showViews: {showUsers: true}})
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
    const {users, loading, errorMessage, requestPending } = this.state;
    const {showAdmin, showVendors, showCoaches, showSubscribers } = this.state.showViews;
    let notEmpty = () => users.length > 0;

    let admins = notEmpty() ? users.filter(user => {
      return user.UserRole.roleId === 75;
    }) : users;

    let vendors = notEmpty() ? users.filter(user => {
      return user.UserRole.roleId === 99;
    }) : users;
    
    let subscribers = notEmpty() ? users.filter(user => {
      return user.UserRole.roleId === 87;
    }) : users;

    let coaches = notEmpty() ? users.filter(user => {
      return user.UserRole.roleId === 100 || user.UserRole.roleId === 103;
    }) : users;

    // let vendorCoaches = notEmpty() ? users.filter(user => {
    //   return user.UserRole.roleId === 103;
    // }) : users;

    return(
      loading ?
      <Container fluid className="main-content-container px-2 pb-4">
       <Loader />
      </Container>
    :
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Users Overview" subtitle="Users" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            {
            showAdmin ? 
              <Admins 
              users={admins}
              error={errorMessage}
              profileUpdate={this.updateProfile}
              pending={requestPending}
              roleUpdate={this.updateRole}
              loading={loading}/>
              :
              showVendors ?
              <Vendors 
              users={vendors} 
              error={errorMessage} 
              profileUpdate={this.updateProfile} 
              pending={requestPending} 
              roleUpdate={this.updateRole} 
              loading={loading}/>
              :
              showSubscribers ?
              <Subscribers 
              users={subscribers} 
              error={errorMessage} 
              ProfileUpdate={this.updateProfile} 
              pending={requestPending}  
              roleUpdate={this.updateRole} 
              loading={loading}/>
              :
              showCoaches ?
              <Coaches 
              users={coaches} 
              error={errorMessage} 
              profileUpdate={this.updateProfile} 
              pending={requestPending} 
              roleUpdate={this.updateRole}
              loading={loading}/>
              :
              <Users 
              users={users} 
              error={errorMessage} 
              profileUpdate={this.updateProfile} 
              pending={requestPending} 
              roleUpdate={this.updateRole} 
              loading={loading}/>
          }
            
          </Col>
        </Row>
      </Container>
    );
    }
  }

export default withRouter(UsersOverview);
