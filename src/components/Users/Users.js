import React from 'react';
import UsersModal from './UsersModal';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react"

class Users extends React.Component{
    constructor(){
        super();
        this.state={
            users: [],
            open: false,
            user: {}
        }
    }

    currentUser = (index) => {
        return this.users[index]
    }

   toggleModal = (event) => {
      
       if(event){
        let userId = event.target.id;
        this.setState({
           open: !this.state.open,
           user: this.state.users[userId]
        });
    }
       return this.state.open
       
    }

    componentDidMount = () => {
        //fetch('https://pacific-hollows-12017.herokuapp.com/users', {
        fetch('http://localhost:3000/users',{
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            if(data.length > 0){
                console.log(data);
               this.setState({users: data});
            }
        });
    }
        

render(){
    const {users, user, open} = this.state;
    let i = 1;
    return(

        <Container className="mt-4">
            <Row>
            <Col>
                <Card small className="mb-4 overflow-hidden">
                <CardHeader className="bg-light">
                    <h6 className="m-0 text-black">All Users</h6>
                </CardHeader>
                <CardBody className="bg-light p-0 pb-3">
                    <table className="table table-light mb-0">
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
                        <th scope="col" className="border-0">

                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index)  => {
                            //let userId = `#${user.id}`;
                            //console.log(index);
                            return(
                                <tr key={user.id}>
                                    <td>{i++}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phonenumber}</td>
                                    <td>{user.accounttype}</td>
                                    <td>
                                        <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.toggleModal} id={index}>
                                            View
                                        </Button>
                                    </td>
                                   
                                </tr> 
                                
                            )
                        })}
                    </tbody>
                    </table>
                </CardBody>
                </Card>
            </Col>
            </Row>
            <UsersModal user={user} toggle={this.toggleModal} open={open}/>
        </Container>
    );
}
}

export default Users;
