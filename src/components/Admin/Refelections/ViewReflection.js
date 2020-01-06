import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { withRouter } from 'react-router-dom';
import queryString from 'querystring'
import axios from 'axios';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react"

class ViewReflection extends Component {
    constructor(props){
        super(props);
        this.state={
            reflection: {},
            audio: '',
            audio_type: '',
            image: '',
            image_type: ''
        }
    }

    componentDidMount(){
        const params = queryString.parse(this.props.location.search)
        console.log(params.id);
        this.getReflection(params.id);
    }
    render() { 
        const {reflection, image, image_type} = this.state;
        return ( 
            <Container className="mt-4">
            <Row>
            <Col>
                <Card small className="mb-4 overflow-hidden">
                <CardHeader className="bg-light">
                    <h6 className="m-0 text-black">{reflection.title}</h6>
                </CardHeader>
                <CardBody className="bg-light p-0 pb-3 pl-4 pr-4">

                    <Row>
                        <Col lg="6" md="6" sm="12">
                            <Row>
                                <Col lg="8" md="6" sm="18" className="pb-3">
                                    <img 
                                    src={image? `data:${image_type};base64,${image}` :''} 
                                    alt={reflection.title}  
                                    height="400"/>
                                </Col>
                                <Col lg="8" md="6" sm="18">
                                    <ReactAudioPlayer
                                    src={this.state.audio}
                                    //src={require('./test3.mp3')}
                                    autoPlay
                                    controls
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
                </Card>
            </Col>
            </Row>
        </Container>
    
         );
    }

    getAudio = (file) => {
        const headers = { headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            Authorization : `Bearer ${localStorage.getItem('Auth')}
            `} 
        }
        axios.get(`https://lshub.herokuapp.com/api/v1/media/manager/audio/single/find/${file}`, headers)
        .then((res)=>{
        this.setState({
             audio:res.data,
            audio_type:res.headers['content-type']
        })
        console.log(res);
        // }
        })
    }

    getReflection = (id) => {
        axios.get(`https://lshub.herokuapp.com/api/v1/reflection/${id}`,
        { headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${localStorage.getItem('Auth')}`} 
        })
        .then(res => {
            console.log(res)
            this.getAudio(res.data.data.audio_link);
            this.getImage(res.data.data.image_link);
            this.setState({
                reflection: res.data.data
            })
        }, (error) => { console.log(error)
        });
        
        }

        getImage = (image)=>{
    
            const headers = { headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                Authorization : `Bearer ${localStorage.getItem('Auth')}
                `} 
            }
            axios.get(`https://lshub.herokuapp.com/api/v1/media/manager/image/single/find/${image}`, headers)
            .then((res)=>{
                if('image' in res.data.data && 'type' in res.data.data){
                const {image, type} = res.data.data;
                this.setState({
                    image:image,
                    image_type:type
                })
            }else{
                console.log('Invalid media received')
            }
            })
          }
}
 
export default withRouter(ViewReflection);