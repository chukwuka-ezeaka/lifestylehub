import React from 'react';
import Loader from '../../Loaders/Loader';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react"

class AllReflections extends React.Component{
    constructor(){
        super();
        this.state={
            open: false,
            reflections: [],
            loading: true
        }
    }


    componentDidMount(){
        fetch('https://lshub.herokuapp.com/api/v1/reflection/list',{
          method: 'get',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'bearer ' + localStorage.getItem('Auth'),
          },
          signal: this.abortController.signal
        })
        .then(response => response.json())
        .then(object => {
            this.setState({
                reflections: object.data,
                loading: false
            })
        })
        .catch(err => {
            this.setState({
                loading: false
            });
            if (err.name === 'AbortError') return; // expected, this is the abort, so just return
            throw err;
        });
       
      }

      componentWillUnmount = () => {
        this.abortController.abort();
      };
      
      abortController = new window.AbortController();  
        

render(){
    const {reflections, loading } = this.state;
    let i = 1;
    return(

        <Container className="mt-4">
            <Row>
            <Col>
                <Card small className="mb-4 overflow-hidden">
                <CardHeader className="bg-light">
                    <h6 className="m-0 text-black">All Reflections</h6>
                </CardHeader>
                <CardBody className="bg-light p-0 pb-3">
                {loading ?
                <Loader />
                :
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
                            Author
                        </th>
                        <th scope="col" className="border-0">
                            Content
                        </th>
                        <th scope="col" className="border-0">
                            Cover Image
                        </th>
                        <th scope="col" className="border-0">
                            Posted By
                        </th>
                        <th scope="col" className="border-0">
                            created At
                        </th>
                        <th scope="col" className="border-0">
                            Updated At
                        </th>
                        <th scope="col" className="border-0">

                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    reflections.map((reflection, index)  => {
                            //let reflectionId = `#${reflection.id}`;
                            //console.log(index);
                            return(
                                <tr key={reflection.id}>
                                    <td>{i++}</td>
                                    <td>{reflection.title ? reflection.title : ''}</td>
                                    <td>{reflection.author ? reflection.author : ''}</td>
                                    <td>{reflection.content ? reflection.content : ''}</td>
                                    <td><img
                                            id="cover-image"
                                            className="d"
                                            style={{ maxWidth: "60px" }}
                                            src={reflection.image_link ? reflection.image_link : ''}
                                            alt="cover-image"
                                        />
                                    </td>
                                    <td>{reflection.postedBy ? reflection.postedBy : ''}</td>
                                    <td>{reflection.createdAt ? reflection.createdAt : ''}</td>
                                    <td>{reflection.updatedAt ? reflection.updatedAt : ''}</td>
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
                }
                </CardBody>
                </Card>
            </Col>
            </Row>
        </Container>
    );
}
}

export default AllReflections;
