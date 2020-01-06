import React from 'react';
import Loader from '../../Loaders/Loader';
import { confirmAlert } from 'react-confirm-alert';
import LoaderSmall from '../../Loaders/LoaderSmall';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react"
import HttpService from '../../../utils/API';

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
            errorMessage: ''
        }
}   

notify = (message) => {
    switch(this.state.type){
      case "success":
              toast.success(message);
          break;
      case "warn":
          toast.warn("Error: " + message);
          break;
      default:
          break;
    }
  }
  
componentDidMount(){
    if(!this.state.reflections[0]) this.getReflections()
}

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
                            Media
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
                                    <td>{reflection.content ? reflection.content : ''}</td>
                                    <td>
                                        
                                        <img src={`data:${this.state.image_type};base64,${this.state.image}`} alt="Test Image"  width="80"/>
                                    </td>
                                    <td>
                                         <img
                                        className="rounded-circle link pointer dim"
                                        src= {require("./../../../images/audio-cover/audio.png")}
                                        alt={reflection.title}
                                        width="80"
                                        id={reflection.id}
                                        onClick={this.viewReflections}
                                        />
                                    </td>
                                    <td>{reflection.postedBy ? reflection.postedBy : ''}</td>
                                    <td>{reflection.createdAt ? reflection.createdAt : ''}</td>
                                    <td>{reflection.updatedAt ? reflection.updatedAt : ''}</td>
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

getImage = (image)=>{
    const url = `media/manager/image/single/find/${image}`;
    _http.sendGet(url)
    .then(res => {
        if('image' in res.data.data && 'type' in res.data.data){
        const {image, type} = res.data.data;
        this.setState({
            image:image,
            image_type:type
        })
        }else{
            console.log('Invalid media received')
        }
    })
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
    this.setState({ requestPending: true })
    const headers = { headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization : `Bearer ${localStorage.getItem('Auth')}
        `}}

    axios.delete(`https://lshub.herokuapp.com/api/v1/reflection/${id}`, headers)
          .then(object => {
            this.setState({ requestPending: false });
            switch(object.data.status){
            case "success":
                this.setState({type: "success"});
                this.notify(object.data.message);
                this.getReflections();
            break;
            case "fail":
                this.setState({type: "warn"});
                this.notify(object.data.message); 
            break;
            default:
                    this.setState({type: "warn"});
                this.notify(object.data.message);
            break;
        }
            console.log(object);
        }, (error) => {
            this.setState({ requestPending: false });
            console.log(error);
        });
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
