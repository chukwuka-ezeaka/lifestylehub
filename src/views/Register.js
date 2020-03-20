import React from 'react';
import Register from '../components/Register/Register';

const RegisterView = ({loadUser}) => {
    return (
        <div className="view mx-auto">
             <Register loadUser={loadUser}/>
        </div>
    )
} 
export default RegisterView;
