import React from 'react';
import Signin from '../components/Signin/Signin';

import './Signin.css'
const SignInView = ({loadUser}) => {
    return (
        <div className="view mr-4 ml-4">
             <Signin />
        </div>
    )
}

export default SignInView;
