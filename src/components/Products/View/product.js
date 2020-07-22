import React from 'react';
import Loader from '../../Loaders/Loader';
import { 
    Container,
     Row, 
     Col, 
     Card, 
     CardBody, 
     Badge,
     CardFooter ,
     FormSelect,
     FormInput,
     InputGroupAddon,
     InputGroup
    } from "shards-react"
import SingleMedia from './SingleMediaModal';
import ReadMore from '../../ReadMore/ReadMore';

class ViewProduct extends React.Component{
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

    const { contents, error, loading, type } = this.props;
    let showModal = '';
    let icon = null;
    //console.log(contents)
    if(type === 'video'){
        icon = require("../../../images/covers/video.png")
        require("../../../images/covers/audio.png")
      }
      if(type === 'audio'){
        icon = require("../../../images/covers/audio.png")
      }
      if(type === 'ebook'){
        icon = require("../../../images/covers/pdf.png")
      }
    if(this.state.currentMedia !== null){
         showModal = <SingleMedia media={this.state.currentMedia} toggle={this.toggleModal} open={this.state.open}/>;
    }
    return(

        <Container className="mt-4">
            <h5 className="card-title">All {type}s </h5>
                {loading ?
                <Loader />
                :
                
                    Array.isArray(contents) && contents.length > 0 ?
                   <Row>
                      <InputGroup className="mb-3 mx-3">
                        <InputGroupAddon type="prepend">
                        <FormSelect onChange={this.searchFilter}>
                        <option vlaue="all">All</option>
                        <option value="name">Name</option>
                        {/* <option value="reflectionname">Username</option> */}
                        <option value="author">Author</option>
                        <option value="category">Category</option>
                        </FormSelect> 
                        </InputGroupAddon>
                        <FormInput type="text" placeholder="search for product..." onInput={this.searchInput}/>
                    </InputGroup>
                    {contents.map((content, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            //console.log(content);
                            return(
                                <Col lg="3" md="3" sm="6" className="mb-4" key={content.id}>
                                <Card small className="card-post card-post--1 mx-0" style={{'height': '100%'}}>
                                  <div
                                    className="card-post__image mb-0"
                                    style={{ textAlign : 'center' }}
                                  >
                                    <img
                                        className="link pointer dim img-responsive"
                                        src= {icon}
                                        alt={content.title}
                                        height="150px"
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
                                  <CardBody className="my-n5">
                                    <p className="card-title mb-n3">
                                      <p onClick={this.toggleModal} id={index} className="text-fiord-blue link pointer">
                                      {content.title ? content.title : ''}
                                      </p>
                                    </p>
                                    <div className="card-text d-inline-block mb-0 pb-0 f5">
                                        {/* <Truncate lines={2} ellipsis={<span className="mb-0">... <p className="link pointer blue mb-0 pb-0" id={content.id}>show more</p></span>}>
                                            {content.description}
                                        </Truncate> */}
                                        <ReadMore children={content.description} id={content.id}/>
                                    </div>
                                    </CardBody>
                                  <CardFooter className="mt-0 pt-2 f5">
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
                {showModal}
        </Container>
    );
}


}

export default ViewProduct;
