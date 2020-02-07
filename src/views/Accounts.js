import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import HttpService from '../utils/API';

import PageTitle from "../components/common/PageTitle";
import Invite from "../components/Admin/Accounts/Invite";
import Purchase from "../components/Admin/Accounts/Purchase";
import Downloads from "../components/Admin/Accounts/Downloads";

const _http = new HttpService();

const views = {
  showDownloads: false,
  showPurchase: false,
  showInvite: false
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
    case '/accounts/downloads':
      this.setState({showViews: {showDownloads: true}})
      break;
    case '/accounts/purchase':
      this.setState({showViews: {showPurchase: true}})
      break;
    case '/account/invite':
      this.setState({showViews: {showInvite: true}})
      break;
    default:
      this.setState({showViews: {showInvite: true}})
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
    const {showDownloads, showPurchase, showInvite} = this.state.showViews;
    return(
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Accounts" subtitle="Users" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            {
            showDownloads ? 
            <Downloads error={errorMessage} loading={loading}/>
              :
                showPurchase ?
                <Purchase error={errorMessage} loading={loading}/>
                :
                  showInvite ?
                  <Invite error={errorMessage} loading={loading}/>
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
