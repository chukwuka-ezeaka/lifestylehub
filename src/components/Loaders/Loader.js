import React, { Component } from 'react';
import './Loader.css'

class Loader extends Component {
    render() { 
        return (
            <div className="loader-container">
                <img id="loader" src={ require('../../assets/images/loaders/loader1.gif') } alt="loader"/>
            </div>
          );
    }
}
 
export default Loader;