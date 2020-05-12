import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Stats from "../components/Admin/Dashboard/Stats";
import Earnings from "../components/Admin/Dashboard/Earnings";
import Notifications from "../components/Admin/Dashboard/Notifications";
import HttpService from "../utils/API";

const _http = new HttpService();

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: true,
      errorMessage: ""
    };
  }

  componentWillMount() {}

  componentDidMount() {
    const url = "account/user/list/with_roles";
    _http.sendGet(url).then(response => {
      response.data
        ? this.setState({
            errorMessage: "",
            users: response.data,
            loading: false
          })
        : this.setState({ errorMessage: response.message, loading: false });
    });
  }

  componentWillUnmount = () => {
    this.abortController.abort();
    //console.log("[Dashboard]:abortcontroller will unmount if not signed in");
  };

  abortController = new window.AbortController();

  render() {
   // console.log("[Dashboard]: Rendering");
    const { users, loading } = this.state;

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
        <Stats users={users} loading={loading} />

        <Row>
          {/* Users Overview */}
          <Col lg="8" md="8" sm="12" className="mb-4">
            <Notifications />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="4" sm="12" className="mb-4">
            <Earnings />
          </Col>
        </Row>
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

// Dashboard.defaultProps = {
//   smallStats: [
//     {
//       label: "Users",
//       value: "390",
//       percentage: "",
//       increase: true,
//       chartLabels: [null, null, null, null, null, null, null],
//       attrs: { md: "6", sm: "6" },
//       datasets: [
//         {
//           label: "Today",
//           fill: "start",
//           borderWidth: 1.5,
//           backgroundColor: "rgba(0, 184, 216, 0.1)",
//           borderColor: "rgb(0, 184, 216)",
//           data: [1, 2, 1, 3, 5, 4, 7]
//         }
//       ]
//     },
//     {
//       label: "Coaches",
//       value: "182",
//       percentage: "",
//       increase: true,
//       chartLabels: [null, null, null, null, null, null, null],
//       attrs: { md: "6", sm: "6" },
//       datasets: [
//         {
//           label: "Today",
//           fill: "start",
//           borderWidth: 1.5,
//           backgroundColor: "rgba(23,198,113,0.1)",
//           borderColor: "rgb(23,198,113)",
//           data: [1, 2, 3, 3, 3, 4, 4]
//         }
//       ]
//     },
//     {
//       label: "Subscribers",
//       value: "2,147",
//       percentage: "",
//       increase: false,
//       decrease: true,
//       chartLabels: [null, null, null, null, null, null, null],
//       attrs: { md: "4", sm: "6" },
//       datasets: [
//         {
//           label: "Today",
//           fill: "start",
//           borderWidth: 1.5,
//           backgroundColor: "rgba(255,180,0,0.1)",
//           borderColor: "rgb(255,180,0)",
//           data: [2, 3, 3, 3, 4, 3, 3]
//         }
//       ]
//     }
//   ]
// };

export default withRouter(Dashboard);
