import React from 'react';
import Signin from '../components/Signin/Signin';

import './Signin.css'


const SignIn = ({loadUser}) => {
    return (
        <div style={{minHeight: '69vh'}}>
             <Signin loadUser={loadUser}/>
        </div>
    )
}

export default SignIn;
