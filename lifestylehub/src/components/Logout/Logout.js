import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
    constructor(){
        super();
        this.state = { 
            logout: false
         }
         this.logout = this.logout.bind(this);
    }
   

     componentWillMount(){
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