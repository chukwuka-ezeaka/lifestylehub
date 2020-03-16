import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import axios from 'axios';

import PageTitle from "../components/common/PageTitle";
import Category from '../components/Products/Category/Category';
import Media from '../components/Products/AddProduct/Media';
import Content from '../components/Products/AddProduct/Content';
import Stats from '../components/Products/Stats';
import HttpService from "../utils/API";
import Audio from "../components/Products/Types/Audios";
import Video from "../components/Products/Types/Videos";
import Ebook from "../components/Products/Types/Ebooks";
import Author from "../components/Products/Types/Audios";

const _http = new HttpService();
const views = {
  showAll: false,
  showVideo: false,
  showAudio: false,
  showEbook: false,
  showAuthor: false,
  showContent: false,
  showAddContent: false,
  showAddMedia: false,
  showCategories: false
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
          loading: false,
          errorMessage: ''
        }
    }
  

showContent = (handle) => {
  switch(handle){
    case '/products/allProducts':
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
      case '/products/contents':
        this.setState({showViews: {showContent: true}})
        break;
      case '/products/addMedia':
        this.setState({showViews: {showAddMedia: true}})
        break;
      case '/products/addContent':
        this.setState({showViews: {showAddContent: true}})
        break;
      case '/products/Category':
        this.setState({showViews: {showCategories: true}})
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
    const { media, contents, user, errorMessage, loading} = this.state;
    const { showAddMedia, showCategories, showAddContent, showAll, showAudio, showAuthor, showContent, showEbook, showVideo } = this.state.showViews;
    let video, audio, ebook = [];
    if((media) && (media.length > 0)){
      video = media.filter(media => {
        if(media.media_type){
            return media.media_type.id === 1;
        }
      });

      audio = media.filter(media => {
        if(media.media_type){
            return media.media_type.id === 5;
        }
      });
      
      ebook = media.filter(media => {
        if(media.media_type){
            return media.media_type.id === 4;
        }
      });
  } 
    return(
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Products" subtitle="" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            {showAll ?
            <Stats media={media} contents={contents}/>
            :
            showVideo ?
            <Video media={video} user={user} error={errorMessage} loading={loading}/>
            :
            showAudio ? 
            <Audio media={audio} user={user} error={errorMessage} loading={loading}/>
            :
            showEbook ?
            <Ebook media={ebook} user={user} error={errorMessage} loading={loading}/>
            :
            showAuthor ? 
            <Author media={Author} user={user} error={errorMessage} loading={loading}/>
            :
            showContent ? 
            <Content media={contents} user={user}/>
            :
            showCategories ?
            <Category />
            :
            showAddMedia ?
            <Media />
            :
            showAddContent ?
            <Content />
            : ''
            }
          </Col>
        </Row>
      </Container>
    );
    }

    getContents = () => {
      this.setState({loading: true})
      const mediaUrl = `content/media/list?owner_id=${this.state.user.id}`;
      const contentUrl= `content/list?owner_id=${this.state.user.id}`;
      axios.all([
        _http.sendGet(mediaUrl),
        _http.sendGet(contentUrl)
        ])
        .then(axios.spread((response1, response2)=> {
          //   console.log(response1.data)
          //   console.log(response2.data)
          this.setState({media: response1.data, contents: response2.data, loading: false})
        }))
    }
  }

export default withRouter(Products);
