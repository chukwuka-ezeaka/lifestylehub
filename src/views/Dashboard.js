import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Stats from "../components/Admin/Dashboard/Stats";
import UsersByDevice from "../components/Admin/Dashboard/UsersByRoles";
import Notifications from "../components/Admin/Dashboard/Notifications";

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
        users: [],
        loading: true,
    }
}

  componentWillMount() {
    if(!localStorage.getItem('Auth')){
      this.props.history.push('/signin');
    }
    
  }

  componentDidMount(){
    
    fetch('https://lshub.herokuapp.com/api/v1/account/user/list/with_roles',{
      method: 'get',
      headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + localStorage.getItem('Auth'),
      },
      signal: this.abortController.signal
    })
    .then(response => response.json())
    .then(object => {
        this.setState({
            users: object.data,
            loading: false
        })
    })
    .catch(err => {
        this.setState({
            loading: false
        });
        if (err.name === 'AbortError') return; // expected, this is the abort, so just return
        throw err;
    });
   
  }
  
  
  componentWillUnmount = () => {
    this.abortController.abort();
  };
  
  abortController = new window.AbortController(); 

render(){
  const { users, loading } = this.state;
    return(
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="General Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Stats users={users} loading={loading}/>
      
        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
          <Notifications />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
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

Dashboard.defaultProps = {
  smallStats: [
    {
      label: "Users",
      value: "390",
      percentage: "",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "Coaches",
      value: "182",
      percentage: "",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Subscribers",
      value: "2,147",
      percentage: "",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    }
  ]
};

export default withRouter(Dashboard);
