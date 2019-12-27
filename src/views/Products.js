import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Category from '../components/Admin/Products/Category/Category';

const views = {
  showCategories: false,
}

class UsersOverview extends React.Component {
   constructor(props){
        super(props);
        this.state={
            loading: true,
            showViews: views,
            path: ''
        }
    }
  
  componentWillMount() {
    if(!localStorage.getItem('Auth')){
      this.props.history.push('/signin');
    }
   
}

showContent = (handle) => {
  switch(handle){
    case '/users/vendors':
      this.setState({showViews: {showCategories: true}})
      break;
    default:
      this.setState({showViews: {showUsers: true}})
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
    const {showCategories} = this.state.showViews;

    return(
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Products" subtitle="" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            
            <Category />
            
            
          </Col>
        </Row>
      </Container>
    );
    }
  }

export default withRouter(UsersOverview);
