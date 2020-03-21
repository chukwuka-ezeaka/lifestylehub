import React from 'react';
import Register from '../components/Register/Register';

const RegisterView = ({loadUser}) => {
    return (
        <div className="view mr-4 ml-4">
             <Register loadUser={loadUser}/>
        </div>
    )
} 
export default RegisterView;
