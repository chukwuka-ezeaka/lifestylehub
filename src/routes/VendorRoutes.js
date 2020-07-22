import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { DefaultLayout} from "../layouts";

function VendorRoutes({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext)
  const role = user.data ? parseInt(user.data.role.id) : 0;

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
        if(role != 75 && role != 99){
          return <Redirect to="/signin" />
        }
      return <DefaultLayout> <Component {...props} /> </DefaultLayout>
    }
      }
    />
  );
}

export default VendorRoutes;