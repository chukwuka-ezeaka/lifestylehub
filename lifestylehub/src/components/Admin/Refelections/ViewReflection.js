import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { withRouter } from 'react-router-dom';
import queryString from 'querystring';
import { Container, Row, Col, Card, CardHeader, CardBody, FormTextarea, FormGroup, Button, FormInput } from "shards-react";
import HttpService from '../../../API';
import LoaderSmall from '../../Loaders/LoaderSmall';
import UpdateReflection from './UpdateReflection';

const _http = new HttpService();

class ViewReflection extends Component {
    constructor(props){
        super(props);
        this.state={
            id: null,
            reflection: {},
            audio: '',
            audio_type: '', 
            image: '',
            image_type: '',
            requestPending: false,
            edit: false
        }
    }

    componentDidMount(){
        const params = queryString.parse(this.props.location.search)
        this.setState({id: params.id});
        this.getReflection(params.id);
    }
    render() { 
<<<<<<< HEAD:lifestylehub/src/components/Admin/Refelections/ViewReflection.js
        const {reflection, image, image_type, audio, audio_type, requestPending, edit} = this.state;
        
=======
        const {reflection, loading, requestPending, edit} = this.state;
       // console.log(audio);
>>>>>>> parent of 1afa491... changed to routing to hasrouter:src/components/Admin/Refelections/ViewReflection.js
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
                        <Col lg="4" md="12" sm="12" className="mb-3">
                            <Row>
                                <Col lg="12" md="12" sm="12" className="pb-3">
                                    <img 
                                    src={image? `data:${image_type};base64,${image}` :''} 
                                    alt={reflection.title}  
                                    width="300"/>
                                </Col>
                                <Col lg="8" md="12" sm="12">
                                    <ReactAudioPlayer
                                    src={audio? `data:${audio_type};base64,${audio}`:''}
                                    //src={require('./test3.mp3')}
                                    autoPlay
                                    controls
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg="7" md="12" sm="12">
                        {this.state.edit ? 
                            <>
                                <UpdateReflection reflection={reflection}/>
                                <Button theme="warning" type="submit" className="mt-2" onClick={this.handleEdit} disabled={requestPending}>
                                    cancel
                                </Button>
                             </>
                             : 
                             <>
                                <FormGroup className="mb-3">
                                    <label>Content</label>
                                    <FormTextarea rows="15" placeholder="Content" defaultValue={reflection.content} disabled={true}/>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <label>Author</label>
                                <FormInput placeholder="Content" defaultValue={reflection? reflection.author : ''} disabled={true}/>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <label>To be published on</label>
                                    <FormInput placeholder="Content" defaultValue={reflection.date} disabled={true}/>
                                </FormGroup>
                                <FormGroup className="mb-3">
                            
                                <Button theme="accent" type="submit" onClick={this.handleEdit} disabled={requestPending}>
                                    edit
                                </Button>
                                </FormGroup> 
                            </>
                            }
                        </Col>
                    </Row>
                </CardBody>
                </Card>
            </Col>
            </Row>
        </Container>
    
         );
    }
    
    handleEdit = () =>{
        this.setState({edit: !this.state.edit})
    }

    handleUpdate = () => {
        // this.setState({requestPending: true});
        // const reflectionUrl = `reflection/${this.state.id}`;
        // _http.sendPut(reflectionUrl, payload)
        // .then(response => {
        //     this.setState({ requestPending: false });
        //     if(response.data ){
        //         this.setState({requestPending: true});
        //         let type = "";
        //         if(response.status === "success"){
        //             type = "success";
        //             _http.notify(response.message, type)
        //         }else{
        //             type = "warn";
        //             _http.notify(response.message, type)
        //         }
            
        //     }else{
        //         _http.notify(response.message)
        //         this.setState({requestPending: false })
        //     }
        // });
    }

    getAudio = (file) => {
        const url = `media/manager/audio/single/find/${file}`;
        _http.sendGet(url)
        .then(res => {
            this.setState({
                audio:res
                // audio_type:res.headers['content-type']
            })
        })
    }

    getReflection = (id) => {
        const url = `reflection/${id}`;
        _http.sendGet(url)
        .then(res => {
            this.getAudio(res.data.audio_link);
            this.getImage(res.data.image_link);
            this.setState({
                reflection: res.data
            })
        })
        }

        getImage = (image)=>{
            const url = `media/manager/image/single/find/${image}`;
            _http.sendGet(url)
            .then(res => {
                if('image' in res.data && 'type' in res.data){
                const {image, type} = res.data;
                
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