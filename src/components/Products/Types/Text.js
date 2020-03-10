import React from 'react';
import Loader from '../../Loaders/Loader';
import { confirmAlert } from 'react-confirm-alert';
import LoaderSmall from '../../Loaders/LoaderSmall';
import { withRouter } from 'react-router-dom';
import Truncate from 'react-truncate';
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    CardBody,
    Badge,
} from "shards-react"
import HttpService from '../../../utils/API';
import GetImage from '../../common/getImage';

const _http = new HttpService();

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
                                <Card small className="card-post card-post--1">
                                  <div
                                    className="card-post__image"
                                    style={{ textAlign : 'center' }}
                                  >
                                      {content.content_art ? <GetImage image={content.content_art}   title={content.title} width="150px"/> : ""}
                                    <Badge
                                      pill
                                      className={`card-post__category bg-dark`}
                                    >
                                       {content.category ? content.category.name : 'No category'}
                                    </Badge>
                                  </div>
                                  <CardBody>
                                    <h5 className="card-title">
                                      <p className="text-fiord-blue">
                                      <Truncate lines={2} ellipsis={<span>... </span>}>
                                            { content.title}
                                        </Truncate>
                                      {/* {content.title ? content.title : ''} */}
                                      </p>
                                    </h5>
                                    <div className="card-text d-inline-block mb-0">
                                        <Truncate lines={3} ellipsis={<span>... <p className="link pointer blue" id={content.id}>show more</p></span>}>
                                            {content.description}
                                        </Truncate>
                                    </div>
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


export default withRouter(Text);
