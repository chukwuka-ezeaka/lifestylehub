import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { HomeLayout } from "./layouts";

// Route Views
import Home from "./views/Home";
import Register from "./views/Register";

export default [
  {
    path: "/",
    exact: true,
    layout: HomeLayout,
    component: () => <Redirect to="/home" />
  },
  {
    path: "/register",
    layout: HomeLayout,
    component: Register
  },
  {
    path: "/home",
    layout: HomeLayout,
    component: Home
  }
];
