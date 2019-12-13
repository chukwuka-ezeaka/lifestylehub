import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, HomeLayout } from "./layouts";

// Route Views
import Home from "./views/Hom";
import Register from "./views/Register";
import Signin from "./views/SignIn";
import Dashboard from "./views/Dashboard";

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
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  }
];
