import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Card,
  CardBody,
  Row,
  Col,
  FormInput,
  InputGroup,
  InputGroupAddon,
  Button,
  ButtonGroup
} from "shards-react";
import Subscriptions from "./Subscriptions";
import Purchases from "./Purchases";
import Sessions from "./Sessions";
import AccountOverview from "./AccountOverview";
import HttpService from "../../utils/API";
import axios from "axios";

const _http = new HttpService();

class Wallet extends Component{
    constructor(props){
        super(props);
        this.state={
            requestPending: false,
            componentUnit: 'purchases',
            walletBalance: null,
            storePurchases: null
        
        }
    }

    componentDidMount(){
      const getWalletbalance = _http.sendGet("wallet/balance");
      const getStorePurchases = _http.sendGet("store/purchases");
      axios.all(getWalletbalance, getStorePurchases)
      .then(axios.spread((balance, purchases) => {
        this.setState({
          walletBalance : balance,
          storePurchases :purchases
        }) 
        
        //console.log(responses)
      })).catch(errors => {
        console.log(errors)
      })
      // _http.sendGet("wallet/balance")
      // .then(response => {
      //   console.log(response)
      // });
      // _http.sendGet("store/purchases")
      // .then(response => {
      //   console.log(response)
      // })
    }

    handleClick = (e) => {
        const id = e.target.id;
        this.setState({componentUnit: id});
    }

render(){
  console.log(this.state.walletBalance);
  console.log(this.state.storePurchases)
    const {componentUnit } = this.state;
    const { title, referralData } = this.props;
    const variation = "1";
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
  

    let unit = null;
    if(componentUnit === 'purchases'){
        unit = <Purchases/>;
    }else if(componentUnit === 'subscriptions'){
        unit = <Subscriptions/>;
    }else if(componentUnit === 'sessions'){
        unit = <Sessions/>;
    };

    return (
        <>
        <Row>
            <Col lg="12" md="12" sm="12" className="mb-4">
                <AccountOverview />
            </Col>
        </Row>

        <Row>
            {referralData.map((item, idx) => (
            <Col key={idx} sm="6" className="col-lg mb-4 link pointer dim">
            <Card small className={cardClasses}>
                <CardBody 
                className={cardBodyClasses}
                id="users">
                <div className={innerWrapperClasses}>
                    <div className={dataFieldClasses}>
                    <span className={labelClasses}>{item.title}</span>
                    <h6 className={valueClasses}>{item.value}<i className="material-icons green">{item.icon}</i> </h6>
                    </div>
                </div>
                </CardBody>
            </Card>
            </Col>
            ))}
         </Row>

        <Card small className="mb-4 p-2">
            <CardBody className="p-0">
                <Row className="d-flex px-3 py-1">
                    {/* Time Span */}
                    <Col>
                    <span className="text-semibold text-fiord-blue">Request withdrawal</span>
                    </Col>

                    {/* View Full Report */}
                    <Col md='4' className="text-right view-report">
                    {/* eslint-disable-next-line */}
                    <InputGroup className="mb-1">
                        <InputGroupAddon type="prepend bg-light" >
                            ₦
                        </InputGroupAddon>
                        <FormInput className="border-secondary" type="number" id="withdrawAmount" placeholder="0.00"/>
                        <InputGroupAddon type="append">
                            {this.state.requestPending ?
                            <Button className="btn btn-secondary btn-xs" disabled >requesting...</Button>
                            :
                            <Button className="btn btn-secondary btn-xs px-1" onClick={this.handleWithdrawal}>Request</Button>
                            }
                        </InputGroupAddon>
                    </InputGroup>
                    </Col>
                </Row>
            </CardBody>
        </Card>

        <Row >
            <Col className="mt-2 mb-1">
                <ButtonGroup>
                    <Button outline size="sm" theme="primary" id="purchases" className="mb-2 mr-1 p-2 btn" onClick={this.handleClick} clicked="true">
                        Purchases
                    </Button>
                    <Button outline size="sm" theme="secondary" id="subscriptions" className="mb-2 mr-1 p-2 btn" onClick={this.handleClick}>
                        Subscriptions
                    </Button>
                    <Button outline size="sm" theme="success" id="sessions" className="mb-2 mr-1 p-2 btn" onClick={this.handleClick}>
                        Sessions
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
        {unit}          
        
        </>
        );
    }
}

Wallet.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The referral data.
   */
  referralData: PropTypes.array
};

Wallet.defaultProps = {
  title: "",
  referralData: [
    {
      title: "Total Earnings",
      value: "₦19,291",
      icon: "trending_up"
    },
    {
      title: "Total Withdrawn",
      value: "₦11,291",
      icon: "trending_down"
    },
    {
      title: "Total Balance",
      value: "₦8,000",
      icon: "trending_flat"
    },
  ]
};

export default Wallet;
