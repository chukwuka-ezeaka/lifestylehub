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
  FormSelect,
  FormTextarea
} from "shards-react";
import HttpService from "../../../utils/API";
import LoaderSmall from "../../Loaders/LoaderSmall";

const _http = new HttpService();

class Invite extends React.Component{
    constructor(){
        super();
        this.state ={
            user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {},
            title: '',
            type: 0,
            errorMessage: '',
            disable: false,
            requestPending: false
        }
    }
  



    render(){
        const { title } = this.props;
        const { user,requestPending} = this.state;
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
                  <FormGroup>
                        <label htmlFor="title">User Email</label>
                        <FormInput id="Title" type="text" placeholder="Start typing to get user suggestions..." onChange={this.handleTitle} required/>
                     </FormGroup>
                    <Row>
                        <Col md="6">
                        <FormGroup>
                            <label htmlFor={user.id}>Role</label>
                            <FormSelect id={user.id} onChange={this.handleType} required>
                            <option value={null}>Select...</option>
                            <option value=''>Vendor</option>
                            <option value=''>Coach</option>
                            </FormSelect>
                        </FormGroup>
                        </Col>
                        <Col md="6" className="pb-4">
                       
                        </Col>
                    </Row>     
                    <FormGroup>
                          <label htmlFor="description">Invitation message</label>
                          <FormTextarea rows="7" placeholder="message" onChange={this.handleDescription} required/>
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" theme="success" disabled={requestPending}>Send Invitation</Button>
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

Invite.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

Invite.defaultProps = {
  title: "New Invite"
};

export default Invite;