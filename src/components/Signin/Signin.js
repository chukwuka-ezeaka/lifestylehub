import React, { useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoaderSmall from "../Loaders/LoaderSmall";
import HttpService from "../../utils/API";
import { useAuth, AuthContext } from "../../contexts/AuthContext";
import "./signin.css";
import constants from "../../reducers/constants";

function Signin(props) {
  const _http = new HttpService();
  const [errMessage, setErrMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { dispatch, setIsAuthenticated } = useContext(AuthContext);
  // constructor() {
  //   super();
  //   this.state = {
  //     errMessage: "",
  //     disabled: false,
  //     isLoading: false
  //   };
  // }
  // if (isLoggedIn) {
  //   return <Redirect to="/" />;
  // }
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),

        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={({ email, password }) => {
        setDisabled(true);
        const url = "auth/login";
        const postData = {
          email: email,
          password: password,
        };
        _http.sendPostNoAuth(url, postData).then((response) => {
          if (response.data) {
            switch (response.status) {
              case "success":
                if (response.data.role.id === 75 || response.data.role.id === 99 || response.data.role.id === 100 ) {
                  console.log(response)
                  const userData = {
                    ...response.data,
                    token: response.token,
                    expires_in: response.expires_in
                  }
                  localStorage.setItem("user", JSON.stringify(userData));
                  setIsAuthenticated(true);
                  dispatch({type: constants.IS_LOGGED_IN, data: response.data})
                }else{
                  setDisabled(false);
                  setErrMessage("Please login on the mobile app");
                }
                break;
              case "fail":
                setDisabled(false);
                setErrMessage(response.message);
                break;
              default:
                setDisabled(false);
                setErrMessage("something went wrong");
                break;
            }
          } else {
            setDisabled(false);
            _http.notify(response.message);
          }
        });
      }}
      render={({ errors, touched }) => (
        <article className="br3 mv4 w-100 w-50 w-25-1 mw6 center">
          <Form className="pa4">
            <fieldset id="sign_up" className="login-box">
              <div className="label">
                <h1>Sign in</h1>
              </div>

              <div className="w-100">
                <p className="p-0" style={{ color: "brown" }}>
                  {errMessage}
                </p>
              </div>

              <div className="mv3">
                <Field
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  className={
                    "form-control b pa2 input-reset  bg-transparent hover-white w-100 email-box" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="mv4">
                <Field
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  className={
                    " form-control pa2 input-reset bg-transparent hover-white w-100 password-box" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </fieldset>
            <div>
            <Link to={`/password/forgot`} activeclassname="active">Forgot password?</Link></div>
            <div className="button-box">
              <button
                className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6"
                type="submit"
                value="signinr"
                disabled={disabled}
              >
                {disabled ? <LoaderSmall /> : "Sign In"}
              </button>
            </div>
          </Form>
        </article>
      )}
    />
  );
}

export default withRouter(Signin);
