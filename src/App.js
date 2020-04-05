//import { hot } from 'react-hot-loader/root';
import React, {useState} from "react";
import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";

//import routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

import { DefaultLayout, HomeLayout } from "./layouts";
import { AuthContext } from "./context/auth";
import PrivateRoute from './PrivateRoute';
// Route Views
import Home from "./views/Home";
import About from "./views/About";
import Contact from "./views/Contact";
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
import VendorDashboard from "./views/VendorDashboard";
import Products from "./views/Products";
import ViewReflection from "./views/ViewReflection";
import Posts from "./views/Posts";
import Accounts from "./views/Accounts";
import Chat from "./views/Chat";
import Store from "./views/Store";

import "tachyons";
import InviteUsers from "./views/InviteUser";
import AddProduct from "./views/AddProduct";

// const existingTokens = JSON.parse(localStorage.getItem("auth"));

// const initialState = {
//   user: {},
//   Authenticated: false,
//   logout: false,
//   authTokens : existingTokens
// };

function App(props) {
  const existingTokens = localStorage.getItem("Auth");
  const userData = JSON.parse(localStorage.getItem("user"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [user, setUser] = useState(userData);
  
  const setTokens = (data) => {
    localStorage.setItem("Auth", data);
    setAuthTokens(data);
  }

    return (
      <>
        <ToastContainer />
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
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
              path="/about"
              render={props => (
                <HomeLayout>
                  <About />
                </HomeLayout>
              )}
            />
            <Route
              path="/contact"
              render={props => (
                <HomeLayout>
                  <Contact />
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
              path="/confirmation"
              render={props => (
                <HomeLayout user={user}>
                  <Confirmation user={user} Auth={authTokens} />
                </HomeLayout>
              )}
            />
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
               user={user}
            />
             <PrivateRoute
              path="/vendor"
              component={VendorDashboard}
               user={user}
            />

            <PrivateRoute
              path="/users/invite"
              exact
              component={InviteUsers}
               user={user}
            />

            <PrivateRoute
              path="/users/:id"
              component={UsersOverview}
               user={user}
            />
            <PrivateRoute
              path="/profile"
              component={UserProfile}
               user={user}
            />
            <PrivateRoute
              path="/reflections"
              exact
              component={Reflections}
               user={user}
            />
            <PrivateRoute
              path="/reflections/:id"
              component={Reflections}
               user={user}
            />
            <PrivateRoute
              path="/viewReflection"
              exact
              component={ViewReflection}
               user={user}
            />
            <PrivateRoute
              path="/viewReflection/:id"
              component={ViewReflection}
               user={user}
            />
             <PrivateRoute
              path="/products"
              component={Products}
               user={user}
            />
            <PrivateRoute
              path="/products/:id"
              component={Products}
               user={user}
            />
  
            <PrivateRoute
              path="/add/:id"
              component={AddProduct}
               user={user}
            />
            <PrivateRoute
              path="/posts/:id"
              component={Posts}
               user={user}
            />
            <PrivateRoute
              path="/roles"
              component={Roles}
               user={user}
            />
            <PrivateRoute
              path="/chats/:id"
              component={Chat}
               user={user}
            />
             <PrivateRoute
              path="/store/:id"
              component={Store}
               user={user}
            />
            <PrivateRoute
              path="/logout"
              component={Logout}
               user={user}
            />
            <PrivateRoute
              path="/permissions"
              component={Permissions}
               user={user}
            />
            <PrivateRoute
              path="/accounts/:id"
              component={Accounts}
              user={user}
            />
          </Switch>
        </Router>
        </AuthContext.Provider>
      </>
    );
}
export default App;
// export default hot(App);
