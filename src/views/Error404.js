import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

const Error404= () => {
 let history = useHistory()
  return (
    <main>
        <div class="error">
        <div class="error__content">
        <h2>404</h2>
        <h3>Page not found</h3>
        <p>The requested route does not exist on this server.</p>
        <button type="button" class="btn btn-accent btn-pill" onClick={() => history.goBack()}>&larr; Go Back</button>
        </div>
        </div>
  </main>
  );
};

export default Error404;