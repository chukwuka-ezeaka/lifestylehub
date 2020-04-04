import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../../context/auth';

function Logout(props) {

const { setAuthTokens } = useAuth();

    const logout = () => {
        localStorage.clear();
        setAuthTokens();
        //this.props.history.push('/')
     }
     logout();
    return (
        <span  onClick={logout} className="text-danger pointer">
            <i className="material-icons text-danger">&#xE879;</i>
        </span>
    );
}
 
export default withRouter(Logout);
