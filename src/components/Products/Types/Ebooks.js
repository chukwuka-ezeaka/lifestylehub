import React from 'react';
import Loader from '../../Loaders/Loader';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react"

class Ebook extends React.Component{
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
                    <h6 className="m-0 text-black">All Ebooks</h6>
                </CardHeader>
                <CardBody className="bg-light p-0 pb-3" style={{width: 'auto'}}>
                {loading ?
                <Loader />
                :
                    Array.isArray(media) && media.length > 0?
                    <table className="table table-light mb-0 table-responsive">
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
                            return(
                                <tr key={media.id}>
                                    <td>{i++}</td>
                                    <td>{media.title ? media.title : ''}</td>
                                    <td>{media.category ? media.category.name : ''}</td>
                                    <td>
                                    <img
                                        className="link pointer dim"
                                        src= {require("./../../../images/covers/pdf.png")}
                                        alt={media.title}
                                        width="40"
                                        id={media.id}
                                        
                                        />
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

export default Ebook;
