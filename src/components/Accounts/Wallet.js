import React, {Component} from "react";
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
//import AccountOverview from "./AccountOverview";
import HttpService from "../../utils/API";
import axios from "axios";
import LoaderSmall from "../Loaders/LoaderSmall";

const _http = new HttpService();

class Wallet extends Component{
    constructor(props){
        super(props);
        this.state={
            requestPending: false,
            componentUnit: 'purchases',
            wallet: null,
            storePurchases: null
        
        }
    }

    componentDidMount(){
      _http.sendGet("wallet/balance")
      .then(response => {
        if(response.data ){
          if(response.status === "success"){
              this.setState({
                wallet : response.data,
              })
          }else{
              _http.notify(response.message)
          }
      
      }else{
          _http.notify(response.message)
          this.setState({requestPending: false })
      }
        console.log(response)
      });

      
      _http.sendGet("store/purchases")
      .then(response => {
          if(response.status === "success"){
              this.setState({
                storePurchases: response.data
              })
          }else{
              _http.notify(response.message)
          }
      })
    }

    handleClick = (e) => {
        const id = e.target.id;
        this.setState({componentUnit: id});
    }

    handleRequest = () => {
      this.setState({requestPending: true});
      let amountFeild = document.getElementById('withdrawAmount');
      let amount = amountFeild.value
      let payload = {
        amount
      }
      const reflectionUrl = "settlement/payout/request";
      _http.sendPost(reflectionUrl, payload)
      .then(response => {
          this.setState({ requestPending: false });
            if(response.status === "success"){
                _http.notify(response.message, "success")
               amountFeild.value = "";
            }else{
                _http.notify(response.message)
            }
      });
    }

render(){
    const {componentUnit, wallet, storePurchases } = this.state;
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

     let walletData = [
          {
            title: "Total Earnings",
            value: wallet ? `₦${wallet.total_deposit.value}` : <LoaderSmall/>,
            icon: "trending_up",
            iconColor: "green"
          },
          {
            title: "Total Withdrawn",
            value: wallet ? `₦${wallet.total_withdraw.value}` : <LoaderSmall/>,
            icon: "trending_down",
            iconColor: "red"
          },
          {
            title: "Total Balance",
            value: wallet ? `₦${wallet.balance.value}` : <LoaderSmall/>,
            icon: "trending_flat",
            iconColor: "blue"
          },
        ]
  

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
        {/* <Row>
            <Col lg="12" md="12" sm="12" className="mb-4">
                <AccountOverview />
            </Col>
        </Row> */}

        <Row>
            {walletData.map((item, idx) => (
            <Col key={idx} sm="6" className="col-lg mb-4 link pointer dim">
            <Card small className={cardClasses}>
                <CardBody 
                className={cardBodyClasses}
                id="users">
                <div className={innerWrapperClasses}>
                    <div className={dataFieldClasses}>
                    <span className={labelClasses}>{item.title}</span>
                    <h6 className={valueClasses}>{item.value}<i className={`material-icons ${item.iconColor}`}>{item.icon}</i> </h6>
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
                        <InputGroupAddon type="prepend" className="bg-secondary">
                            ₦
                        </InputGroupAddon>
                        <FormInput className="border-secondary" type="number" id="withdrawAmount" placeholder="0.00"/>
                        <InputGroupAddon type="append">
                            {this.state.requestPending ?
                            <Button className="btn btn-secondary btn-xs" disabled >requesting...</Button>
                            :
                            <Button className="btn btn-secondary btn-xs px-1" onClick={this.handleRequest}>Request</Button>
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
                    <Button outline size="xs" theme="primary" id="purchases" className="mb-2 mr-1 p-2" onClick={this.handleClick} clicked="true">
                        Purchases
                    </Button>
                    <Button outline size="xs" theme="secondary" id="subscriptions" className="mb-2 mr-1 p-2" onClick={this.handleClick}>
                        Subscriptions
                    </Button>
                    <Button outline size="xs" theme="success" id="sessions" className="mb-2 mr-1 p-2" onClick={this.handleClick}>
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

// Wallet.propTypes = {
//   /**
//    * The component's title.
//    */
//   title: PropTypes.string,
//   /**
//    * The wallet data.
//    */
//   walletData: PropTypes.array
// };

// Wallet.defaultProps = {
//   title: "",
//   walletData: [
//     {
//       title: "Total Earnings",
//       value: "₦0",
//       icon: "trending_up"
//     },
//     {
//       title: "Total Withdrawn",
//       value: "₦0",
//       icon: "trending_down"
//     },
//     {
//       title: "Total Balance",
//       value: "₦0",
//       icon: "trending_flat"
//     },
//   ]
// };

export default Wallet;
