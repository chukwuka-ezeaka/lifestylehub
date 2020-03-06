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
    Row
} from "shards-react";

class Subscriptions extends Component{
    state ={
        checked: false,
        paymentType: false
    }

    toggle = () => {
        this.setState({checked: !this.state.checked})
    }

    paymentTypeToggle = () => {
        this.setState({paymentType: !this.state.paymentType})
    }

    handleSubscription = (event) => {
        event.preventDefault();
    }
    
    render(){
        let paymentFeild = null;
        let showButton = null;
        let paymentType = null;

        if(this.state.paymentType){
            paymentType = <>
            <Row>
                <Col md="6" className="pb-4">
                    <FormGroup className="mb-3">
                    <label htmlFor="price">Percentage % (Vendor)</label>
                    <FormInput id="percentage" type="number" classplaceholder="Title" onChange={this.handlePrice} required/>
                    </FormGroup>
                </Col>
            </Row>
            </>
        }
        
        if(this.state.checked){
            paymentFeild = <>
                <Row>
                <Col md="6" className="pb-4">
                    <FormGroup className="mb-0">
                    <label htmlFor="price">Price</label>
                    <FormInput id="price" type="number" classplaceholder="Title" onChange={this.handlePrice} required/>
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
            showButton = <Button className="btn-success" type="submit">save</Button>
        }

       

        return (
            <Row>
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
                        <fieldset>
                        <FormCheckbox toggle onChange={this.toggle} small checked={this.state.checked}>
                            Subscription based on Categories
                        </FormCheckbox>
                        </fieldset>
                        {paymentFeild}
                       
                        {showButton}
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            
            </Row>
        );
    }
}

export default Subscriptions;
