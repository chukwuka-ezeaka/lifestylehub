//import { hot } from 'react-hot-loader/root';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

//import routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

import { DefaultLayout, HomeLayout } from "./layouts";
// Route Views
import Home from "./views/Home";
import RegisterView from "./views/Register";
import SignInView from "./views/SignInView";
import UsersOverview from "./views/UsersOverview";
import UserProfile from "./views/UserProfile";
import Reflections from "./views/Reflections";
import Roles from "./views/Roles";
import Logout from "./views/Logout";
import Permissions from "./views/Permissions";
import Confirmation from "./views/Confirmation";
import Dashboard from "./views/Dashboard";
import Products from "./views/Products";
import ViewReflection from "./views/ViewReflection";
import Posts from "./views/Posts";
import Accounts from "./views/Accounts";

import "tachyons";

const initialState = {
  user: {
    id: "",
    fullname: "",
    username: "",
    email: "",
    phone: ""
  },
  Auth: "",
  Authenticated: false,
  logout: false
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  currentUser = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    this.setState({
      user: userData,
      Auth: localStorage.getItem("Auth")
    });
  };

  render() {
    const { user, Auth } = this.state;
    return (
      <div>
        <ToastContainer />
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <HomeLayout>
                  <Home />
                </HomeLayout>
              )}
            />
            <Route
              path="/register"
              render={props => (
                <HomeLayout>
                  <RegisterView />
                </HomeLayout>
              )}
            />
            <Route
              path="/signin"
              render={props => (
                <HomeLayout>
                  <SignInView />
                </HomeLayout>
              )}
            />
            <Route
              path="/dashboard"
              render={props => (
                <DefaultLayout user={user}>
                  <Dashboard user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />

            <Route
              path="/users/:id"
              render={props => (
                <DefaultLayout user={user}>
                  <UsersOverview Auth={Auth} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/profile"
              render={props => (
                <DefaultLayout user={user}>
                  <UserProfile user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/reflections"
              render={props => (
                <DefaultLayout user={user}>
                  <Reflections user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/reflections/:id"
              render={props => (
                <DefaultLayout user={user}>
                  <Reflections user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/viewReflection"
              render={props => (
                <DefaultLayout user={user}>
                  <ViewReflection user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />
            <Route
              exact
              path="/viewReflection/:id"
              render={props => (
                <DefaultLayout user={user}>
                  <ViewReflection user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/products/:id"
              render={props => (
                <DefaultLayout user={user}>
                  <Products user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />

            <Route
              path="/posts/:id"
              render={props => (
                <DefaultLayout user={user}>
                  <Posts user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/roles"
              render={props => (
                <DefaultLayout user={user}>
                  <Roles user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/logout"
              render={props => (
                <DefaultLayout user={user}>
                  <Logout user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/permissions"
              render={props => (
                <DefaultLayout user={user}>
                  <Permissions user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/confirmation"
              render={props => (
                <HomeLayout user={user}>
                  <Confirmation user={user} Auth={Auth} />
                </HomeLayout>
              )}
            />
            <Route
              path="/accounts/:id"
              render={props => (
                <DefaultLayout user={user}>
                  <Accounts user={user} Auth={Auth} />
                </DefaultLayout>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
// export default hot(App);
