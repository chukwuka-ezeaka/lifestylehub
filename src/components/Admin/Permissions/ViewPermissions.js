import React from 'react';
import Loader from '../../Loaders/Loader';
import {Card, CardHeader, CardBody, Button } from "shards-react"

class ViewPermissions extends React.Component{
    constructor(){
        super();
        this.state={
            permissions: [],
            isLoading: true
        }
    }


    componentDidMount = () => {
        fetch('https://lshub.herokuapp.com/api/v1/account/permission/list',{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + localStorage.getItem('Auth')
            },
            signal: this.abortController.signal
        })
        .then(response => response.json())
        .then(object => {
            this.setState({
                permissions: object.data,
                isLoading: false
            });
        })
        .catch(err => {
            if (err.name === 'AbortError') return; // expected, this is the abort, so just return
            throw err;
        });
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
                    {this.state.isLoading ?
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
                                        <Button size="sm" theme="warning" className="mb-2 mr-1" id={index}>
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
}

export default ViewPermissions;
