import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "querystring";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormTextarea,
  FormGroup,
  Button,
  FormInput
} from "shards-react";
import HttpService from "../../../utils/API";
import UpdateReflection from "./UpdateReflection";
import GetAudio from "../../common/GetAudio";
import GetImage from "../../common/getImage";
import Loader from "../../Loaders/Loader";

const _http = new HttpService();

class ViewReflection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      reflection: {},
      audio: "",
      audio_type: "",
      image: "",
      image_type: "",
      requestPending: false,
      edit: false,
      loading: true
    };
  }

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.setState({ id: params.id });
    this.getReflection(params.id);
  }
  render() {
    const { reflection, loading, requestPending } = this.state;
    // console.log(audio);
    return (
      <Container className="mt-4">
        <Row>
          <Col>
            <Card small className="mb-4 overflow-hidden">
              <CardHeader className="bg-light">
                <h6 className="m-0 text-black">{reflection.title}</h6>
              </CardHeader>
              <CardBody className="bg-light p-0 pb-3 pl-4 pr-4">
                <Row>
                  <Col lg="4" md="12" sm="12" className="mb-3">
                    <Row>
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          <Col lg="12" md="12" sm="12" className="pb-3">
                            {reflection.image_link ? (
                              <GetImage
                                image={reflection.image_link}
                                width="300px"
                              />
                            ) : null}
                          </Col>
                          <Col lg="8" md="12" sm="12">
                            {/* <ReactAudioPlayer
                                    src={audio ? `data:audio/mp3;base64,${audio}`:''}
                                    //src={require('./test3.mp3')}
                                    autoPlay
                                    controls
                                    /> */}
                            {reflection.audio_link ? (
                              <GetAudio audio={reflection.audio_link} />
                            ) : null}
                          </Col>
                        </>
                      )}
                    </Row>
                  </Col>
                  <Col lg="7" md="12" sm="12">
                    {this.state.edit ? (
                      <>
                        <UpdateReflection
                          reflection={reflection}
                          edit={this.handleEdit}
                        />
                        <Button
                          theme="warning"
                          type="submit"
                          className="mt-2"
                          onClick={this.handleEdit}
                          disabled={requestPending}
                        >
                          cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <FormGroup className="mb-3">
                          <label>Content</label>
                          <FormTextarea
                            rows="15"
                            placeholder="Content"
                            defaultValue={reflection.content}
                            disabled={true}
                          />
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <label>Author</label>
                          <FormInput
                            placeholder="Content"
                            defaultValue={reflection ? reflection.author : ""}
                            disabled={true}
                          />
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <label>To be published on</label>
                          <FormInput
                            placeholder="Content"
                            defaultValue={reflection.date}
                            disabled={true}
                          />
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <Button
                            theme="accent"
                            type="submit"
                            onClick={this.handleEdit}
                            disabled={requestPending}
                          >
                            edit
                          </Button>
                        </FormGroup>
                      </>
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  handleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleUpdate = () => {
    // this.setState({requestPending: true});
    // const reflectionUrl = `reflection/${this.state.id}`;
    // _http.sendPut(reflectionUrl, payload)
    // .then(response => {
    //     this.setState({ requestPending: false });
    //     if(response.data ){
    //         this.setState({requestPending: true});
    //         let type = "";
    //         if(response.status === "success"){
    //             type = "success";
    //             _http.notify(response.message, type)
    //         }else{
    //             type = "warn";
    //             _http.notify(response.message, type)
    //         }
    //     }else{
    //         _http.notify(response.message)
    //         this.setState({requestPending: false })
    //     }
    // });
  };

  getReflection = id => {
    const url = `reflection/${id}`;
    _http
      .sendGet(url)

      .then(res => {
        // console.log(res)
        //this.getAudio(res.data.audio_link);
        //this.getImage(res.data.image_link);
        this.setState({
          reflection: res.data,
          loading: false
        });
      });
  };
}

export default withRouter(ViewReflection);
