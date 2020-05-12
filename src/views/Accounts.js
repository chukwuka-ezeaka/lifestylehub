import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
//import HttpService from '../utils/API';

import PageTitle from "../components/common/PageTitle";
import Wallet from "../components/Accounts/Wallet";
import Settings from "../components/Accounts/Settings";

//const _http = new HttpService();

const views = {
  showWallet: false,
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
    case '/accounts/wallet':
      this.setState({showViews: {showWallet: true}})
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
    const {showWallet, showSettings} = this.state.showViews;
    return(
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header">
              <PageTitle sm="4" title="Accounts" subtitle="Users" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            {
            showWallet ? 
            <Wallet error={errorMessage} loading={loading}/>
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
