import React, { useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { DefaultLayout} from "../layouts";
import { AuthContext } from "../contexts/AuthContext";

function AdminRoutes({ component: Component, ...rest }) {
  const { user, isAuthenticated } = useContext(AuthContext);
  return (
    
    <Route
      {...rest}
      render={props =>{
        //console.log(user)
        if(!isAuthenticated && user){
          return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        }
        if(!isAuthenticated){
          return <Redirect to="/signin" />
        }
        
        if(user.role.id !== 75){
            return <Redirect to="/signin" />
        }
        return <DefaultLayout> <Component {...props} /> </DefaultLayout>
      }
      }
    />
  );
}

export default AdminRoutes;