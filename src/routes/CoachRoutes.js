import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { DefaultLayout} from "../layouts";

function CoachRoutes({ component: Component, ...rest }) {
const { user, isAuthenticated } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props =>{
        if(!isAuthenticated && user){
          return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        }
        if(!isAuthenticated){
          return <Redirect to="/signin" />
        }
        
        if(user.role.id !== 100){
            return <Redirect to="/signin" />
        }
        return <DefaultLayout user={props.user}> <Component {...props} /> </DefaultLayout>
      }
      }
    />
  );
}

export default CoachRoutes;