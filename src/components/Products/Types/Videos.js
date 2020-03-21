import React from 'react';
import Loader from '../../Loaders/Loader';
import { Container, Row, Col, Card, CardBody, Badge, CardFooter} from "shards-react";
import ReadMore from '../../ReadMore/ReadMore';

class Video extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }


render(){
    const { contents, error, loading } = this.props;
    return(

        <Container className="mt-4">
        <h5 className="card-title">All Videos</h5>
                {loading ?
                <Loader />
                :
                   Array.isArray(contents) && contents.length > 0 ?
                   <Row>
                    {contents.map((content, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                           // console.log(content);
                            return(
                                <Col lg="3" md="3" sm="12" className="mb-4" key={index}>
                                <Card small className="card-post card-post--1" style={{'height': '100%'}}>
                                  <div
                                    className="card-post__image"
                                    style={{ textAlign : 'center' }}
                                  >
                                    <img
                                        className="link pointer dim img-responsive"
                                        src= {require("../../../images/covers/video.png")}
                                        alt={content.title}
                                        width="150px"
                                        id={content.id}
                                        // onClick={this.viewReflections}
                                        />
                                    <Badge
                                      pill
                                      className={`card-post__category bg-dark`}
                                    >
                                       {content.category ? content.category.name : ''}
                                    </Badge>
                                   
                                  </div>
                                  <CardBody className="mb-0 pb-0">
                                    <h5 className="card-title">
                                      <p className="text-fiord-blue link pointer">
                                      {content.title ? content.title : ''}
                                      </p>
                                    </h5>
                                    <div className="card-text d-inline-block mb-0 pb-0">
                                        {/* <Truncate lines={2} ellipsis={<span className="mb-0">... <p className="link pointer blue mb-0 pb-0" id={content.id}>show more</p></span>}>
                                            {content.description}
                                        </Truncate> */}
                                        <ReadMore children={content.description} id={content.id}/>
                                    </div>
                                    </CardBody>
                                  <CardFooter className="mt-0 pt-2">
                                    <span className="text-muted mb-1 pb-0"><i className="material-icons mr-1">person</i>{content.owner ? content.owner.fullname : ''}</span><br/>
                                    {content.price? <b><i className="material-icons mr-1">money</i><span className="text-muted">₦{content.price}</span></b> : ""}
                                  </CardFooter>
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
        </Container>
    );
}
}

export default Video;
