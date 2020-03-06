import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';

class GetAudio extends Component {

    componentDidMount(){
       // this.getAudio(this.props.audio);
    }
    
    render() { 
        const audioUrl = `https://myacademyhub.s3.amazonaws.com/audio/${this.props.audio}`;
        return ( 
            <ReactAudioPlayer 
            src={audioUrl}
                autoPlay
                controls
            />
         );
    }
}
 
export default GetAudio;