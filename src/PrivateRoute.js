import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";
import { DefaultLayout} from "./layouts";

function PrivateRoute({ component: Component, ...rest }) {
const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
        <DefaultLayout user={props.user}>
            <Component {...props} />
        </DefaultLayout>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

export default PrivateRoute;