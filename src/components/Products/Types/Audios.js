import React from 'react';
import Loader from '../../Loaders/Loader';
import ReactAudioPlayer from 'react-audio-player';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react"
import GetAudio from '../../common/GetAudio';

class Audio extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }


render(){
    const { media, user, error, loading } = this.props;
    let i = 1;
    return(

        <Container className="mt-4">
            <Row>
            <Col>
                <Card small className="mb-4 overflow-hidden">
                <CardHeader className="bg-light">
                    <h6 className="m-0 text-black">All Audios</h6>
                </CardHeader>
                <CardBody className="bg-light p-0 pb-3" >
                {loading ?
                <Loader />
                :
                    Array.isArray(media) && media.length > 0 ?
                    <table className="table table-light mb-0">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col" className="border-0">
                            #
                        </th>
                        <th scope="col" className="border-0">
                            Title
                        </th>
                        <th scope="col" className="border-0">
                            Category
                        </th>
                        <th scope="col" className="border-0">
                            Media
                        </th>
                       
                        <th scope="col" className="border-0">

                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {media.map((media, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            console.log(media);
                            return(
                               
                                <tr key={media.id}>
                                    <td>{i++}</td>
                                    <td>{media.title ? media.title : ''}</td>
                                    <td>{media.category ? media.category.name : ''}</td>
                                    <td>
                                    <GetAudio audio={media.url ? media.url : ''}/>
                                    {/* <img
                                        className="rounded-circle link pointer dim"
                                        src= {require("./../../../images/audio-cover/audio.png")}
                                        alt={media.title}
                                        width="80"
                                        id={media.id}
                                        onClick={this.viewReflections}
                                        /> */}
                                        {/* {media.url ? media.url : ''} */}
                                        </td>
                                    <td>
                                        <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.toggleModal} id={index}>
                                            View
                                        </Button>
                                    </td>
                                   
                                </tr> 
                                
                            )
                        })}
                    </tbody>
                    </table>
                    :
                        error ?
                        <p className="text-center brown" style={{color: 'brown'}}>{error}</p>
                        : <p className="f4 fw6 text-center">You have no products of this type</p>
                }
                </CardBody>
                </Card>
            </Col>
            </Row>
        </Container>
    );
}


}

export default Audio;
