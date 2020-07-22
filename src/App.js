//import { hot } from 'react-hot-loader/root';
import React  from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "tachyons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
//routes
import VendorRoutes from "./routes/VendorRoutes"
import CoachRoutes from "./routes/CoachRoutes"
import AdminRoutes from "./routes/AdminRoutes"
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
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
import InviteUsers from "./views/InviteUser";
import AddProduct from "./views/AddProduct";
import Forgotpassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import Freebie from "./views/Freebie";
import Error404 from "./views/Error404";
//context provider
import AuthContextProvider from "./contexts/AuthContext";

function App(props) {

  return (
    <>
      <AuthContextProvider>
      <ToastContainer />
        <Router>
          <Switch>
            <PublicRoutes path="/" exact component={Home}/>
            <PublicRoutes path="/about" component={About} />
            <PublicRoutes path="/contact" component={Contact}/>
            <PublicRoutes path="/register" component={RegisterView}/>
            <PublicRoutes path="/signin" component={SignInView}/>
            <PublicRoutes path="/password/forgot" component={Forgotpassword}/>
            <PublicRoutes path="/password/reset" exact component={ResetPassword}/>
            <PublicRoutes path="/password/reset/:id" component={ResetPassword}/>
            <PublicRoutes path="/confirmation/:id" component={Confirmation}/>

            <AdminRoutes path="/dashboard" component={Dashboard}/>
            <AdminRoutes path="/users/invite" exact component={InviteUsers}/>
            <AdminRoutes path="/users/:id" component={UsersOverview}/>
            <AdminRoutes path="/reflections" exact component={Reflections} />
            <AdminRoutes path="/reflections/:id" component={Reflections}/>
            <AdminRoutes path="/viewReflection" exact component={ViewReflection}/>
            <AdminRoutes path="/viewReflection/:id" component={ViewReflection}/>
            <AdminRoutes path="/roles" component={Roles}/>
            <AdminRoutes path="/permissions" component={Permissions}/>

            {/* <VendorRoutes path="/store/:id" component={Store}/>
            <VendorRoutes path="/freebie/:id" component={Freebie}/> */}
            <VendorRoutes path="/products" exact component={Products}/>
            <VendorRoutes path="/products/:id" component={Products}/>
            <VendorRoutes path="/products/:id/settings" component={Products}/>
            <VendorRoutes path="/add/:id" component={AddProduct}/>
            <VendorRoutes path="/posts/:id" component={Posts}/>
            
            <CoachRoutes path="/chats/:id" component={Chat}/>

            <PrivateRoutes path="/vendor" component={VendorDashboard}/>
            <PrivateRoutes path="/coach" component={VendorDashboard}/>
            <PrivateRoutes path="/profile" component={UserProfile}/>
            <PrivateRoutes path="/accounts/:id" component={Accounts}/>
            <PrivateRoutes path="/logout" component={Logout}/>
            
            <Route component={Error404}/>
          </Switch>
        </Router>
      </AuthContextProvider>
    </>
  );
}
export default App;
// export default hot(App);
