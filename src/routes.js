import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { HomeLayout } from "./layouts";

// Route Views
import Home from "./views/Home";
import Register from "./views/Register";
import Signin from "./views/Signin";

export default [
  {
    path: "/",
    exact: true,
    layout: HomeLayout,
    component: () => <Redirect to="/home" />
  },
  {
    path: "/home",
    layout: HomeLayout,
    component: Home
  },
  {
    path: "/register",
    layout: HomeLayout,
    component: Register
  },
  {
    path: "/signin",
    layout: HomeLayout,
    component: Signin
  }
];
