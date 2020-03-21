import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import HttpService from '../../utils/API';

const _http = new HttpService();

class GetVideo extends Component {
    state = { video: '' }


    componentDidMount(){
        //this.getAudio(this.props.video);
    }
    
    render() { 
        const videoUrl = `https://myacademyhub.s3.amazonaws.com/video/${this.props.video}`;
        return ( 
            <ReactPlayer 
            url = {videoUrl}
            width={this.props.width}
            controls
            height="auto"/>
         );
    }

}
 
export default GetVideo;