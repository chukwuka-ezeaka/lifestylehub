import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";


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


  render(){
    console.log(this.state.user);
    return(
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                
                component={withTracker(props => {
                  return (
                    <route.layout user={this.state.user} {...props}>
                      
                      <route.component user={this.state.user} loadUser={this.loadUser} {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          })}
        </div>
      </Router>
    );
    }
  }
  
  export default App;
