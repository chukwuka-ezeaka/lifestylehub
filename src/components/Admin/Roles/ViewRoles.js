import React from 'react';
import {Card, CardHeader, CardBody, Button } from "shards-react"

class ViewRoles extends React.Component{
    constructor(){
        super();
        this.state={
            roles: []
        }
    }


    componentDidMount = () => {
        fetch('https://lshub.herokuapp.com/api/v1/account/role/list',{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + localStorage.getItem('Auth')
            }
        })
        .then(response => response.json())
        .then(object => {
            this.setState({roles: object.data});
        })
        .catch(err => console.log(err));
    }
        

render(){
    const { roles } = this.state;
    let i = 1;
    return(

        
            <Card small className="mb-4 overflow-hidden">
                <CardHeader className="bg-light">
                    <h6 className="m-0 text-black">All Roles</h6>
                </CardHeader>
                <CardBody className="bg-light p-0 pb-3">
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
                           Id
                        </th>
                        <th scope="col" className="border-0">

                        </th>
                        <th scope="col" className="border-0">

                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {roles.map((role, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            return(
                                <tr key={role.id}>
                                    <td>{i++}</td>
                                    <td>{role.name}</td>
                                    <td>{role.id}</td>
                                  
                                    <td>
                                        <Button size="sm" theme="info" className="mb-2 mr-1" id={index}>
                                            Expand
                                        </Button>
                                    </td>
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
                </CardBody>
            </Card>
            
    );
}
}

export default ViewRoles;
