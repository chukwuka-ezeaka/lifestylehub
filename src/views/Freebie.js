import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import HttpService from "../utils/API";
import ViewProduct from "../components/Products/View/ViewProduct";
import Loader from "../components/Loaders/Loader";

const _http = new HttpService();
const views = {
  showVideo: false,
  showAudio: false,
  showEbook: false,
}

class Freebie extends React.Component {
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
    case '/freebie/videos':
        this.setState({showViews: {showVideo: true}})
        break;
    case '/freebie/audios':
        this.setState({showViews: {showAudio: true}})
        break;
      case '/freebie/ebooks':
        this.setState({showViews: {showEbook: true}})
        break;
    default:
      this.setState({showViews: {showAudio: true}})
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
    const { showAudio, showEbook, showVideo, } = this.state.showViews;
    let video  = [];
    let audio  = [];
    let ebook = [];
    if(Array.isArray(contents) && (contents.length > 0)){
      video = contents.filter(content => {
            return (content.content_type.id === 1) && (content.free === "1");
      });

      audio = contents.filter(content => {
            return (content.content_type.id) === 5 && (content.free === "1");
      });
      
      ebook = contents.filter(content => {
            return (content.content_type.id === 4) && (content.free === "1");
      });
  } 

  
    return(
      loading ? 
      <Container fluid className="main-content-container px-4 pb-4">
        <Loader />
      </Container>
      :
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header">
              <PageTitle sm="4" title="Freebie" subtitle="" className="text-sm-left" />
            </Row>
        <Row>
          <Col lg="12" md="12">
            {
            showVideo ?
            <ViewProduct contents={video} user={user} error={errorMessage} type="video" loading={loading}/>
            :
            showAudio ? 
            <ViewProduct contents={audio} user={user} error={errorMessage} type="audio" loading={loading}/>
            :
            showEbook ?
            <ViewProduct contents={ebook} user={user} error={errorMessage} type="ebook" loading={loading}/>
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

export default withRouter(Freebie);
