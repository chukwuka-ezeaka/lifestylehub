import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";
import { HomeLayout } from "./layouts";

function PublicRoute({ component: Component, ...rest }) {
    const { authTokens } = useAuth();
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
   // const user = props.user;
    let dashboard = "";
    if(user){
        if(parseInt(user.role.id) === 75){
            dashboard = <Redirect to="/dashboard" />
        }else if(parseInt(user.role.id) === 99){
            dashboard = <Redirect to="/vendor" />
        }else if(parseInt(user.role.id) === 100){
            dashboard = <Redirect to="/vendor" />
        }   
    }
    return (
        <Route
        {...rest}
        render={props =>
            authTokens ? (
                dashboard
            ) : (
            <HomeLayout user={props.user}>
                <Component {...props} />
            </HomeLayout>
            )
        }
        />
    );
}

export default PublicRoute;