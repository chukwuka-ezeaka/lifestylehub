import React from 'react';
import Loader from '../../Loaders/Loader';
import { Container, Row, Col, Card, CardBody, Badge} from "shards-react"

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
                                <Card small className="card-post card-post--1">
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
                                  <CardBody>
                                    <h5 className="card-title">
                                      <p className="text-fiord-blue link pointer">
                                      {content.title ? content.title : ''}
                                      </p>
                                    </h5>
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
        </Container>
    );
}
}

export default Video;
