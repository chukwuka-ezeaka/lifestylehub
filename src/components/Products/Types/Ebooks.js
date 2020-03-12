import React from 'react';
import Loader from '../../Loaders/Loader';
import { Container, Row, Col, Card, CardBody, Badge } from "shards-react"

class Ebook extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }


render(){
    const { contents, error, loading } = this.props;
    return(

        <Container className="mt-4">
            <h5 className="card-title">All Ebooks</h5>
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
                                        className="pointer dim img-responsive"
                                        src= {require("../../../images/covers/pdf.png")}
                                        alt={content.title}
                                        width="130px"
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
                                      <p  className="text-fiord-blue link pointer">
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
        </Container>
    );
}
}

export default Ebook;
