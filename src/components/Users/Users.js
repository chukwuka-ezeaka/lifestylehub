import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react"

class Users extends React.Component{
    constructor(){
        super();
        this.state={
            users: []
        }
    }

    componentDidMount = () => {
        fetch('https://pacific-hollows-12017.herokuapp.com/users', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            if(data.length > 0){
                console.log(data);
               this.setState({users: data})
            }
        });
    }
        

render(){
    const {users} = this.state;
    let i = 1;
    return(

        <Container className="mt-4">
            <Row>
            <Col>
                <Card small className="mb-4 overflow-hidden">
                <CardHeader className="bg-dark">
                    <h6 className="m-0 text-white">All Users</h6>
                </CardHeader>
                <CardBody className="bg-dark p-0 pb-3">
                    <table className="table table-dark mb-0">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col" className="border-0">
                            #
                        </th>
                        <th scope="col" className="border-0">
                            Full Name
                        </th>
                        <th scope="col" className="border-0">
                            Username
                        </th>
                        <th scope="col" className="border-0">
                            Email
                        </th>
                        <th scope="col" className="border-0">
                            Phone Number
                        </th>
                        <th scope="col" className="border-0">
                            Role
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)  => {
                            return(
                                <tr key={user.id}>
                                    <td>{i++}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phonenumber}</td>
                                    <td>{user.accounttype}</td>
                                </tr> 
                            )
                        })}
                    </tbody>
                    </table>
                </CardBody>
                </Card>
            </Col>
            </Row>
        </Container>
    );
}
}

export default Users;
