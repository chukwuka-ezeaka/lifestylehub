import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Media from '../components/Products/AddProduct/Media';
import Content from '../components/Products/AddProduct/Content';
import HttpService from "../utils/API";
import Loader from "../components/Loaders/Loader";

const _http = new HttpService();
const views = {
  showAddContent: false,
  showAddMedia: false
}

class Add extends React.Component {
   constructor(props){
        super(props);
        this.state={
          user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {},
          userData: {},
          showViews: views,
          path: '',
          errorMessage: '',
          loading: true,
        }
    }
  

showContent = (handle) => {
  switch(handle){
    case '/add':
        this.setState({showViews: {showAddMedia: true}})
        break;
      case '/add/media':
        this.setState({showViews: {showAddMedia: true}})
        break;
      case '/add/text':
        this.setState({showViews: {showAddContent: true}})
        break;
    default:
      this.setState({showViews: {showAddMedia: true}})
      break;
  }
}

componentDidMount(){
  this.unlisten = this.props.history.listen((location, action) => {
    this.setState({path: location.pathname});
  });
  const handle = this.props.location.pathname;
  this.showContent(handle);
  this.getUser();
}

componentDidUpdate(prevProps, prevState){
  if(prevState.path !== this.state.path){
    this.setState({showViews: views});
    this.showContent(this.state.path);
  }
}

componentWillUnmount = () => {
  this.unlisten();
}

  render(){
    const { showAddMedia, showAddContent } = this.state.showViews;
    let content = '';
    if(this.state.loading){
      content = <Loader/>
    }else{
      content =  <Row>
        <Col lg="12" md="12">
          {
          showAddMedia ?
          <Media user={this.state.userData} />
          :
          showAddContent ?
          <Content user={this.state.userData} />
          : null
          }
        </Col>
      </Row>
    }
    return(
      <Container fluid className="main-content-container px-4 pb-4">
        
         <Row noGutters className="page-header">
              <PageTitle sm="4" title="Products" subtitle="" className="text-sm-left" />
        </Row>
       {content}
      </Container>
    );
    }

    getUser = () => {
      
      const url = `account/user/list?email=${this.state.user.email}&role=${this.state.user.role.id}`
      
      _http.sendGet(url)
      .then(response => {
       // console.log(response)
        if(response.status === 'success'){
          this.setState({ userData: response.data[0], loading: false})
        }else{
        this.setState({ loading: false})
        _http.notify(response.message);
        }
      })
    }

  }

export default withRouter(Add);
