import React from "react";
import PropTypes from "prop-types";
//import AddCategory from './AddCategory';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button,
  Col,
  Row,
} from "shards-react";
//import HttpService from "../../utils/API";

//const _http = new HttpService();

class Settings extends React.Component{
    constructor(){
        super();
        this.state ={
            user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {},
            title: '',
            type: 0,
            types:[],
            category: 0,
            categories:[],
            errorMessage: '',
            fileError: '',
            disable: false,
            requestPending: false
        }
    }
  



    render(){
        const { title } = this.props;
        return (
            <Row>
            <Col lg="8" className="pb-4">
            <Card small className="h-100">
                {/* Card Header */}
                <CardHeader className="border-bottom">
                <h6 className="m-0">{title}</h6>
                </CardHeader>

                <CardBody className="d-flex flex-column">
                <Form onSubmit={this.handlePublish}>
                  <Row>
                    <Col>
                         <FormGroup>
                        <label htmlFor="title">Account Number</label>
                        <FormInput id="accNumber" type="number" placeholder="" onChange={this.handleTitle} required/>
                     </FormGroup>
                    </Col>
                    <Col>
                         <FormGroup>
                        <label htmlFor="title">Bank name</label>
                        <FormInput id="bankNamee" type="text" placeholder="" onChange={this.handleTitle} required/>
                     </FormGroup>
                    </Col>
                  </Row>
                 
                    <FormGroup>
                          <label htmlFor="description">Account Name</label>
                          <FormInput id="accName" type="text" placeholder="" onChange={this.handlename} required/>
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" theme="success" disabled={this.state.requestPending}>Save</Button>
                    </FormGroup>
                </Form>
                </CardBody>
            </Card>
             </Col>
             <Col lg="4">
                    {/* {<AddCategory/>} */}
             </Col>
           </Row> 
            );
        }

       
    }

Settings.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Settings.defaultProps = {
  title: "Account Settings"
};

export default Settings;