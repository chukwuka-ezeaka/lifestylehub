import React, { Component } from 'react';
import Loader from '../../Loaders/Loader';
import LoaderSmall from '../../Loaders/LoaderSmall';
import {
    Card,
    CardHeader,
    ListGroup,
    FormInput,
    Collapse,
    Button,
    FormCheckbox
  } from "shards-react";
import HttpService from '../../../API';

  const _http = new HttpService();
  const addPermissions = [];

  const initialState = {
    collapse: false,
    permissions: [],
    role: '',
    permissionsArray: [],
    isLoading: true,
    requestPending: false,
    errMessage: '',
    type: ''
  }

class CreateRole extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = initialState;
      }

      toggle() {
        this.setState({ collapse: !this.state.collapse });
        this.getPermissions();
      }

      getPermissions = () => {
        const url = "account/permission/list";
        _http.sendGet(url)
        .then(response => {
            response.data ?
            this.setState({ errMessage: '', permissions: response.data, isLoading: false })
            :
            this.setState({ errMessage: response.message, isLoading: false })
        })
      }

      handleCheckBox = (event) => {
          const val = event.target.value;
          const intValue = parseInt(val);
        if(event.target.checked === true){
            addPermissions.push(intValue);
            this.setState({permissionsArray: addPermissions})
        }else{ 
            addPermissions.splice( addPermissions.indexOf(intValue), 1 );
            this.setState({permissionsArray: addPermissions})
        }
      }

      handleRole = (event) => {
          const val = event.target.value;
        this.setState({role: val})
      }

      onSubmit= () => {
        const { role, permissionsArray } = this.state;
        const roleData = (role.trim()).replace(' ', '_');
        //console.log(roleData);
        //console.log(permissionsArray);

       this.onSubmitRequest(roleData, permissionsArray);
      }

      onSubmitRequest = (role, permissions) => {
          this.setState({requestPending: true});
          const url = "account/role/create";
          const postData = {
            name: role,
            permissions: permissions
          }
          _http.sendPost(url, postData)
          .then(response => {
              if(response.data ){
                  this.setState({requestPending: false});
                  let type = "";
                  if(response.status === "success"){
                      type = "success";
                      _http.notify(response.message, type)
                  }else{
                      type = "warn";
                      _http.notify(response.message, type)
                  }
              
              }else{
                  _http.notify(response.message)
                  this.setState({requestPending: false })
              }
          })
      }

      componentWillUnmount(){
        this.setState(initialState);
      }

    render() { 
        const { permissions } = this.state;
        return ( 
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                <h6 className="m-0">Create Role</h6>
                </CardHeader>
                <ListGroup flush className="p-4">
                {this.state.requestPending === true ?
                    <LoaderSmall/>
                 :
                     ""}
                    <label htmlFor="role">Role Name</label>
                    <FormInput
                        type="text"
                        id="role"
                        placeholder="role.."
                        onChange={this.handleRole}
                    />
                </ListGroup>
                <ListGroup className="pb-4 pr-4 pl-4 pt-0">
                     <div>
                        <Button theme="secondary" onClick={this.toggle}>Select permissions</Button>
                        <Collapse id="collapse" open={this.state.collapse}>
                        <div className="p-3 mt-3 border rounded">
                            <strong className="text-muted d-block mb-2">Permissions</strong>
                            <fieldset>
                                {this.state.isLoading ?
                                <Loader />
                            :
                                <table className="table table-light mb-0">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col" className="border-0">
                                                Name
                                            </th>
                                            <th scope="col" className="border-0">
                                                Id
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                {permissions.map((permission, index) => {
                                    return(
                                        <tr key={permission.id} >
                                        <td>
                                            <FormCheckbox onChange ={this.handleCheckBox} id={permission.id} value={permission.id}>{permission.name}</FormCheckbox>
                                        </td>
                                        <td>{permission.id}</td>
                                        </tr>
                                        
                                    );
                                })}
                                    </tbody>
                                </table>
                            }
                            </fieldset>
                        </div>
                        <Button theme="info" onClick={this.onSubmit}>Submit</Button>
                        </Collapse>
                    </div>
                </ListGroup>
          </Card>

         
         );
    }
}
 
export default CreateRole;