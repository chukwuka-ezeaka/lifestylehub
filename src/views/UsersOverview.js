import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import HttpService from '../utils/API';

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
            errorMessage: ''
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



updateRole = (userId, roleId) => {
    this.setState({
      loading: true
  });
    //console.log(userId, value)
    const payload = {
      user_id: userId,
      role_id: roleId
    }

    const url = "account/user/role/assign";

    _http.sendPost(url, payload)
    .then(response => {
      this.setState({ requestPending: false });
      if(response.data ){
          this.setState({requestPending: true});
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
          this.setState({requestPending: false })
      }
  });

}

componentWillUnmount = () => {
  this.abortController.abort();
  this.unlisten();
};

abortController = new window.AbortController(); 

  render(){
    const {users, loading, errorMessage } = this.state;
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
            <Admins users={admins} error={errorMessage} loading={loading}/>
              :
                showVendors ?
                <Vendors users={vendors} error={errorMessage} loading={loading}/>
                :
                  showSubscribers ?
                  <Subscribers users={subscribers} error={errorMessage} loading={loading}/>
                  :
                  showCoaches ?
                  <Coaches users={coaches} error={errorMessage} loading={loading}/>
                  :
                    <Users users={users} error={errorMessage} loading={loading}/>
            }
            
          </Col>
        </Row>
      </Container>
    );
    }
  }

export default withRouter(UsersOverview);
