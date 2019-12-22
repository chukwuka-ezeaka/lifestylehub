import React from 'react';
import Signin from '../components/Signin/Signin';

import './Signin.css'
const SignInView = ({loadUser}) => {
    return (
        <div>
             <Signin loadUser={loadUser}/>
        </div>
    )
}

export default SignInView;
