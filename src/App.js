import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

//import routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "tachyons";


import { DefaultLayout, HomeLayout } from "./layouts";
// Route Views
import Home from "./views/Home";
import Register from "./views/Register";
import SignIn from "./views/SignIn";
import Dashboard from "./views/Dashboard";
import UserProfile from "./views/UserProfile";


import 'tachyons';


const initialState = {
  user: {
    id: '',
    fullname: '',
    username: '',
    email: '',
    phone: ''
  }
}

class App extends React.Component{
  constructor(){
    super()
    this.state = initialState
    
  }

  loadUser = (user) => {
    console.log(user);
    this.setState({
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phone: user.phonenumber,
        role: user.accounttype,
      }
    });
  }

currentUser = ()=> {
  return this.state.user
}

  render(){
    console.log(this.state.user);
    return(
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) =>
              <Redirect to='/home'/>}
          />
          <Route
            path='/home'
            render={(props) =>
              <HomeLayout>
              <Home />
            </HomeLayout>}
          />
          <Route
            path='/register'
            render={(props) =>
              <HomeLayout>
              <Register loadUser = {this.loadUser}/>
            </HomeLayout>}
          />
          <Route
            path='/signin'
            render={(props) =>
              <HomeLayout>
              <SignIn loadUser = {this.loadUser}/>
            </HomeLayout>}
          />
          <Route
            path='/dashboard'
            render={(props) =>
              <DefaultLayout user={this.state.user}>
              <Dashboard user={this.state.user}/>
            </DefaultLayout>}
          />
          <Route
            path='/profile'
            render={(props) =>
              <DefaultLayout user={this.state.user}>
              <UserProfile user={this.state.user}/>
            </DefaultLayout>}
          />
        </Switch>
      </Router>
    );
    }
  }
  
  export default App;
