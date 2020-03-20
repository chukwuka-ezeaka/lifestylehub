import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import { withRouter } from "react-router-dom";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile/UserDetails";
import UserAccountDetails from "../components/user-profile/UserAccountDetails";
import HttpService from "../utils/API";
import Loader from "../components/Loaders/Loader";

const _http = new HttpService();

class UserProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      user :localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      userData: {},
      loading: true,
      categories: [],
      countries: [],
      requestPending: false
    }
  }

  componentDidMount(){
    this.getUser();
  }

  // componentDidUpdate(){
  //   this.getUser();
  // }

 getUser = () => {
  const url = `account/user/list?email=${this.state.user.email}`;
    _http.sendGet(url)
    .then(response => {
      if(response.status === 'success'){
      this.setState({ userData: response.data[0], loading: false})
      }else{
      this.setState({ loading: false})
      _http.notify(response.message);
      }
    })
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

updatePhoto = (payload) => {
    this.setState({ requestPending: true})
    const url = `user/profile/photo/`;
  _http.sendPut(url, payload)
  .then(response => {
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

  render(){
    let content = <Loader />
    if(!this.state.loading){
      content =  <Row>
          <Col lg="5">
            <UserDetails 
            user={this.state.userData} 
            pending={this.state.requestPending} 
            updatePhoto={this.updatePhoto}
            updateProfile={this.updateProfile}/>
          </Col>
          <Col lg="7">
            <UserAccountDetails 
            user={this.state.userData} 
            getCategories={this.getCategories} 
            categories={this.state.categories} 
            getCountries={this.getCountries} 
            countries={this.state.countries}
            updateProfile={this.updateProfile}
            pending={this.state.requestPending}/>
          </Col>
        </Row>
    }
    return (
      <Container fluid className="main-content-container mt-2 px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="My Profile"
            subtitle="Overview"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>
       {content}
      </Container>
    );
  }
};

export default withRouter(UserProfile);
