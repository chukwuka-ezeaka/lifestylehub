import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import NewReflection from "../components/Admin/Refelections/NewReflection";
import AllReflections from "../components/Admin/Refelections/AllReflections";

//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'tachyons';

const views = {
  showReflections: false,
  showAddReflections: false
}

class Reflections extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          showViews: views,
          path: '',
          reflections: [],
          loading: true
         
        }
    }

      
      componentDidMount(){
        this.unlisten = this.props.history.listen((location, action) => {
          this.setState({path: location.pathname});
        });

        const handle = this.props.location.pathname;
        this.showContent(handle);

      // this.getReflections();
      }

      componentDidUpdate(prevProps, prevState){
        if(prevState.path !== this.state.path){
          this.setState({showViews: views});
          this.showContent(this.state.path);
         
        }
      }
      
      componentWillUnmount = () => {
        this.unlisten();
        this.abortController.abort();
      };
      
      abortController = new window.AbortController(); 

    render(){
      const { reflections, loading } = this.state;
      const { showAddReflections } = this.state.showViews;
        return(
            <Container fluid className="main-content-container px-4 pb-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Reflections" subtitle="" className="text-sm-left" />
            </Row>
          {showAddReflections ?
            <Row>
              {/* Editor */}
              <Col lg="9" md="12">
                <NewReflection />
              </Col>
        
              {/* Sidebar Widgets */}
              <Col lg="3" md="12">
              </Col>
            </Row>
            :
            <AllReflections reflections={reflections} getReflections={this.getReflections} loading={loading}/>
    }
          </Container>
        )
    }

    showContent = (handle) => {
      switch(handle){
        case '/reflections/add':
          this.setState({showViews: {showAddReflections: true}})
          break;
        default:
          this.setState({showViews: {showReflections: true}})
          
          break;
      }
    }

 

}

export default withRouter(Reflections);