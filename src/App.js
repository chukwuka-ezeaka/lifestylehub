import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

//import routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { DefaultLayout, HomeLayout } from "./layouts";
// Route Views
import Home from "./views/Home";
import Register from "./views/Register";
import SignIn from "./views/SignIn";
import Dashboard from "./views/Dashboard";
import UserProfile from "./views/UserProfile";
import Reflections from "./views/Reflections";
import Roles from "./views/Roles";
import Logout from "./views/Logout";
import Permissions from "./views/Permissions";
import Confirmation from "./views/Confirmation";


import 'tachyons';
import Content from "./views/Content";


const initialState = {
  user: {
    id: '',
    fullname: '',
    username: '',
    email: '',
    phone: ''
  },
  Auth: '',
  Authenticated: false,
  logout: false
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = initialState
    
  }


currentUser = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  this.setState({
    user: userData,
    Auth: localStorage.getItem('Auth')
  })
}




  render(){
    const { user, Auth } = this.state;
    return(
      <div>
        <ToastContainer />
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
              <Route
                path='/addContent'
                render={(props) =>
                  <DefaultLayout user={user}>
                  <Content user={user} Auth={Auth}/>
                </DefaultLayout>}
              />
              <Route
                path='/roles'
                render={(props) =>
                  <DefaultLayout user={user}>
                  <Roles user={user} Auth={Auth}/>
                </DefaultLayout>}
              />
              <Route
                path='/logout'
                render={(props) =>
                  <DefaultLayout user={user}>
                  <Logout user={user} Auth={Auth}/>
                </DefaultLayout>}
              />
              <Route
                path='/permissions'
                render={(props) =>
                  <DefaultLayout user={user}>
                  <Permissions user={user} Auth={Auth}/>
                </DefaultLayout>}
              />
              <Route
                path='/confirmation'
                render={(props) =>
                  <HomeLayout user={user}>
                  <Confirmation user={user} Auth={Auth}/>
                </HomeLayout>}
              />
            </Switch>
          </Router>         
      </div>
    );
    }
  }
  
  export default App;
