import React from 'react';
import Loader from '../../Loaders/Loader';
import {Card, CardHeader, CardBody, Button } from "shards-react"
import HttpService from '../../../utils/API';

const _http = new HttpService();

class ViewPermissions extends React.Component{
    constructor(){
        super();
        this.state={
            permissions: [],
            loading: true,
            errorMessage: ''
        }
    }


    componentDidMount = () => {
        this.getPermissions();
    }
        
    componentWillUnmount = () => this.abortController.abort();

    abortController = new window.AbortController(); 

render(){
    const { permissions } = this.state;
    let i = 1;
    return(
            <Card small className="mb-4 overflow-hidden">
                <CardHeader className="bg-light">
                    <h6 className="m-0 text-black">All permissions</h6>
                </CardHeader>
                <CardBody className="bg-light p-0 pb-3">
                    {this.state.loading ?
                    <Loader />
                : 
                    <table className="table table-light mb-0">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col" className="border-0">
                            #
                        </th>
                        <th scope="col" className="border-0">
                            permission
                        </th>
                        <th scope="col" className="border-0">
                           Id
                        </th>
                        <th scope="col" className="border-0">

                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {permissions.map((permission, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            return(
                                <tr key={permission.id}>
                                    <td>{i++}</td>
                                    <td>{permission.name}</td>
                                    <td>{permission.id}</td>
                                    <td>
                                        <Button size="sm" theme="warning" className="mb-2 mr-1" id={permission.id}>
                                            Delete
                                        </Button>
                                    </td>
                                   
                                </tr> 
                                
                            )
                        })}
                    </tbody>
                    </table>
                }
                </CardBody>
            </Card>
            
    );
}

getPermissions = () => {
    const url = "account/permission/list";
    _http.sendGet(url)
    .then(response => {
        response.data ?
        this.setState({ errorMessage: '', permissions: response.data, loading: false })
        :
        this.setState({ errorMessage: response.message, loading: false })
    })
}
}

export default ViewPermissions;
