import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { Row, Col, Card, CardBody } from "shards-react";
import LoaderSmall from "../../Loaders/LoaderSmall";

class Stats extends Component {
  state = {};

  changeRoute = event => {
    const target = event.target.id;
   // console.log(event.target.id);
    switch (target) {
      case "users":
        this.props.history.push("/users/all");
        break;
      case "admins":
        this.props.history.push("/users/admins");
        break;
      case "coaches":
        this.props.history.push("/users/coaches");
        break;
      case "vendors":
        this.props.history.push("/users/vendors");
        break;
      case "subscribers":
        this.props.history.push("/users/subscribers");
        break;
      default:
        this.props.history.push("#");
        break;
    }
  };

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

    

    const { users, loading } = this.props;

    let admins = users.filter(user => {
      return user.UserRole.roleId === 75;
    });

    let vendors = users.filter(user => {
      return user.UserRole.roleId === 99;
    });

    let coaches = users.filter(user => {
      return user.UserRole.roleId === 100 || user.UserRole.roleId === 103;
    });

    let subscribers = users.filter(user => {
      return user.UserRole.roleId === 87;
    });


    return (
      <Row>
        <Col className="col-lg col-md-4 col-sm-12 mb-4 link pointer dim">
          <Card small className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="users"
            onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>Total Users</span>
                  <h6 className={valueClasses}> {loading? <LoaderSmall/> : users.length}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col className="col-lg col-md-4 col-sm-12 mb-4 link pointer dim">
          <Card small className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="admins"
              onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>Admins</span>
                  <h6 className={valueClasses}> {loading ? <LoaderSmall/> : admins.length}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col className="col-lg col-md-4 col-sm-12 mb-4 link pointer dim">
          <Card small className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="subscribers"
              onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>Subscribers</span>
                  <h6 className={valueClasses}> {loading ? <LoaderSmall/> : subscribers.length}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col className="col-lg col-md-4 col-sm-12 mb-4 link pointer dim">
          <Card small className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="coaches"
            onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>Coaches</span>
                  <h6 className={valueClasses}> {loading ? <LoaderSmall/> : coaches.length}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col className="col-lg col-md-4 col-sm-12 mb-4 link pointer dim">
          <Card small className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="vendors"
            onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>Vendors</span>
                  <h6 className={valueClasses}> {loading ? <LoaderSmall/> : vendors.length}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
       
        {/* <Col className="col-lg col-md-4 col-sm-12 mb-4 link pointer dim">
          <Card small className={cardClasses}>
            <CardBody 
            className={cardBodyClasses}
            id="subscribers"
              onClick={this.changeRoute}>
              <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                  <span className={labelClasses}>VendorCoaches</span>
                  <h6 className={valueClasses}> {loading ? <LoaderSmall/> : VendorCoaches.length}</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col> */}
        
      </Row>
    );
  }
}

export default withRouter(Stats);
