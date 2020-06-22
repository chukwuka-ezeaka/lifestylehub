import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  Button,
  FormSelect,
} from "shards-react";
import LoaderSmall from "../Loaders/LoaderSmall";

class UserAccountDetails extends Component{
 constructor(props){ 
   super(props)
   this.state= {
    edit: false,
   accountDetails : {
    "firstname": this.props.user.firstname,
    "lastname": this.props.user.lastname,
    "email": this.props.user.email,
    "username": this.props.user.username,
    "phone": this.props.user.phone,
    "photo":this.props.user.photo,
    "country_name":this.props.user.country_name,
    "birthday":this.props.user.birthday,
    "address":this.props.user.address,
    "about":this.props.user.about,
    "category_id": this.props.user.category ? this.props.user.category.id : '',
   }
  }
}

  handleFirstName = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.firstname = event.target.value;
    this.setState({accountDetails: newDetails});
    //console.log(this.state.firstname)
  }

  handleLastName = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.lastname = event.target.value;
    this.setState({accountDetails: newDetails});
    //console.log(this.state.lastname)
  }

  handleUsername = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.username = event.target.value;
    this.setState({accountDetails: newDetails});
  }

  handleEmail = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.email = event.target.value;
    this.setState({accountDetails: newDetails});
  }

  handlePhone = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.phone = event.target.value;
    this.setState({accountDetails: newDetails});
  }

  handleLocation = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.country_name = event.target.value;
    this.setState({accountDetails: newDetails});
  }

  handleAddress = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.address = event.target.value;
    this.setState({accountDetails: newDetails});
  }

  handleBirthday = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.birthday = event.target.value;
    this.setState({accountDetails: newDetails});
  }

  handleExperience = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.years_of_experience = event.target.value;
    this.setState({accountDetails: newDetails});
  }

  handleCategory = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.category_id = event.target.value;
    this.setState({accountDetails: newDetails});
  }

  handleHistory = (event) => {
    const newDetails = {
      ...this.state.accountDetails,
    }
    newDetails.about = event.target.value;
    this.setState({accountDetails: newDetails});
  }

  handleEdit = () => {
    this.setState({edit: !this.state.edit})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const payload = this.state.accountDetails;
    const id = this.props.user.id;
    this.props.updateProfile(payload, id);
  }
  render(){
    const { title, user, categories, getCategories, getCountries, countries, pending } = this.props;
    let birthday = '';
    if(user.birthday){
      const date = new Date(user.birthday);
      birthday = date.toLocaleDateString('en-US');
    }
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  <Row form>
                    {/* First Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="firstname">First Name</label>
                      <FormInput
                        id="fullname"
                        placeholder="First Name"
                        defaultValue={user ? user.firstname : ''}
                        onChange={this.handleFirstName}
                        disabled={!this.state.edit}
                      required />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="firstname">Last Name</label>
                      <FormInput
                        id="firstname"
                        placeholder="First Name"
                        defaultValue={user ? user.lastname : ''}
                        onChange={this.handleLastName}
                        disabled={!this.state.edit}
                      required />
                    </Col>
                    {/* Last Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="lastname">Username</label>
                      <FormInput
                        id="lastname"
                        placeholder="Last Name"
                        defaultValue={user ? user.username : ''}
                        onChange={this.handleUsername}
                        disabled={!this.state.edit}
                      required />
                    </Col>
                    {/* Email */}
                    <Col md="6" className="form-group">
                      <label htmlFor="email">Email</label>
                      <FormInput
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        defaultValue={user ? user.email : ''}
                        onChange={this.handleEmail}
                        disabled={!this.state.edit}
                      required />
                    </Col>
                    {/* Password */}
                    <Col md="6" className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <FormInput
                        type="number"
                        id="phone"
                        placeholder="Phone Number"
                        defaultValue={user ? user.phone : ''}
                        onChange={this.handlePhone}
                        disabled={!this.state.edit}
                      required />
                    </Col>
                  </Row>
                  
                    <FormGroup>
                    <label htmlFor="location">Location</label>
                    <FormSelect  id="location" onChange={this.handleLocation} onClick={() => getCountries()} disabled={!this.state.edit} required>
                        <option  value={user.country_name ? user.country_name : ''}>{user.country_name ? user.country_name : ''}</option>
                            {countries.map((country)  => {
                            return(
                                <option key={country.alpha2Code} defaultValue={country.name}>{country.name}</option>
                            )
                            })
                        }
                        </FormSelect>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="address">Address</label>
                    <FormInput
                      id="address"
                      placeholder="Address"
                      defaultValue={user ? user.address : ''}
                      onChange={this.handleAddress}
                      disabled={!this.state.edit}
                    required />
                  </FormGroup>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="birthday">Birthday</label>
                      <FormInput
                        type={!this.state.edit ? "text" : "date"}
                        id="birthday"
                        defaultValue={birthday}
                        onChange={this.handleBirthday}
                        disabled={!this.state.edit} />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="experience">Years of Experience</label>
                      <FormInput
                        type="number"
                        id="experience"
                        placeholder="number"
                        defaultValue={user ? user.years_of_experience : ''}
                        onChange={this.handleExperience}
                        disabled={!this.state.edit}
                      required />
                    </Col>
                    {/* Password */}
                    <Col md="6" className="form-group">
                      <label htmlFor="category">Category</label>
                      <FormSelect id="category" onChange={this.handleCategory} onClick={() => getCategories()} disabled={!this.state.edit} required>
                        <option defaultValue={user.category ? user.category.id : ''}>{user.category ? user.category.name : ''}</option>
                            {categories.map((category)  => {
                            return(
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                            })
                        }
                        </FormSelect>
                    </Col>
                  </Row>
                  
                  <Row form>
                    {/* Description */}
                    <Col md="12" className="form-group">
                      <label htmlFor="workHistory">About ( Work History )</label>
                      <FormTextarea 
                      onChange={this.handleHistory}
                      id="workHistory" rows="3" 
                      defaultValue= {user.about ? user.about : ''}
                      disabled={!this.state.edit}
                      />
                    </Col>
                  </Row>
                  {this.state.edit ?
                  <>
                   <Button theme="accent" className="m-1" type="submit">{pending ? <LoaderSmall/> : 'Save' }</Button>
                   <Button theme="secondary" className="m-1" onClick= {this.handleEdit} disabled={this.props.pending}>Cancel </Button>
                   </>
                   :
                   <Button theme="accent" className="m-1" onClick= {this.handleEdit} >Edit </Button>
                  }
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Profile Details"
};

export default UserAccountDetails;
