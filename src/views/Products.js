import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Category from '../components/Products/Category/Category';
import Content from '../components/Products/AddProduct/Content';
import Stats from '../components/Products/Stats';
import HttpService from "../utils/API";
import Audio from "../components/Products/Types/Audios";
import Video from "../components/Products/Types/Videos";
import Ebook from "../components/Products/Types/Ebooks";
import Author from "../components/Products/Types/Audios";
import Subscriptions from "../components/Products/Subscriptions/Subscriptions";
import Loader from "../components/Loaders/Loader";
import Text from "../components/Products/Types/Text";

const _http = new HttpService();
const views = {
  showAll: false,
  showVideo: false,
  showAudio: false,
  showEbook: false,
  showAuthor: false,
  showContent: false,
  showText: false,
  showAddContent: false,
  showAddMedia: false,
  showCategories: false,
  showSubscriptions: false
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
          errorMessage: ''
        }
    }
  

showContent = (handle) => {
  switch(handle){
    case '/products':
      this.setState({showViews: {showAll: true}})
      break;
    case '/products/videos':
        this.setState({showViews: {showVideo: true}})
        break;
    case '/products/audios':
        this.setState({showViews: {showAudio: true}})
        break;
      case '/products/ebooks':
        this.setState({showViews: {showEbook: true}})
        break;
      case '/products/authors':
        this.setState({showViews: {showAuthor: true}})
        break;
      case '/products/text':
          this.setState({showViews: {showText: true}})
          break;
      case '/products/contents':
        this.setState({showViews: {showContent: true}})
        break;
      case '/products/Category':
        this.setState({showViews: {showCategories: true}})
        break;
      case '/products/subscriptions':
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
    this.setState({showViews: views});
    this.showContent(this.state.path);
  }
}

componentWillUnmount = () => {
  this.unlisten();
}

  render(){
    const { contents, user, errorMessage, loading} = this.state;
  //
    const { showCategories, showAll, showAudio, showAuthor, showContent, showEbook, showVideo, showText, showSubscriptions } = this.state.showViews;
    let video  = [];
    let audio  = [];
    let ebook = [];
    let text = [];
    if(Array.isArray(contents) && (contents.length > 0)){
      video = contents.filter(content => {
            return content.content_type.id === 1;
      });

      audio = contents.filter(content => {
            return content.content_type.id === 5;
      });
      
      ebook = contents.filter(content => {
            return content.content_type.id === 4;
      });

      text = contents.filter(content => {
        return content.content_type.id === 7;
  });
  } 

  
    return(
      loading ? 
      <Container fluid className="main-content-container px-4 pb-4">
        <Loader />
      </Container>
      :
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Products" subtitle="" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            {showAll ?
            <Stats contents={contents} loading={loading}/>
            :
            showVideo ?
            <Video contents={video} user={user} error={errorMessage} loading={loading}/>
            :
            showAudio ? 
            <Audio contents={audio} user={user} error={errorMessage} loading={loading}/>
            :
            showEbook ?
            <Ebook contents={ebook} user={user} error={errorMessage} loading={loading}/>
            :
            showText ?
            <Text contents={text} user={user} error={errorMessage} loading={loading}/>
            :
            showAuthor ? 
            <Author contents={Author} user={user} error={errorMessage} loading={loading}/>
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
  }

export default withRouter(Products);
