import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import HttpService from '../../utils/API';

const _http = new HttpService();

class GetVideo extends Component {
    state = { video: '' }


    componentDidMount(){
        this.getAudio(this.props.video);
    }
    
    render() { 
        return ( 
            <ReactAudioPlayer
                src={`data:video/mp3;base64,${this.state.video}`}
                //src={require('./test3.mp3')}
                autoPlay
                controls
            />
         );
    }

    getAudio = (video) => {
        const url = `media/manager/video/single/find/${video}`;
        _http.sendGet(url)
        .then(res => {
           //console.log(res)
            this.setState({
                video:res
                // audio_type:res.headers['content-type']
            })
        })
    }
}
 
export default GetVideo;