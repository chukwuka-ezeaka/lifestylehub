import React from "react";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoaderSmall from "../Loaders/LoaderSmall";
import HttpService from "../../utils/API";


const _http = new HttpService();

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
          const url = 'auth/login';
          const postData= {
            email: email,
            password: password
          }
          _http.sendPostNoAuth (url, postData)
          .then(response => {
              if(response.data){
                switch (response.status) {
                  case "success":
                    if (response.data.id) {
                      let userData = JSON.stringify(response.data);
                      switch (response.data.role.id) {
                        case 75:
                          localStorage.setItem("user", userData);
                          localStorage.setItem("Auth", response.token);
                          this.props.history.push("/dashboard");
                          break;
                        case 99:
                          localStorage.setItem("user", userData);
                          localStorage.setItem("Auth", response.token);
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
                      errMessage: response.message,
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
              
              }else{
                this.setState({
                  disabled: false
                });
                  _http.notify(response.message)
                  this.setState({requestPending: false })
              }
          })
        
        }}
        render={({ errors, touched }) => (
          <article
            className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center"
            style={{ backgroundColor: "rgba(150, 150, 150, 1)" }}
          >
            <Form className="pa4 black-80">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw76 ph0 mh0">Sign In</legend>
                {this.state.disabled === true ? <LoaderSmall /> : ""}
                <p className="p-0" style={{ color: "brown" }}>
                  {this.state.errMessage}
                </p>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    className={
                      "form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    className={
                      "form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" +
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
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mr-2"
                  type="submit"
                  value="Sign In"
                  disabled={this.state.disabled}
                />
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="reset"
                  value="Reset"
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
