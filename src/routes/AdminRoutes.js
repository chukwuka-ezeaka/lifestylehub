import React, { useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { DefaultLayout} from "../layouts";
import { AuthContext } from "../contexts/AuthContext";

function AdminRoutes({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  const role = user.data ? parseInt(user.data.role.id) : 0;
  return (
    
    <Route
      {...rest}
      render={props =>{
        //console.log(user)
        if(user.data && !user.isAuthenticated){
          return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        }
        if(!user.isAuthenticated){
          return <Redirect to="/signin" />
        }
        
        if(role !== 75){
            return <Redirect to="/signin" />
        }
        return <DefaultLayout> <Component {...props} /> </DefaultLayout>
      }
      }
    />
  );
}

export default AdminRoutes;