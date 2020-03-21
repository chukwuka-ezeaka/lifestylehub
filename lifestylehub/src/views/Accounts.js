import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
<<<<<<< HEAD:lifestylehub/src/views/Accounts.js
<<<<<<< HEAD:src/views/Accounts.js
//import HttpService from '../utils/API';
=======
import HttpService from '../API';
>>>>>>> homefeature:lifestylehub/src/views/Accounts.js
=======
import HttpService from '../utils/API';
>>>>>>> parent of 1afa491... changed to routing to hasrouter:src/views/Accounts.js

import PageTitle from "../components/common/PageTitle";
import Purchase from "../components/Accounts/Purchase";
import Earnings from "../components/Accounts/Earnings";
import Settings from "../components/Accounts/Settings";

//const _http = new HttpService();

const views = {
  showEarnings: false,
  showPurchase: false,
  showSettings: false
}

class Accounts extends React.Component {
   constructor(props){
        super(props);
        this.state={
            loading: true,
            showViews: views,
            path: '',
            errorMessage: ''
        }
    }
  
  componentWillMount() {
}

showContent = (handle) => {
  switch(handle){
    case '/accounts/earnings':
      this.setState({showViews: {showEarnings: true}})
      break;
    case '/accounts/purchase':
      this.setState({showViews: {showPurchase: true}})
      break;
    case '/account/settings':
      this.setState({showViews: {showSettings: true}})
      break;
    default:
      this.setState({showViews: {showSettings: true}})
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
  this.abortController.abort();
  this.unlisten();
};

abortController = new window.AbortController(); 

  render(){
    const {loading, errorMessage } = this.state;
    const {showEarnings, showPurchase, showSettings} = this.state.showViews;
    return(
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Accounts" subtitle="Users" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            {
            showEarnings ? 
            <Earnings error={errorMessage} loading={loading}/>
              :
                showPurchase ?
                <Purchase error={errorMessage} loading={loading}/>
                :
                showSettings?
                <Settings />
                :
                 null
            }
            
          </Col>
        </Row>
      </Container>
    );
    }
  }

export default withRouter(Accounts);
