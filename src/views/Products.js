import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Category from '../components/Products/Category/Category';
import Content from '../components/Products/AddProduct/Content';
import Stats from '../components/Products/Stats';
import HttpService from "../utils/API";
import Subscriptions from "../components/Products/Subscriptions/Subscriptions";
import Loader from "../components/Loaders/Loader";
import ViewProduct from "../components/Products/View/ViewProduct";

const _http = new HttpService();
const views = {
  showAll: false,
  showContent: false,
  showStore: false,
  showProduct: false,
  showAddContent: false,
  showAddMedia: false,
  showCategories: false,
  showSubscriptions: false,
}

class Products extends React.Component {
   constructor(props){
        super(props);
        this.state={
          user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {},
          contents: [],
          media: [],
          loading: true,
          showViews: views,
          path: '',
          errorMessage: '',
          contentType: ''
        }
    }
  

showContent = (handle) => {
  switch(handle){
    case '/products/all':
      this.setState({showViews: {showAll: true}})
      break;
    case '/products/store':
        this.setState({contentType: "storeContent",showViews:{showProduct: true}})
        break;
      case '/products/freebie':
        this.setState({contentType: "freebieContent", showViews:{showProduct: true}})
        break;
      case '/products/subscription':
        this.setState({contentType: "subscriptionContent", showViews:{showProduct: true}})
        break;
      case '/products/contents':
        this.setState({showViews: {showContent: true}})
        break;
      case '/products/Category':
        this.setState({showViews: {showCategories: true}})
        break;
      case '/products/subscriptions/settings':
        this.setState({showViews: {showSubscriptions: true}})
        break;
    default:
      this.setState({showViews: {showAll: true}})
      break;
  }
}

componentDidMount(){
  this.unlisten = this.props.history.listen((location, action) => {
    this.setState({path: location.pathname});
  });
  const handle = this.props.location.pathname;
  this.showContent(handle);
  this.getContents();
}

componentDidUpdate(prevProps, prevState){
 
  if(prevState.path !== this.state.path){
    console.log('update')
    this.setState({showViews: views});
    this.showContent(this.state.path);
  }
}

componentWillUnmount = () => {
  this.unlisten();
}

  render(){
    const { contents, user, errorMessage, loading, contentType} = this.state;
  //
    const { showCategories, showAll, showContent,showSubscriptions, showProduct } = this.state.showViews;
    let payload = [];
    if(Array.isArray(contents) && (contents.length > 0)){
      if(contentType === "subscriptionContent") payload = contents.filter(content => {
        return !content.price;
      });
      if(contentType === "storeContent") payload = contents.filter(content => {
        return content.price;
      });
      if(contentType === "freebieContent") payload = contents.filter(content => {
        return parseInt(content.free) === 1;
      });
  //     video = contents.filter(content => {
  //           return content.content_type.id === 1 && content.price === null;
  //     });

  //     audio = contents.filter(content => {
  //           return content.content_type.id === 5 && content.price === null;
  //     });
      
  //     ebook = contents.filter(content => {
  //           return content.content_type.id === 4 && content.price === null;
  //     });

  //     text = contents.filter(content => {
  //       return content.content_type.id === 7 && content.price === null;
  // });
  } 

  
    return(
      loading ? 
      <Container fluid className="main-content-container px-4 pb-4">
        <Loader />
      </Container>
      :
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header">
              <PageTitle sm="4" title="Products" subtitle="" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            {showAll ?
            <Stats contents={contents} loading={loading}/>
            :
            showProduct ?
            <ViewProduct contents={payload} user={user} error={errorMessage} loading={loading}/>
            :
            showContent ? 
            <Content contents={contents} user={user}/>
            :
            showCategories ?
            <Category />
            :
            showSubscriptions ?
            <Subscriptions/>
            : null
            }
          </Col>
        </Row>
      </Container>
    );
    }

    getContents = () => {
    //  console.log(this.state.user.id);
    let contentUrl = "";
      this.setState({loading: true})
      if(this.state.user.role.id === 75){
        contentUrl= `content/list`;
      }else{
      contentUrl= `content/list?owner_id=${this.state.user.id}`;
      }
        _http.sendGet(contentUrl)
        .then(response => {
          //   console.log(response1.data)
          //   console.log(response2.data)
          this.setState({contents: response.data, loading: false})
        })
    }

  
   deleteContent = (id) => {
       const url = `content/${id}`;
       this.setState({requestPending: true});
     _http.sendDelete(url)
     .then(response => {
          this.setState({requestPending: false});
          let type = "";
          if(response.status === "success"){
              type = "success";
              _http.notify(response.message, type)
              this.getContents();
          }else{
              type = "warn";
              _http.notify(response.message, type)
          }
     })
   }
  }

  

export default withRouter(Products);
