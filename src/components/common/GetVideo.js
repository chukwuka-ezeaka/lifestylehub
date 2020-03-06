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
        return ( 
            <ReactPlayer 
            url='https://www.youtube.com/watch?v=E_avNkrUVbc' 
            width={this.props.width}/>
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