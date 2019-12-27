import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Users from '../components/Admin/Users/Users';
import Vendors from '../components/Admin/Users/Vendors';
import Admins from '../components/Admin/Users/Admins';
import Subscribers from '../components/Admin/Users/Subscribers';

const views = {
  showVendors: false,
  showAdmin: false,
  showCoaches: false,
  showUsers: false,
  showSubscribers: false,
}

class UsersOverview extends React.Component {
   constructor(props){
        super(props);
        this.state={
            users: [],
            loading: true,
            showViews: views,
            path: ''
        }
    }
  
  componentWillMount() {
    if(!localStorage.getItem('Auth')){
      this.props.history.push('/signin');
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
  
  fetch('https://lshub.herokuapp.com/api/v1/account/user/list/with_roles',{
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('Auth'),
    },
    signal: this.abortController.signal
  })
  .then(response => response.json())
  .then(object => {
      this.setState({
          users: object.data,
          roles: object.roles,
          loading: false
      })
  })
  .catch(err => {
      this.setState({
          loading: false
      });
      if (err.name === 'AbortError') return; // expected, this is the abort, so just return
      throw err;
  });
 
}

componentDidUpdate(prevProps, prevState){
  if(prevState.path !== this.state.path){
    this.setState({showViews: views});
    this.showContent(this.state.path);
  }
}

componentWillUnmount = () => {
  this.abortController.abort();
  this.unlisten();
};

abortController = new window.AbortController(); 

  render(){
    const {users, loading } = this.state;
    const {showAdmin, showVendors, showUsers, showCoaches, showSubscribers} = this.state.showViews;

    let admins = users.filter(user => {
      return user.UserRole.roleId === 75;
    });

    let vendors = users.filter(user => {
      return user.UserRole.roleId === 99;
    });

    
    return(
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Users Overview" subtitle="Users" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            {
            showAdmin ? 
            <Admins users={admins} loading={loading}/>
              :
                showVendors ?
                <Vendors users={vendors} loading={loading}/>
                :
                  showSubscribers ?
                  <Subscribers users={vendors} loading={loading}/>
                  :
                  <Users users={users} loading={loading}/>
            }
            
          </Col>
        </Row>
      </Container>
    );
    }
  }

export default withRouter(UsersOverview);
