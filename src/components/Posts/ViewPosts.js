import React from 'react';
import Loader from '../Loaders/Loader';
import { withRouter } from 'react-router-dom';
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    CardBody,
    CardFooter,
    Button
} from "shards-react";
import GetImage from '../common/getImage';



class Post extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    }



render(){
    const { error, posts, loading } = this.props;
    return(

        <Container fluid className="mt-4">
            <h5 className="card-title">All Posts</h5>
                
                {loading ?
                <Loader />
                :
                    Array.isArray(posts) && posts.length > 0 ?
                    <Row>
                    {this.props.posts.map((post, index)  => {
                            //let contentId = `#${post.id}`;
                            //console.log(index);
                            return (
                                <Col lg="4" key={index}>
                                <Card small className="card-post mb-4">
                                  <CardBody>
                                    {/* <h5 className="card-title">{post.title}</h5> */}
                                    <p className="card-text text-muted">{post.content}</p>
                                  </CardBody>
                                  <CardFooter className="border-top">
                                    <Row className="px-auto">
                                        <Col lg="3" md="3" sm="4"className="f7 text-primary fw4">
                                        <i className="material-icons mr-1">thumb_up</i>{post.like_count}<br/>
                                        <span>Likes</span>
                                        </Col>
                                        <Col lg="3" md="4" sm="4" xs="4" className="f7 text-primary fw4">
                                        <i className="material-icons mr-1">chat_bubble_outline</i>{post.comment_count}<br/>
                                        <span>Comments</span>
                                        </Col>
                                        <Col lg="4" md="4" sm="4" xs="4" className="f7 text-primary fw4">
                                            <Button size="md" theme="info"> View
                                            </Button>
                                        </Col>
                                    </Row>
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
                    : <p className="f4 fw6 text-center">You have no posts yet</p>
            }
        </Container>
    );
}
}


export default withRouter(Post);
