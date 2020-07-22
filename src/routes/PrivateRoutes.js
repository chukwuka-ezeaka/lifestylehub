import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { DefaultLayout} from "../layouts";

function PrivateRoutes({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props =>{
        if(user.data && !user.isAuthenticated){
          return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        }
        if(!user.isAuthenticated){
          return <Redirect to="/signin" />
        }
        
    //     if(user.role.id !== 99){
    //       return <Redirect to="/signin" />
    //   }
      return <DefaultLayout> <Component {...props} /> </DefaultLayout>
    }
      }
    />
  );
}

export default PrivateRoutes;