import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'shards-react';

class Stats extends Component {
    state = {  }

    changeRoute = (event) => {
        const target = event.target.id;
        switch(target){
            case 'users':
                this.props.history.push('/users/all');
                break;
            case 'coaches':
                this.props.history.push('/users/coaches');
                break;
            case 'vendors':
                this.props.history.push('/users/vendors');
                break;
            case 'subscribers':
                this.props.history.push('/users/subscribers');
                break;
            default:
                this.props.history.push('#');
                break;
        }

    }

    render() { 
        const { users } = this.props;

          let vendors = users.filter(user => {
            return user.UserRole.roleId === 99;
          });

          let coaches = users.filter(user => {
            return user.UserRole.roleId === 100;
          });
          
          let subscribers = users.filter(user => {
            return user.UserRole.roleId === 87;
          });

        return ( 
            <Row className="mb-4">
                <Col lg="3" md="3" sm="12">
                    <Card>
                        <CardBody className="text-center text white link dim pointer f4 fw6 bg-success" id="users" onClick={this.changeRoute}>
                            <h5 className="text white">Users</h5>
                            {users.length}
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3" md="3" sm="12">
                    <Card>
                        <CardBody className="text-center text white f4 fw6 bg-warning link dim pointer" id="coaches" onClick={this.changeRoute}>
                            <h5 className="text white">Coaches</h5>
                            {coaches.length}
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3" md="3" sm="12">
                    <Card>
                        <CardBody className="text-center text white f4 fw6 bg-dark link bg-animate dim pointer" id="vendors" onClick={this.changeRoute}>
                            <h5 className="text white">Vendors</h5>
                            {vendors.length}
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="3" md="3" sm="12">
                    <Card>
                        <CardBody className="text-center text white f4 fw6 bg-info link dim pointer" id="subscribers" onClick={this.changeRoute}>
                            <h5 className="text white">Subscribers</h5>
                            {subscribers.length}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
         );
    }
}
 
export default withRouter(Stats);