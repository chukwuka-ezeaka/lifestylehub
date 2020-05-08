import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoaderSmall from "../../Loaders/LoaderSmall";
import HttpService from "../../../utils/API";
import { useAuth } from "../../../context/auth";
import "../signin.css";

function PasswordForgot(props) {
  const _http = new HttpService();
  const { setAuthTokens } = useAuth();
  const [errMessage, setErrMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
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
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required")
      })}
      onSubmit={({ email }) => {
        setDisabled(true);
        const url = "auth/password/forgot";
        const postData = {
          email: email,
        };
        _http.sendPostNoAuth(url, postData)
        .then((response) => {
              if(response.status === "success"){
                setDisabled(false);
                 _http.notify(response.message, "success");
              }else{
                setDisabled(false);
                _http.notify(response.message);
              }
        })
      }}
      render={({ errors, touched }) => (
        <article className="br3 mv4 w-100 w-50 w-25-1 mw6 center">

          <Form className="pa4">
            <fieldset id="sign_up" className="login-box">
              <div className="label">
                <h1>Forgot Password</h1>
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
              <p>Enter your email address to have a password reset link sent to you</p>
            </fieldset>
            <div className="button-box">
              <button
                className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6"
                type="submit"
                value="forgotPassword"
                disabled={disabled}
              >
                {disabled ? <LoaderSmall /> : "Send"}
              </button>
            </div>
          </Form>
        </article>
      )}
    />
  );
}

export default withRouter(PasswordForgot);
