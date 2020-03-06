import React from 'react';
import Loader from '../../Loaders/Loader';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react"

class Author extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }


render(){
    const { contents, user, error, loading } = this.props;
    let i = 1;
    return(

        <Container className="mt-4">
            <Row>
            <Col>
                <Card small className="mb-4 overflow-hidden">
                <CardHeader className="bg-light">
                    <h6 className="m-0 text-black">All Authors</h6>
                </CardHeader>
                <CardBody className="bg-light p-0 pb-3" style={{width: 'auto'}}>
                {loading ?
                <Loader />
                :
                    Array.isArray(contents) && contents.length > 0?
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
                    {contents.map((content, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            return(
                                <tr key={content.id}>
                                    <td>{i++}</td>
                                    <td>{content.title ? content.title : ''}</td>
                                    <td>{content.category ? content.category.name : ''}</td>
                                    <td>{content.url ? content.url : ''}</td>
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

export default Author;
