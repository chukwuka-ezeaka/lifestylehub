import React from 'react';
import Signin from '../components/SignIn/SignIn';

import './Signin.css'


const SignIn = ({loadUser}) => {
    return (
        <div>
             <Signin loadUser={loadUser}/>
        </div>
    )
}

export default SignIn;
