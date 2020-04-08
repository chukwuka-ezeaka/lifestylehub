import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ChatApp from "../containers/Application/Chat/Chat";

const views = {
  showChatApp: false,
};

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showViews: views,
      path: "",
      errorMessage: "",
    };
  }

  componentWillMount() {}

  showContent = (handle) => {
    switch (handle) {
      case "/chats/allChats":
        this.setState({ showViews: { showChatApp: true } });
        break;
      default:
        this.setState({ showViews: { showChatApp: true } });
        break;
    }
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ path: location.pathname });
    });
    const handle = this.props.location.pathname;
    this.showContent(handle);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.path !== this.state.path) {
      this.setState({ showViews: views });
      this.showContent(this.state.path);
    }
  }

  componentWillUnmount = () => {
    this.unlisten();
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Chat" subtitle="" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="12" md="12">
            <ChatApp />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Chat);
