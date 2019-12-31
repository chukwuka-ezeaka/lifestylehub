import React from 'react';
import SignIn from '../components/SignIn/SignIn';

import './Signin.css'
const SignInView = ({loadUser}) => {
    return (
        <div className="view">
             <SignIn loadUser={loadUser}/>
        </div>
    )
}

export default SignInView;
