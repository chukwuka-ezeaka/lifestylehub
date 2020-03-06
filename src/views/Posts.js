import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row,} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import CreatePost from '../components/Posts/CreatePost'
import HttpService from "../utils/API";

const _http = new HttpService();
const views = {
  showPosts: false,
  showCreatePost: false
}

class Posts extends React.Component {
   constructor(props){
        super(props);
        this.state={
            loading: true,
            showViews: views,
            path: '',
            errorMessage: '',
            posts: []
        }
    }
  
  componentWillMount() {
}

showContent = (handle) => {
  switch(handle){
    case '/posts/all':
      this.setState({showViews: {showPosts: true}})
      break;
    case '/posts/add':
      this.setState({showViews: {showCreatePost: true}})
      break;
    default:
      this.setState({showViews: {showPosts: true}})
      break;
  }
}

getPost = () => {
  const url = 'post';
  _http.sendGet(url)
  .then(response => {
      response.data ?
      this.setState({ posts: response.data})
      :
      _http.notify(response.message);
  })
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
};

  render(){
    const {loading, errorMessage, posts } = this.state;
    const { showPosts, showCreatePost } = this.state.showViews;
    //console.log(posts)
    
    return(
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Posts" subtitle="" className="text-sm-left" />
            </Row>
            {
            
            <CreatePost/>
              
            }
      </Container>
    );
    }
  }

export default withRouter(Posts);
