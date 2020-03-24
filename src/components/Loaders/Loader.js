import React, { Component } from 'react';
import './Loader.css'

class Loader extends Component {
    render() { 
        return (
            // <div className="loader-container">
            //     <img id="loader" src={ require('../../assets/images/loaders/loader2.gif') } alt="loader"/>
            // </div>
            <div className="loader">Loading...</div>
          );
    }
}
 
export default Loader;