import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Container, Row} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Stats from '../components/Products/Stats';
import HttpService from "../utils/API";
import axios from 'axios';
import {AuthContext } from '../contexts/AuthContext'

const _http = new HttpService();

class Dashboard extends React.Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      media: [],
      contents: [],
      loading: true,
      errorMessage: ""
    };
  }

  componentDidMount() {
    const {user} = this.context;
    this.setState({loading: true})
    const mediaUrl = `content/media/list?owner_id=${user.id}`;
    const contentUrl= `content/list?owner_id=${user.id}`;
      axios.all([
        _http.sendGet(mediaUrl),
        _http.sendGet(contentUrl)
        ])
        .then(axios.spread((response1, response2)=> {
          this.setState({media: response1.data, contents: response2.data, loading: false})
        })
        )
  }

  componentWillUnmount = () => {
    this.abortController.abort();
   // console.log("[Dashboard]:abortcontroller will unmount if not signed in");
  };

  abortController = new window.AbortController();

  render() {
      
   // console.log("[Dashboard]: Rendering");
    const { media, contents, loading } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header">
          <PageTitle
            title="General Overview"
            subtitle="Dashboard"
            className="text-sm-left mb-3"
          />
        </Row>

        {/* Small Stats Blocks */}
        <Stats media={media} contents={contents} loading={loading} />

      </Container>
    );
  }
}

Dashboard.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};


export default withRouter(Dashboard);
