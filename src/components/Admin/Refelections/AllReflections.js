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
    FormSelect,
    FormInput,
    InputGroupAddon,
    InputGroup
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
            width: "100",
            searchQuery: null,
            filter: ''
        };
    }

  
componentDidMount(){
    this.getReflections()
}

searchFilter = (e) => {
  let filter = e.target.value;
   return this.setState({filter: filter});
}

searchInput = (e) => {
  let value = e.target.value;
 this.setState({ searchQuery: value });
} 

getFilteredReflectionList() {
  return !this.state.searchQuery
    ? this.state.reflections
    : this.state.reflections.filter(reflection => {
        switch(this.state.filter){
          case "all":
              return  reflection.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                      reflection.date.toLowerCase().includes(this.state.searchQuery.toLowerCase());
          case "date":
              return  reflection.date.toLowerCase().includes(this.state.searchQuery.toLowerCase());
          case "title":
              return  reflection.title.toLowerCase().includes(this.state.searchQuery.toLowerCase());
          default:
           return reflection.date.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                  reflection.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        }
       
    }
      );
}     

render(){
    const { loading } = this.state;
    let reflections = this.getFilteredReflectionList();
    return(

        <Container fluid className="mt-4">
            <h5 className="card-title">All reflections</h5>
                {loading ?
                <Loader />
                :
                <Row>
                  <InputGroup className="mb-3 mx-3">
                        <InputGroupAddon type="prepend">
                        <FormSelect onChange={this.searchFilter}>
                        <option vlaue="all">All</option>
                        <option value="date">Date</option>
                        {/* <option value="reflectionname">Username</option> */}
                        <option value="title">Title</option>
                        </FormSelect> 
                        </InputGroupAddon>
                        <FormInput type="text" placeholder="search for reflection..." onInput={this.searchInput}/>
                    </InputGroup>
                    {reflections ?
                    reflections.map((reflection, index)  => {
                            //let reflectionId = `#${reflection.id}`;
                            //console.log(index);
                            return (
                                <Col lg="3" md="3" sm="12" className="mb-4" key={reflection.id}>
                                <Card small className="card-post card-post--1" style={{'height': '100%'}}>
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
                                        className="rounded-circle link pointer dim"
                                        src= {require("./../../../images/covers/audio.png")}
                                        alt={reflection.title}
                                        width="50px"
                                        height="50px"
                                        id={reflection.id}
                                        onClick={this.viewReflections}
                                        />
                                    </div>
                                  </div>
                                  <CardBody className="f5">
                                    <p className="card-title">
                                      <p className="text-fiord-blue">
                                      <Truncate lines={2} ellipsis={<span>... </span>}>
                                            { reflection.title}
                                        </Truncate>
                                      {/* {reflection.title ? reflection.title : ''} */}
                                      </p>
                                    </p>
                                    <div className="card-text d-inline-block my-n3 f6">
                                        <Truncate lines={3} ellipsis={<span>... <p className="link pointer blue" id={reflection.id} onClick={this.viewReflections}>show more</p></span>}>
                                            {reflection.content}
                                        </Truncate>
                                    </div>
                                    <p><span className="text-muted">{reflection.date ? reflection.date : ''}</span></p>
                                  </CardBody>
                                </Card>
                              </Col>

                            )
                           
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
            _http.notify(response.message, type);
            this.getReflections();
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
