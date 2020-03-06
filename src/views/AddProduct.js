import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Media from '../components/Products/AddProduct/Media';
import Content from '../components/Products/AddProduct/Content';
import HttpService from "../utils/API";

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
          showViews: views,
          path: '',
          errorMessage: ''
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
  
    return(
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Products" subtitle="" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            {
            showAddMedia ?
            <Media />
            :
            showAddContent ?
            <Content />
            : null
            }
          </Col>
        </Row>
      </Container>
    );
    }

  }

export default withRouter(Add);
