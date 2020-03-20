import React from 'react';
import Loader from '../../Loaders/Loader';
import { withRouter } from 'react-router-dom';
import Truncate from 'react-truncate';
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    CardBody,
    Badge,
    CardFooter,
} from "shards-react";
import GetImage from '../../common/getImage';
import ReadMore from '../../ReadMore/ReadMore';



class Text extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    }



render(){
    const { error, contents, loading } = this.props;
    return(

        <Container fluid className="mt-4">
            <h5 className="card-title">All Texts</h5>
                
                {loading ?
                <Loader />
                :
                    Array.isArray(contents) && contents.length > 0 ?
                    <Row>
                    {this.props.contents.map((content, index)  => {
                            //let contentId = `#${content.id}`;
                            //console.log(index);
                            return (
                                <Col lg="3" md="3" sm="12" className="mb-4" key={content.id}>
                                <Card small className="card-post card-post--1 pb-0" style={{'minHeight': '100%'}}>
                                  <div
                                    className="card-post__image"
                                    style={{ textAlign : 'center' }}
                                  >
                                      {content.content_art ? <GetImage image={content.content_art}   title={content.title} width="100px"/> : ""}
                                    <Badge
                                      pill
                                      className={`card-post__category bg-dark`}
                                    >
                                       {content.category ? content.category.name : 'No category'}
                                    </Badge>
                                  </div>
                                  <CardBody className="mb-0 pb-0">
                                    <h5 className="card-title">
                                      <p className="text-fiord-blue">
                                      <Truncate lines={2} ellipsis={<span>... </span>}>
                                            { content.title}
                                        </Truncate>
                                      {/* {content.title ? content.title : ''} */}
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
                                  <p><span className="text-muted"><i className="material-icons mr-1">person</i>{content.owner ? content.owner.fullname : ''}</span></p>
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


export default withRouter(Text);
