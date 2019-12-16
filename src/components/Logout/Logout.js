import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    state = { 
        logout: false
     }

     logout = () => {
         localStorage.clear();
         this.setState({logout: true})
     }

    render() { 
        const { logout } = this.state;

        if(logout){
            return <Redirect to="/" push={true} />
        }
        return (
            <span>
                <i className="material-icons text-danger" onClick={this.logout}>&#xE879;</i> Logout
            </span>
        );
    }
}
 
export default Logout;
