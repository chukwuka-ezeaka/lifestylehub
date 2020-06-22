import React, { Component, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Logout(props) {

const { logout } = useContext(AuthContext);

useEffect(()=>{
    return logout;
})
    // const logout = () => {
    //     localStorage.clear();
    //     logout();
    //     //this.props.history.push('/')
    //  }
    return (
        <span  onClick={logout} className="text-danger pointer">
            <i className="material-icons text-danger">&#xE879;</i>
        </span>
    );
}
 
export default withRouter(Logout);
