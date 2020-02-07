import React from "react";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoaderSmall from "../Loaders/LoaderSmall";
import "./Signin.css";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      errMessage: "",
      disabled: false,
      isLoading: false
    };
  }
  render() {
    return (
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),

          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required")
        })}
        onSubmit={({ email, password }) => {
          this.setState({
            disabled: true
          });
          fetch("https://lshub.herokuapp.com/api/v1/auth/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password
            })
          })
            .then(response => response.json())
            .then(user => {
              this.setState({
                disabled: false
              });
              switch (user.status) {
                case "success":
                  if (user.data.id) {
                    console.log(user.data.id)
                    let userData = JSON.stringify(user.data);
                    switch (user.data.role.id) {
                      case 75:
                        localStorage.setItem("user", userData);
                        localStorage.setItem("Auth", user.token);
                        this.props.history.push("/dashboard");
                        break;
                      case 99:
                        localStorage.setItem("user", userData);
                        localStorage.setItem("Auth", user.token);
                        this.props.history.push("/products/allProducts");
                        break;
                      default:
                        this.setState({
                          errMessage: "Please login on the mobile app"
                        });
                        break;
                    }
                  }
                  break;
                case "fail":
                  this.setState({
                    errMessage: user.message,
                    disabled: false
                  });
                  break;
                default:
                  this.setState({
                    disabled: false,
                    errMessage: "something went wrong"
                  });
                  break;
              }
            })
            .catch(err => {
              this.setState({
                disabled: false,
                errMessage: "Please check your network connection and try again"
              });
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
                  {this.state.disabled === true ? <LoaderSmall /> : ""}
                  <p className="p-0" style={{ color: "brown" }}>
                    {this.state.errMessage}
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
              <div className="button-box">
                <input
                  className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6"
                  type="submit"
                  value="Sign In"
                  disabled={this.state.disabled}
                />
              </div>
            </Form>
          </article>
        )}
      />
    );
  }
}

export default withRouter(Signin);
