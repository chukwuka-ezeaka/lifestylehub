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
    const { reflections, loading } = this.state;
    return(

        <Container fluid className="mt-4">
            <h5 className="card-title">All reflections</h5>
                {loading ?
                <Loader />
                :
                <Row>
                    {reflections ?
                    reflections.map((reflection, index)  => {
                            //let reflectionId = `#${reflection.id}`;
                            //console.log(index);
                            return (
                                <Col lg="3" md="6" sm="12" className="mb-4" key={reflection.id}>
                                <Card small className="card-post card-post--1">
                                  <div
                                    className="card-post__image"
                                    style={{ textAlign : 'center' }}
                                  >
                                      {reflection.content? <GetImage image={reflection.image_link}   title={reflection.title} width="150px"/> : <LoaderSmall/>}
                                    <Badge
                                      pill
                                      className={`card-post__category bg-dark`}
                                    >
                                       {reflection.author ? reflection.author : ''}
                                    </Badge>
                                    <div className="card-post__author d-flex">
                                      <img
                                        className="rounded-circle link pointer dim img-responsive"
                                        src= {require("./../../../images/covers/audio.png")}
                                        alt={reflection.title}
                                        width="50px"
                                        id={reflection.id}
                                        onClick={this.viewReflections}
                                        />
                                    </div>
                                  </div>
                                  <CardBody>
                                    <h5 className="card-title">
                                      <p className="text-fiord-blue">
                                      <Truncate lines={2} ellipsis={<span>... </span>}>
                                            { reflection.title}
                                        </Truncate>
                                      {/* {reflection.title ? reflection.title : ''} */}
                                      </p>
                                    </h5>
                                    <div className="card-text d-inline-block mb-0">
                                        <Truncate lines={3} ellipsis={<span>... <p className="link pointer blue" id={reflection.id} onClick={this.viewReflections}>show more</p></span>}>
                                            {reflection.content}
                                        </Truncate>
                                    </div>
                                    <span className="text-muted">{reflection.date ? reflection.date : ''}</span>
                                  </CardBody>
                                </Card>
                              </Col>

                            //     <Col lg="6" sm="12" className="mb-4" key={reflection.id}>
                            //     <Card small className="card-post card-post--aside card-post--1">
                            //       <div
                            //         className="card-post__image"
                            //         style={{ backgroundImage: `url('${null}')` }}
                            //       >
                            //         <Badge
                            //           pill
                            //           className={`card-post__category bg-dark`}
                            //         >
                            //           {reflection.author ? reflection.author : ''}
                            //         </Badge>
                            //         <div className="card-post__author d-flex">
                            //         <a><img
                            //             className="rounded-circle link pointer dim img-responsive"
                            //             src= {require("./../../../images/covers/audio.png")}
                            //             alt={reflection.title}
                            //             width="50px"
                            //             id={reflection.id}
                            //             onClick={this.viewReflections}
                            //             />
                            //             </a>
                            //         </div>
                            //       </div>
                            //       <CardBody>
                            //         <h5 className="card-title">
                            //           <a className="text-fiord-blue" href="#">
                            //           {reflection.title ? reflection.title : ''}
                            //           </a>
                            //         </h5>
                            //         <p className="card-text d-inline-block mb-3">
                            //             <Truncate lines={3} ellipsis={<span>... <p className="link pointer blue" id={reflection.id} onClick={this.viewReflections}>show more</p></span>}>
                            //                 {reflection.content}
                            //             </Truncate>
                            //         </p>
                            //         <span className="text-muted">{reflection.date ? reflection.date : ''}</span>
                            //       </CardBody>
                            //     </Card>
                            //   </Col>
                            )
                            // return(
                            //     <tr key={reflection.id}>
                            //         <td>{i++}</td>
                            //         <td>{reflection.title ? reflection.title : ''}</td>
                            //         <td>{reflection.author ? reflection.author : ''}</td>
                            //         <td>
                            //             <Truncate lines={3} ellipsis={<span>... <p className="link pointer blue" id={reflection.id} onClick={this.viewReflections}>show more</p></span>}>
                            //                 {reflection.content}
                            //             </Truncate>
                            //         </td>
                            //         <td>
                            //         {reflection.content? <GetImage image={reflection.image_link} title={reflection.title} width={width}/> : <LoaderSmall/>} 
                            //         </td>
                            //         <td>
                            //              <img
                            //             className="rounded-circle link pointer dim"
                            //             src= {require("./../../../images/covers/audio.png")}
                            //             alt={reflection.title}
                            //             width="80"
                            //             id={reflection.id}
                            //             onClick={this.viewReflections}
                            //             />
                            //         </td>
                            //         <td>{reflection.postedBy ? reflection.postedBy : ''}</td>
                            //         <td             >{reflection.date ? reflection.date : ''}</td>
                            //         <td>
                            //             <Button size="sm" theme="warning" className="mb-2 mr-1" onClick={this.handleDelete} id={reflection.id}>
                            //                 {this.state.requestPending ? <LoaderSmall /> : 'Delete'}
                            //             </Button>
                            //         </td>
                                   
                            //     </tr> 
                                
                            // )
                        })
                        : <div></div>
                    }
                </Row>
                }
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
