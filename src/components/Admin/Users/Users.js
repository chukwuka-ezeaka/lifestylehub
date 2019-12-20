import React from 'react';
import UsersModal from './UsersModal';
import Loader from '../../Loaders/Loader';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react"

class Users extends React.Component{
    constructor(){
        super();
        this.state={
            users: [],
            roles: [],
            open: false,
            user: {},
            role: {},
            loading: true
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
           user: this.state.users[userId],
           role: this.state.roles[userId]
        });
    }
       return this.state.open
       
    }

    componentDidMount = () => {
        fetch('https://lshub.herokuapp.com/api/v1/account/user/list/with_roles',{
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + localStorage.getItem('Auth'),
            },
            signal: this.abortController.signal
        })
        .then(response => response.json())
        .then(object => {
            this.setState({
                users: object.data,
                roles: object.roles,
                loading: false
             })
        })
        .catch(err => {
            if (err.name === 'AbortError') return; // expected, this is the abort, so just return
            throw err;
        });
    }

    componentWillUnmount = () => this.abortController.abort();

    abortController = new window.AbortController(); 
        

render(){
    const {users, user, roles, role, open} = this.state;
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
                                    <td>{user.fullname ? user.fullname : ''}</td>
                                    <td>{user.phonenumber ? user.phonenumber : ''}</td>
                                    <td>{user.email ? user.email : ''}</td>
                                    <td>{user.phonenumber ? user.phonenumber : ''}</td>
                                    <td>{roles[index] ? roles[index].name : ''}</td>
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
                }
                </CardBody>
                </Card>
            </Col>
            </Row>
            <UsersModal user={user} role={role} toggle={this.toggleModal} open={open}/>
        </Container>
    );
}
}

export default Users;
