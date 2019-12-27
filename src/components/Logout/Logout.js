import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
    state = { 
        logout: false
     }

     componentDidMount(){
         this.logout();
     }

     logout = () => {
         localStorage.clear();
         this.setState({logout: true});
        this.props.history.push('/')
     }

    render() { 
        return (
            <span  onClick={this.logout} className="text-danger pointer">
                <i className="material-icons text-danger">&#xE879;</i> Logout
            </span>
        );
    }
}
 
export default withRouter(Logout);
