import React, { Component } from 'react';

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
           permission: ''
         };
      }

      handlePermission = (event) => {
        const val = event.target.value;
        const data = (val.trim()).replace(' ', '_');
        this.setState({permission: data})
      }


      onSubmitRequest = () => {
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
        .then(user => console.log(user) )
      }

    render() { 
        return ( 
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                <h6 className="m-0">Create Permission</h6>
                </CardHeader>
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