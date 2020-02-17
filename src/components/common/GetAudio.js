import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import HttpService from '../../utils/API';

const _http = new HttpService();

class GetAudio extends Component {
    state = { audio: '' }


    componentDidMount(){
        this.getAudio(this.props.audio);
    }
    
    render() { 
        return ( 
            <ReactAudioPlayer
                src={`data:audio/mp3;base64,${this.state.audio}`}
                //src={require('./test3.mp3')}
                autoPlay
                controls
            />
         );
    }

    getAudio = (audio) => {
        const url = `media/manager/audio/single/find/${audio}`;
        _http.sendGet(url)
        .then(res => {
           //console.log(res)
            this.setState({
                audio:res
                // audio_type:res.headers['content-type']
            })
        })
    }
}
 
export default GetAudio;