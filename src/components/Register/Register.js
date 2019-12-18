import React from 'react';
import { withRouter } from "react-router-dom";
import 'tachyons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class Register extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: "75",
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .required('First Name is required'),
                    lastName: Yup.string()
                        .required('Last Name is required'),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}

                onSubmit={({ firstName, lastName, email, role, password }) => {
                    console.log(firstName, lastName, email, role, password);

                    // fetch('https://pacific-hollows-12017.herokuapp.com/signin',{
                    fetch('https://pacific-hollows-12017.herokuapp.com/register', {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            role: role,
                            password: password

                        }),
                        redirect: 'follow'
                    })
                    .then(response => response.json())
                    .then(user => console.log(user) )
                                        /* {
                                if(user.id){
                                    this.props.loadUser(user);
                                    this.props.history.push('/home');
                                }
                            }*/
                }}

                render={({ errors, touched }) => (
                    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{ backgroundColor: 'rgba(150, 150, 150, 1)' }}>
                        <Form className="pa4 black-80">
                            <div className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <legend className="f4 fw6 ph0 mh0 ">Register</legend>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="firstName">First Name</label>
                                        <Field
                                            type="text"
                                            name="firstName"
                                            id="name"
                                            className={"form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (errors.firstName && touched.firstName ? ' is-invalid' : '')}
                                        />
                                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="lastName">last Name</label>
                                        <Field
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            className={"form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (errors.lastName && touched.lastName ? ' is-invalid' : '')}
                                        />
                                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={"form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (errors.email && touched.email ? ' is-invalid' : '')}
                                        />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            className={"form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (errors.password && touched.password ? ' is-invalid' : '')}
                                        />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="confirmPassword">Confirm Password</label>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            className={"form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}
                                        />
                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </div>
                                </fieldset>
                                <div className="">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mr-2" type="submit" value="Register" />
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="reset" value="Reset" />
                                </div>

                            </div>
                        </Form>
                    </article>
                )}
            />
        )
    }
}



export default withRouter(Register);