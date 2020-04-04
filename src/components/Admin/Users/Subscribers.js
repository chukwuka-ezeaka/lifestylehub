import React from 'react';
import UsersModal from './UsersModal';
import Loader from '../../Loaders/Loader';
import { 
    Container, 
    Row, 
    Col, 
    Card, 
    CardHeader, 
    CardBody, 
    FormInput,
    FormSelect,
  InputGroup,
  InputGroupAddon,
} from "shards-react"

class Subscribers extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open: false,
            user: {},
            role: {},
            searchQuery: null,
            filter: "all"
        }
    }

    currentUser = (index) => {
        return this.props.users[index]
    }

   toggleModal = (event) => {
      
       if(event){
        let userId = parseInt(event.target.id);
        const currentUser = this.props.users.filter(user => user.id === userId)
        this.setState({
           open: !this.state.open,
           user: currentUser[0]
        });
    }
       return this.state.open
       
    }

    searchFilter = (e) => {
        let filter = e.target.value;
        switch(filter){
            case "all":
                return this.setState({filter: filter});
            case "name":
                return this.setState({filter: filter});
            case "username":
                return this.setState({filter: filter});
            case "email":
                return this.setState({filter: filter});
            default:
             return this.state.filter;
        }
    }

    searchInput = (e) => {
        let value = e.target.value;
       this.setState({ searchQuery: value });
      } 

    getFilteredUserList() {
        return !this.state.searchQuery
          ? this.props.users
          : this.props.users.filter(user => {
              switch(this.state.filter){
                case "all":
                    return  user.firstname.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                            user.lastname.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                            //user.username.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(this.state.searchQuery.toLowerCase());
                case "name":
                    return  user.firstname.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                            user.lastname.toLowerCase().includes(this.state.searchQuery.toLowerCase());
                // case "username":
                //     return  user.username.toLowerCase().includes(this.state.searchQuery.toLowerCase());
                case "email":
                    return  user.email.toLowerCase().includes(this.state.searchQuery.toLowerCase());
                default:
                 return user.firstname.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                        user.lastname.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                        user.username.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
                        user.email.toLowerCase().includes(this.state.searchQuery.toLowerCase());
              }
             
          }
            );
      }     

render(){
    const {user, open} = this.state;
    const {loading, error, roleUpdate, profileUpdate, pending } = this.props;
    let users = this.getFilteredUserList();
    console.log(users)
    let i = 1;
    let modal = "";
    if(user){
        modal =  <UsersModal 
        user={user} 
        toggle={this.toggleModal} 
        updateRole={roleUpdate}
        updateProfile={profileUpdate}
        pending={pending} 
        open={open}/>
    }
    return(

        <Container  className="px-0 py-0" fluid>
            <Row>
            <Col>
                <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">All Subscribers</h6>
                    <InputGroup className="mb-3">
                        <InputGroupAddon type="prepend">
                        <FormSelect onChange={this.searchFilter}>
                        <option vlaue="all">All</option>
                        <option value="name">Name</option>
                        {/* <option value="username">Username</option> */}
                        <option value="email">Email</option>
                        </FormSelect> 
                        </InputGroupAddon>
                        <FormInput type="text" placeholder="search for subscribers..." onInput={this.searchInput}/>
                    </InputGroup>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                {loading ?
                <Loader />
                :
                users.length > 0 ?
                    <table className="table mb-0 table-responsive">
                    <thead className="bg-light">
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
                            category
                        </th>
                        <th scope="col" className="border-0">
                             -
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
                                    <td>{user.firstname ? user.firstname + " " + user.lastname : ''}</td>
                                    <td>{user.username ? user.username: ''}</td>
                                    <td>{user.email ? user.email : ''}</td>
                                    <td>{user.phone ? user.phone : ''}</td>
                                    <td>{user.category ? user.category.name : ''}</td>
                                    <td>
                                        <button theme="primary" className="btn btn-sm btn-info mb-2 mr-1" onClick={this.toggleModal} id={user.id}>
                                            View
                                        </button>
                                    </td>
                                   
                                </tr> 
                                
                            )
                        })
                    }
                    </tbody>
                    </table>
                :
                <p className="text-center brown" style={{color: 'brown'}}>{error}</p>
                }
                </CardBody>
                </Card>
            </Col>
            </Row>
           {modal}
        </Container>
      );
}
}

export default Subscribers;
