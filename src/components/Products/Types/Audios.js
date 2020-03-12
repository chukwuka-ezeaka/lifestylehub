import React from 'react';
import Loader from '../../Loaders/Loader';
import { 
    Container,
     Row, 
     Col, 
     Card, 
     CardBody, 
     Badge 
    } from "shards-react"
import SingleMedia from './SingleMediaModal';

class Audio extends React.Component{
    constructor(props){
        super(props);
        this.state={
           currentMedia: null,
            open: false
        }
    }

 
    toggleModal = (event) => {
      
        if(event){
         let mediaId = event.target.id;
         this.setState({
            open: !this.state.open,
            currentMedia: this.props.contents[mediaId]
         });
     }
       // return this.state.open
        
     }


render(){

    const { contents, error, loading } = this.props;
    let showModal = '';
    //console.log(contents)
    if(this.state.currentMedia !== null){
         showModal = <SingleMedia media={this.state.currentMedia} toggle={this.toggleModal} open={this.state.open}/>;
    }
    return(

        <Container className="mt-4">
            <h5 className="card-title">All Audios</h5>
                {loading ?
                <Loader />
                :
                    Array.isArray(contents) && contents.length > 0 ?
                   <Row>
                    {contents.map((content, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            //console.log(content);
                            return(
                                <Col lg="3" md="3" sm="12" className="mb-4" key={content.id}>
                                <Card small className="card-post card-post--1" style={{'height': '100%'}}>
                                  <div
                                    className="card-post__image"
                                    style={{ textAlign : 'center' }}
                                  >
                                    <img
                                        className="rounded-circle link pointer dim img-responsive"
                                        src= {require("../../../images/covers/audio.png")}
                                        alt={content.title}
                                        width="150px"
                                        id={index}
                                        onClick={this.toggleModal}
                                        />
                                    <Badge
                                      pill
                                      className={`card-post__category bg-dark`}
                                    >
                                       {content.category ? content.category.name : ''}
                                    </Badge>
                                   
                                  </div>
                                  <CardBody>
                                    <h5 className="card-title">
                                      <p onClick={this.toggleModal} className="text-fiord-blue link pointer">
                                      {content.title ? content.title : ''}
                                      </p>
                                    </h5>
                                    <p><span className="text-muted"><i className="material-icons mr-1">person</i>{content.owner ? content.owner.fullname : ''}</span></p>
                                    <p>{content.price? <span className="text-success">₦ {content.price}</span> : ""}</p>
                                  </CardBody>
                                </Card>
                              </Col>
                                
                            )
                        })
                        }
                        </Row>
                    :
                        error ?
                        <p className="text-center brown" style={{color: 'brown'}}>{error}</p>
                        : <p className="f4 fw6 text-center">You have no products of this type</p>
                }
                {showModal}
        </Container>
    );
}


}

export default Audio;
