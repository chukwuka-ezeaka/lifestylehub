import React from 'react';
import { withRouter } from "react-router-dom";
import 'tachyons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import LoaderSmall from '../Loaders/LoaderSmall';



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,3})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            errMessage: '',
        };
    }


    render() {
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: "75",
                    phone: '',
                    file: null,
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
                    phone: Yup.string()
                        .required('Mobile number is required')
                        .length(11, 'Please enter a valid Mobile number')
                        .matches(phoneRegExp, 'Invalid format. Please enter a valid Mobile number'),
                    file: Yup.mixed().required('Upload a picture'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}

                onSubmit={({ firstName, lastName, email, phone, file, password }) => {
                    console.log(file.name);
                    console.log(file.type);
                    console.log(`${file.size} bytes`);
                    this.setState({
                        disabled: true
                    });
                    fetch('https://lshub.herokuapp.com/api/v1/auth/register', {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            firstname: firstName,
                            lastname: lastName,
                            email: email,
                            role: '75',
                            phone: phone,
                            file: file,
                            password: password

                        }),
                        redirect: 'follow'
                    })
                        .then(response => response.json())
                        .then(user => {
                            this.setState({
                                disabled: false
                            });
                            switch (user.status) {
                                case "success":
                                    this.props.history.push('/confirmation');
                                    break;
                                case "fail":
                                    this.setState({
                                        disabled: false,
                                        errMessage: 'Error' + user.message
                                    });
                                    break;
                                default:
                                    this.setState({
                                        disabled: false,
                                        errMessage: user.message
                                    })
                                        .catch(err => {
                                            this.setState({
                                                disabled: false,
                                                errMessage: 'Error' + err
                                            });
                                        });
                            }
                        })
                }}

                render={({ errors, touched, setFieldValue }) => (
                    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{ backgroundColor: 'rgba(150, 150, 150, 1)' }}>
                        <Form className="pa4 black-80">
                            <div className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <legend className="f4 fw6 ph0 mh0 ">Register</legend>
                                    {this.state.disabled === true ?
                                        <LoaderSmall />
                                        :
                                        ""}
                                    <p className="p-0" style={{ color: 'brown' }}>{this.state.errMessage}</p>
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
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="phone">Mobile No</label>
                                        <Field
                                            type="phone"
                                            name="phone"
                                            id="phone"
                                            className={"form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (errors.phone && touched.phone ? ' is-invalid' : '')}
                                        />
                                        <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="file">Upload Image</label>
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            onChange={(event) => { setFieldValue("file", event.currentTarget.files[0]); }}
                                            className={"form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (errors.file && touched.file ? ' is-invalid' : '')}
                                        />
                                        <ErrorMessage name="file" component="div" className="invalid-feedback" />
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
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mr-2" type="submit" value="Register" disabled={this.state.disabled} />
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="reset" value="Reset" disabled={this.state.disabled} />
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