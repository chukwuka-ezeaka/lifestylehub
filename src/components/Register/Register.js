import React from 'react';
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'tachyons';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
        }
    }

    onFirstNameChange = (event) => {
        this.setState({firstName: event.target.value});
        console.log(this.state.firstName)
    }

    onLastNameChange = (event) => {
        this.setState({lastName: event.target.value});
        console.log(this.state.lastName)
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
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home')
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
                                 <label className="db fw6 lh-copy f6" htmlFor="name">First Name</label>
                                 <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="text" 
                                 name="fname"  
                                 id="fname"
                                 onChange={this.onFirstNameChange}
                                 />
                             </div>
                             <div className="mt3">
                                 <label className="db fw6 lh-copy f6" htmlFor="name">Last Name</label>
                                 <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="text" 
                                 name="lname"  
                                 id="lname"
                                 onChange={this.onLastNameChange}
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

export default Register;