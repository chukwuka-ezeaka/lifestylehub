import React from 'react';
import Loader from '../../Loaders/Loader';
import { confirmAlert } from 'react-confirm-alert';
import LoaderSmall from '../../Loaders/LoaderSmall';
import {Card, CardHeader, CardBody, Button, Collapse, ListGroupItem, ListGroup, ListGroupItemHeading } from "shards-react"
import HttpService from '../../../utils/API';

const _http = new HttpService();

class ViewRoles extends React.Component{
    constructor(){
        super();
        this.state={
            roles: [],
            isLoading: true,
            errorMessage: '',
            collapse: false,
            requestPending: false
        }
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
      }

    componentDidMount = () => {
        const url = "account/role/list";
        _http.sendGet(url)
        .then(response => {
            response.data ?
            this.setState({ errorMessage: '', roles: response.data, isLoading: false })
            :
            this.setState({ errorMessage: response.message, isLoading: false })
        })
    }

    componentWillUnmount = () => this.abortController.abort();

    abortController = new window.AbortController(); 
        

render(){
    const { roles } = this.state;
    let i = 1;
    return(

        
            <Card small className="mb-4 overflow-hidden">
                <CardHeader className="bg-light">
                    <h6 className="m-0 text-black">All Roles</h6>
                </CardHeader>
                <CardBody className="bg-light p-0 pb-3">
                    {this.state.isLoading ? 
                    <Loader/>
                :
                    <table className="table table-light mb-0">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col" className="border-0">
                            #
                        </th>
                        <th scope="col" className="border-0">
                            Role
                        </th>
                        <th scope="col" className="border-0">

                        </th>
                        <th scope="col" className="border-0">

                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {roles ? roles.map((role, index)  => {
                        console.log(role)
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            return(
                            <React.Fragment key={role.id}>
                                <tr className="pb-0">
                                    <td>{i++}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <Button size="sm" theme="info" className="mb-2 mr-1" id={index} onClick={this.toggle}>
                                            Expand
                                        </Button>
                                    </td>
                                    <td>
                                        <Button size="sm" theme="warning" className="mb-2 mr-1" onClick={this.handleDelete} id={role.id}>
                                            {this.state.requestPending ? <LoaderSmall /> : 'Delete'}
                                        </Button>
                                    </td>
                                   
                                </tr> 
                                <tr>
                                    <td></td>
                                    <td>
                                    <Collapse id="collapse" open={this.state.collapse}>
                                        <ListGroup>
                                            <ListGroupItemHeading className="f6 fw4">Permissions</ListGroupItemHeading>
                                        {role.permissions ? role.permissions.map((permission, index)  => {
                                          return( 
                                           <ListGroupItem key={index} className="f6">
                                                {permission.name}
                                            </ListGroupItem>
                                            )
                                        })
                                        : ''}
                                        </ListGroup>
                                    </Collapse>
                                    </td>
                                </tr>
                            </React.Fragment>
                            )
                        })
                    : ''}
                    </tbody>
                    </table>
                    }
                </CardBody>
            </Card>
            
    );
}

handleDelete = (event) => {
    const roleId = event.target.id;
   confirmAlert({
       title: 'Confirm Delete',
       message: 'Are you sure you want to delete this role?',
       buttons: [
         {
           label: 'Yes',
           onClick: () => this.deleteRole(roleId)
         },
         {
           label: 'No',
           
         }
       ]
     });
 }

 deleteRole = (id) => {
     const url = `account/role/${id}`;
     this.setState({requestPending: true});
   _http.sendDelete(url)
   .then(response => {
        this.setState({requestPending: false});
        let type = "";
        if(response.status === "success"){
            type = "success";
            _http.notify(response.message, type)
        }else{
            type = "warn";
            _http.notify(response.message, type)
        }
   })
 }
}

export default ViewRoles;
