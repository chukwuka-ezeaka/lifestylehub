import React, { Component } from "react";
import { 
    FormCheckbox,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    FormInput,
    Button,
    Col,
    Row,
    FormSelect
} from "shards-react";
import Loader from "../../Loaders/Loader";
import HttpService from "../../../utils/API";
import LoaderSmall from "../../Loaders/LoaderSmall";

const _http = new HttpService();

class Subscriptions extends Component{
    state ={
        checked: true,
        paymentType: false,
        loading: false,
        subscription: {},
        by: '',
        interval:'',
        price: '',
        percentage: '',
        requestPending: false
    }

    toggle = () => {
        this.setState({checked: !this.state.checked})
    }

    paymentTypeToggle = () => {
        this.setState({paymentType: !this.state.paymentType})
    }

    // handleBy = (event) => {
    //     this.setState({by: event.target.value})
    // }

    // handleInterval = (event) => {
    //     this.setState({interval: event.target.value})
    // }

    // handlePrice = (event) => {
    //     this.setState({price: event.target.value})
    // }

    handlePercentage = (event) => {
        this.setState({percentage: event.target.value})
    }

    handleSubscription = (event) => {
        event.preventDefault();
        const by = document.getElementById('by').value;
        const interval = document.getElementById('interval').value;
        const price = document.getElementById('price').value;

        this.setState({ requestPending: true})
        const url ="settings/global/subscription"
        const payload = {
            "global_subscription_by" : by,
            "global_subscription_interval" : interval,
            "global_subscription_amount": parseInt(price)
        }

        _http.sendPut(url, payload)
        .then(response => {
          let type = "";
          if(response.status === "success"){            this.setState({ requestPending: false})
              type = "success";
              _http.notify("Subscription updated successfully", type);
              this.getSubscription();
             
          }else{
            this.setState({ requestPending: false})
              type = "warn";
              _http.notify(response.message, type)
          }
      
        });   
    }

    componentDidMount(){
        this.getSubscription();
    }
    
    render(){
        const {subscription, loading} = this.state;
        let paymentFeild = null;
        let showButton = null;
        let paymentType = null;

        if(this.state.paymentType){
            paymentType = <>
            <Row>
                <Col md="6" className="pb-4">
                    <FormGroup className="mb-3">
                    <label htmlFor="price">Percentage % (Vendor)</label>
                    <FormInput 
                    id="percentage" 
                    type="number" 
                    classplaceholder="Title" 
                    onChange={this.handlePercentage}
                    
                    required/>
                    </FormGroup>
                </Col>
            </Row>
            </>
        }
        
        if(this.state.checked){
            paymentFeild = <>
                <Row>
                <Col md="6" className="pb-4">
                <FormGroup >
                    <label >Subscription By</label>
                    <FormSelect id="by" required >
                    <option defaultValue={subscription.global_subscription_by}>{subscription.global_subscription_by}</option>
                    <option></option>
                    <option value='author'>Author</option>
                    <option value='category'>Category</option>
                    
                    </FormSelect>
                </FormGroup>
                </Col>
                <Col md="6" className="pb-4">
                <FormGroup>
                    <label>Interval</label>
                    <FormSelect id="interval" required>
                    <option defaultValue={subscription.global_subscription_interval}>{subscription.global_subscription_interval}</option>
                    <option></option>
                    <option value='monthly'>Monthly</option>
                    <option value='weekly'>Weekly</option>
                    <option value='daily'>Daily</option>
                    </FormSelect>
                </FormGroup>
                </Col>
                <Col md="6" className="pb-4">
                    <FormGroup className="mb-0">
                    <label htmlFor="price">Price</label>
                    <FormInput 
                    id="price" 
                    type="number" 
                    classplaceholder="Title" 
                    onChange={this.handlePrice} 
                    defaultValue={subscription.global_subscription_amount} 
                    required/>
                    </FormGroup>
                </Col>
                <Col md="6" className="pb-4">
                    <FormGroup className="mb-0">
                    <label htmlFor="price">Payment type</label>
                    <FormCheckbox toggle onChange={this.paymentTypeToggle} small checked={this.state.paymentType}>
                        Fixed / Percentage
                    </FormCheckbox>
                    </FormGroup>
                </Col>
                </Row>
                {paymentType}
            </>
            showButton = <Button className="btn-success" type="submit" disable={this.requestPending}>
                {this.state.requestPending ? <LoaderSmall/> : "save"}
                
            </Button>
        }

       

        return (
            <Row>
                {loading ?
                <Loader/>
            :
            <Col lg="8" className="pb-4">
                <Card small className="h-100">
                    {/* Card Header */}
                    <CardHeader className="border-bottom">
                    <h6 className="m-0">Subscriptions</h6>
                    </CardHeader>

                    <CardBody className="d-flex flex-column">
                        {/* <fieldset>
                        <FormCheckbox toggle small>
                            Subscription based on Authors
                        </FormCheckbox>
                        </fieldset> */}
                        <Form onSubmit={this.handleSubscription}>
                        {/* <fieldset>
                        <FormCheckbox toggle onChange={this.toggle} small checked={this.state.checked}>
                            Subscription based on Categories
                        </FormCheckbox>
                        </fieldset> */}
                        {paymentFeild}
                       
                        {showButton}
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            }
            </Row>
        );
    }

    getSubscription = () => {
        this.setState({loading: true});
        const contentUrl= 'settings/global/subscription';
          _http.sendGet(contentUrl)
          .then(response => {
            //   console.log(response2.data)
            if(response.status === 'success'){
                this.setState({subscription: response.data, loading: false})
              }else{
              this.setState({ loading: false})
              _http.notify(response.message);
              }

          });
    }
}

export default Subscriptions;
