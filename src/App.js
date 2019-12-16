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
import Reflections from "./views/Reflections";


import 'tachyons';


const initialState = {
  user: {
    id: '',
    fullname: '',
    username: '',
    email: '',
    phone: ''
  },
  Auth: ''
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = initialState
    
  }

  componentDidMount(){
    if(localStorage.getItem('user')){
      const userData = JSON.parse(localStorage.getItem('user'));
      this.setState({
        user: userData,
        Auth: localStorage.getItem('Auth')
      })
    }
  }

  /*loadUser = (user) => {
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
  }*/

currentUser = ()=> {
  return this.state.user
}

  render(){
    const { user, Auth } = this.state
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
              <Register />
            </HomeLayout>}
          />
          <Route
            path='/signin'
            render={(props) =>
              <HomeLayout>
              <SignIn />
            </HomeLayout>}
          />
          <Route
            path='/dashboard'
            render={(props) =>
              <DefaultLayout user={user}>
              <Dashboard user={user} Auth={Auth}/>
            </DefaultLayout>}
          />
          <Route
            path='/profile'
            render={(props) =>
              <DefaultLayout user={user}>
              <UserProfile user={user} Auth={Auth}/>
            </DefaultLayout>}
          />
           <Route
            path='/reflections'
            render={(props) =>
              <DefaultLayout user={user}>
              <Reflections user={user} Auth={Auth}/>
            </DefaultLayout>}
          />
        </Switch>
      </Router>
    );
    }
  }
  
  export default App;
