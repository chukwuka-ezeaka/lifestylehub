import React, { Component } from 'react';
import './Loader.css'

class LoaderSmall extends Component {
    render() { 
        return (
            <div className="loader-container">
                <img id="loader-small" src={ require('../../assets/images/loaders/loader2.gif') } alt="loader"/>
            </div>
          );
    }
}
 
export default LoaderSmall;