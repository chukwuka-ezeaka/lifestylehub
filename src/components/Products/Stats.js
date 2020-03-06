import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from "classnames";
import {
    Row,
    Col,
    Card,
    CardBody
} from 'shards-react';
import LoaderSmall from '../Loaders/LoaderSmall';

class Stats extends Component {
    constructor(){
        super();
        this.state={
            // user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {},
            // contents: [],
            // contents: []
        }
    }

    changeRoute = (event) => {
        const target = event.target.id;
        switch(target){
            case 'products':
                this.props.history.push('/products/allProducts');
                break;
            case 'videos':
                this.props.history.push('/products/videos');
                break;
            case 'audios':
                this.props.history.push('/products/audios');
                break;
            case 'ebooks':
                this.props.history.push('/products/ebooks');
                break;
            case 'text':
                this.props.history.push('/products/text');
                break;
            default:
                this.props.history.push('#');
                break;
        }

    }

    componentDidMount(){
        // this.getContents()
    }

    render() { 
        const variation ="1";
        const cardClasses = classNames(
          "stats-small",
          variation && `stats-small--${variation}`
        );
    
        const cardBodyClasses = classNames(
          variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
        );
    
        const innerWrapperClasses = classNames(
          "d-flex",
          variation === "1" ? "flex-column m-auto" : "px-3"
        );
    
        const dataFieldClasses = classNames(
          "stats-small__data",
          variation === "1" && "text-center"
        );
    
        const labelClasses = classNames(
          "stats-small__label",
          "text-uppercase",
          variation !== "1" && "mb-1"
        );
    
        const valueClasses = classNames(
          "stats-small__value",
          "count",
          variation === "1" ? "my-3" : "m-0"
        );

        const {contents, loading } = this.props;
        let products = 0
        let video= [];
         let audio= [];
        let ebook = [];
        let text = [];
        
      // Array.isArray(contents) && (contents.length > 0) ? contentLength = contents.length : contentLength = 0;
        if(Array.isArray(contents) && (contents.length > 0)){
            products = contents.length;
          console.log(contents);
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
        return ( 
            <Row >
                 <Col className="col-lg col-md-2 col-sm-2 mb-4 link pointer dim">
          <Card className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="all"
            onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>All</span>
                  <h6 className={valueClasses}> {loading ? <LoaderSmall/> : products}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col className="col-lg col-md-2 col-sm-2 mb-4 link pointer dim">
          <Card className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="audios"
              onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>Audios</span>
                  <h6 className={valueClasses}> {loading ? <LoaderSmall/> : audio.length}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col className="col-lg col-md-2 col-sm-2 mb-4 link pointer dim">
          <Card className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="videos"
            onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>Videos</span>
                  <h6 className={valueClasses}> {loading ? <LoaderSmall/> : video.length}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col className="col-lg col-md-2 col-sm-2 mb-4 link pointer dim">
          <Card className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="ebooks"
            onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>Ebooks</span>
                  <h6 className={valueClasses}> {loading ? <LoaderSmall/> : ebook.length}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
       
        <Col className="col-lg col-md-2 col-sm-2 mb-4 link pointer dim">
          <Card className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="text"
              onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>Text</span>
                  <h6 className={valueClasses}> {loading ? <LoaderSmall/> : text.length}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
            </Row>
         );
    }

    // getContents = () => {
    //     const contentsUrl = `content/contents/list?owner_id=${this.state.user.id}`;
    //     const contentUrl= `content/list?owner_id=${this.state.user.id}`;
    //     axios.all([
    //       _http.sendGet(contentsUrl),
    //       _http.sendGet(contentUrl)
    //       ])
    //       .then(axios.spread((response1, response2)=> {
    //         //   console.log(response1.data)
    //         //   console.log(response2.data)
    //         this.setState({contents: response1.data, contents: response2.data})
    //       }))
    //   }
}
 
export default withRouter(Stats);