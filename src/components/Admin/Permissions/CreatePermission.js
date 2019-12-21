import React, { Component } from 'react';
import LoaderSmall from '../../Loaders/LoaderSmall';
import { toast } from 'react-toastify';
import {
    Card,
    CardHeader,
    ListGroup,
    FormInput,
    Button,
    InputGroup,
    InputGroupAddon
  } from "shards-react";


class CreatePermission extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           permission: '',
           errMessage: '',
           requestPending: false
         };
      }

      notify = (message) => {
        switch(this.state.type){
          case "success":
                  toast.success(message);
              break;
          case "warn":
              toast.warn("Error: " + message);
              break;
          default:
              break;
        }
      }

      handlePermission = (event) => {
        const val = event.target.value;
        const data = (val.trim()).replace(' ', '_');
        this.setState({permission: data})
      }


      onSubmitRequest = () => {
          this.setState({requestPending: true});
        fetch('https://lshub.herokuapp.com/api/v1/account/role/create',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + localStorage.getItem('Auth')
            },
            body: JSON.stringify({
                name: this.state.permission
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({requestPending: false});
            switch(data.status){
                case "success":
                    this.setState({type: "success"});
                    this.notify(data.message); 
                break;
                case "fail":
                    this.setState({type: "warn"});
                    this.notify(data.message); 
                break;
                default:
                        this.setState({type: "warn"});
                    this.notify(data.message);
                break;
            }
        ;})
        .catch(err => {
            this.setState({errMessage: 'Error' + err});
        })
      }

    render() { 
        return ( 
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                <h6 className="m-0">Create Permission</h6>
                </CardHeader>
                {this.state.requestPending === true ?
                    <LoaderSmall/>
                 :
                     ""}
                <ListGroup flush className="p-4">
                    <label htmlFor="role">Permission Name</label>
                    <InputGroup seamless className="mb-3">
                        <FormInput  onChange={this.handlePermission} placeholder="permission name" />
                        <InputGroupAddon type="append">
                            <Button onClick={this.onSubmitRequest} theme="success">Add</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </ListGroup>
          </Card>

         
         );
    }
}
 
export default CreatePermission;