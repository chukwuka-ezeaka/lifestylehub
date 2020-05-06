import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoaderSmall from "../../Loaders/LoaderSmall";
import HttpService from "../../../utils/API";
import { useAuth } from "../../../context/auth";
import "../signin.css";

function PasswordReset(props) {
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
        password: "",
        confirmPassword: ""
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required")
      })}
      onSubmit={({ password, confirmPassword }) => {
        setDisabled(true);
        const url = "auth/login";
        const postData = {
            password: password,
            confirmPassword: confirmPassword
        };
        //API call here
      }}
      render={({ errors, touched }) => (
        <article className="br3 mv4 w-100 w-50 w-25-1 mw6 center">

          <Form className="pa4">
            <fieldset id="sign_up" className="login-box">
              <div className="label">
                <h1>Reset Password</h1>
              </div>

              <div className="w-100">
                <p className="p-0" style={{ color: "brown" }}>
                  {errMessage}
                </p>
                
              </div>
            
              <div className="mv4">
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="New Password *"
                      className={
                        " form-control pa2 input-reset bg-transparent hover-white w-100 password-box" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mv4">
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className={
                        " form-control pa2 input-reset bg-transparent hover-white w-100 password-box" +
                        (errors.confirmPassword && touched.confirmPassword
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
            </fieldset>
            <div className="button-box">
              <button
                className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6"
                type="submit"
                value=""
                disabled={disabled}
              >
                {disabled ? <LoaderSmall /> : "Reset"}
              </button>
            </div>
          </Form>
        </article>
      )}
    />
  );
}

export default withRouter(PasswordReset);
