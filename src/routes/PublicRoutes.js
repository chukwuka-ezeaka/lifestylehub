import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { HomeLayout } from "../layouts";

function PublicRoute({ component: Component, ...rest }) {
    const { user} = useContext(AuthContext)
    console.log(user)
   return (
    <Route
    {...rest}
    render={props =>{
    if(user.data && user.isAuthenticated){
        if(parseInt(user.data.role.id) === 75){
            return <Redirect to="/dashboard" />
        }else if(parseInt(user.data.role.id) === 99){
            return <Redirect to="/vendor" />
        }else if(parseInt(user.data.role.id) === 100){
            return <Redirect to="/vendor" />
        }   
    }
    return <HomeLayout> <Component {...props} />  </HomeLayout>
        }}
        />
    );
}

export default PublicRoute;