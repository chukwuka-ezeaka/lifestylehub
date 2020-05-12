import React from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row,} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import CreatePost from '../components/Posts/CreatePost'
import HttpService from "../utils/API";
import ViewPosts from "../components/Posts/ViewPosts";
import Loader from "../components/Loaders/Loader";

const _http = new HttpService();
const views = {
  showPosts: false,
  showCreatePost: false
}

class Posts extends React.Component {
   constructor(props){
        super(props);
        this.state={
          user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {},
            loading: true,
            showViews: views,
            path: '',
            errorMessage: '',
            posts: [],
            requestPending: false
        }
    }
  
  componentWillMount() {
}

showContent = (handle) => {
  switch(handle){
    case '/posts/all':
      this.setState({showViews: {showPosts: true}})
      break;
    case '/posts/new':
      this.setState({showViews: {showCreatePost: true}})
      break;
    default:
      this.setState({showViews: {showPosts: true}})
      break;
  }
}

componentDidMount(){
  this.unlisten = this.props.history.listen((location, action) => {
    this.setState({path: location.pathname});
  });
  const handle = this.props.location.pathname;
  this.showContent(handle);
  this.getPosts();
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
    const {loading, posts } = this.state;
    const { showPosts, showCreatePost } = this.state.showViews;
    //console.log(posts)
    const show = <>
                {showPosts ?
                        <ViewPosts posts={posts} loading={loading}/>
                        :
                        showCreatePost ?
                        <CreatePost publish={this.publishPost} pending={this.state.requestPending}/>
                        :
                        null}
                </>
    return(
      <Container fluid className="main-content-container px-4 pb-4">
         <Row noGutters className="page-header">
              <PageTitle sm="4" title="Posts" subtitle="" className="text-sm-left" />
            </Row>
            {
              loading ?
              <Loader/>
              :
              show
            }
      </Container>
    );
    }

    getPosts = () => {
      //  console.log(this.state.user.id);
      let url = "";
        this.setState({loading: true})
        if(this.state.user.role.id === 75){
          url= `post/list`;
        }else{
        url= `post/list`;
        }
          _http.sendGet(url)
          .then(response => {
            console.log(response)
            //   console.log(response1.data)
            //   console.log(response2.data)
            this.setState({posts: response.data, loading: false})
          })
      }

      publishPost = (payload) => {
        this.setState({requestPending: true});
        const url = 'post/create';
        _http.sendPost(url, payload)
        .then(response => {
            this.setState({ requestPending: false });
            if(response.data ){
                let type = "";
                if(response.status === "success"){
                    type = "success";
                    _http.notify(response.message, type)
                    this.getPosts();
                }else{
                    type = "warn";
                    _http.notify(response.message, type)
                }
            
            }else{
                _http.notify(response.message)
                this.setState({requestPending: false })
            }
        });
        }
  }

export default withRouter(Posts);
