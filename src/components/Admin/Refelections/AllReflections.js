import React from 'react';
import Loader from '../../Loaders/Loader';
import { confirmAlert } from 'react-confirm-alert';
import LoaderSmall from '../../Loaders/LoaderSmall';
import { withRouter } from 'react-router-dom';
import Truncate from 'react-truncate';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react"
import HttpService from '../../../utils/API';
import GetImage from '../../common/getImage';

const _http = new HttpService();

class AllReflections extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open: false,
            image: '',
            image_type: '',
            requestPending: false,
            length: 0,
            reflections: [],
            loading: true,
            errorMessage: '',
            width: "100"
        };
    }

  
componentDidMount(){
    this.getReflections()
}

render(){
    const { reflections, loading, width } = this.state;
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
                        <th scope="col" className="border-0" width="300px">
                            Content
                        </th>
                        <th scope="col" className="border-0">
                            Cover Image
                        </th>
                        <th scope="col" className="border-0">
                            Media
                        </th>
                        <th scope="col" className="border-0">
                            Posted By
                        </th>
                        <th scope="col" className="border-0" width="100px">
                            Date
                        </th>
                        <th scope="col" className="border-0">

                        </th>
                        </tr>
                    </thead>
                    <tbody  className="f6">
                    {reflections ?
                    reflections.map((reflection, index)  => {
                            //let reflectionId = `#${reflection.id}`;
                            //console.log(index);
                            return(
                                <tr key={reflection.id}>
                                    <td>{i++}</td>
                                    <td>{reflection.title ? reflection.title : ''}</td>
                                    <td>{reflection.author ? reflection.author : ''}</td>
                                    <td>
                                        <Truncate lines={3} ellipsis={<span>... <p className="link pointer blue" id={reflection.id} onClick={this.viewReflections}>show more</p></span>}>
                                            {reflection.content}
                                        </Truncate>
                                    </td>
                                    <td>
                                    {reflection.content? <GetImage image={reflection.image_link} title={reflection.title} width={width}/> : <LoaderSmall/>} 
                                    </td>
                                    <td>
                                         <img
                                        className="rounded-circle link pointer dim"
                                        src= {require("./../../../images/covers/audio.png")}
                                        alt={reflection.title}
                                        width="80"
                                        id={reflection.id}
                                        onClick={this.viewReflections}
                                        />
                                    </td>
                                    <td>{reflection.postedBy ? reflection.postedBy : ''}</td>
                                    <td             >{reflection.date ? reflection.date : ''}</td>
                                    <td>
                                        <Button size="sm" theme="warning" className="mb-2 mr-1" onClick={this.handleDelete} id={reflection.id}>
                                            {this.state.requestPending ? <LoaderSmall /> : 'Delete'}
                                        </Button>
                                    </td>
                                   
                                </tr> 
                                
                            )
                        })
                    : <tr></tr>}
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


  handleDelete = (event) => {
     const reflectionId = event.target.id;
    confirmAlert({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this reflection?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.deleteReflection(reflectionId)
          },
          {
            label: 'No',
            
          }
        ]
      });
  }

  deleteReflection = (id) => {
      const url = `reflection/${id}`;
    _http.sendDelete(url)
    .then(response => {
    this.setState({ requestPending: false });
        let type = "";
        if(response.status === "success"){
            type = "success";
            _http.notify(response.message, type)
        }else{
            type = "warn";
            _http.notify(response.message, type)
        }
    })
  }

  getReflections = () => {
    const url = "reflection/list";
    _http.sendGet(url)
    .then(response => {
        response.data ?
        this.setState({ errorMessage: '', reflections: response.data, loading: false })
        :
        this.setState({ errorMessage: response.message, loading: false })
    })
  } 

  viewReflections = (event) => {
      const id = event.target.id
      this.props.history.push(`/viewReflection/?name=reflection&id=${id}`)
  }
}


export default withRouter(AllReflections);
