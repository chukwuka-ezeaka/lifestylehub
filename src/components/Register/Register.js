import React from 'react';
import { withRouter } from "react-router-dom";
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'tachyons';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            username: '',
            email: '',
            phone: '',
            password: '',
        }
    }

    onNameChange = (event) => {
        this.setState({fullName: event.target.value});
        console.log(this.state.fullName)
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
        console.log(this.state.username)
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
        console.log(this.state.email)
    }

    onPhoneChange = (event) => {
        this.setState({phone: event.target.value});
        console.log(this.state.phone)
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
        console.log(this.state.password)
    }

    onConfirmPasswordChange = (event) => {
        //this.setState({email: event.target.value});
        console.log(event.target.value)
    }

    onSubmitRegister = () => {
        //fetch('https://pacific-hollows-12017.herokuapp.com/register', {
         fetch('http://localhost:3000/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fullname: this.state.fullName,
                username: this.state.username,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.history.push('/home');
            }
        })
        
    }

    render(){
        return (
            <div>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{backgroundColor: 'rgba(150, 150, 150, 1)'}}>
                 <main className="pa4 black-80">
                         <div className="measure">
                             <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                             <legend className="f4 fw6 ph0 mh0">Register</legend>
                             <div className="mt3">
                                 <label className="db fw6 lh-copy f6" htmlFor="name">Full Name</label>
                                 <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="text" 
                                 name="name"  
                                 id="name"
                                 onChange={this.onNameChange}
                                 />
                             </div>
                             <div className="mt3">
                                 <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
                                 <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="text" 
                                 name="username"  
                                 id="username"
                                 onChange={this.onUsernameChange}
                                 />
                             </div>
                             <div className="mt3">
                                 <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                 <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="email" 
                                 name="email-address"  
                                 id="email-address"
                                 onChange={this.onEmailChange}
                                 />
                             </div>
                             <div className="mt3">
                                 <label className="db fw6 lh-copy f6" htmlFor="name">Phone Number</label>
                                 <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="text" 
                                 name="phone"  
                                 id="phone"
                                 onChange={this.onPhoneChange}
                                 />
                             </div>
                             <div className="mv3">
                                 <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                 <input 
                                 className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="password" 
                                 name="password1"  
                                 id="password1"
                                 onChange={this.onPasswordChange}
                                 />
                             </div>
                             <div className="mv3">
                                 <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                                 <input 
                                 className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="password" 
                                 name="password2"  
                                 id="password2"
                                 onChange={this.onConfirmPasswordChange}
                                 />
                             </div>
                             </fieldset>
                             <div className="">
                             <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                             </div>
                         </div>
                     </main>
                  </article>
     
            </div>
         );
    }
    
}

export default withRouter(Register);