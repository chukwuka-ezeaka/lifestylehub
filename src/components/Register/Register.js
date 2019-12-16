import React from 'react';
import { withRouter } from "react-router-dom";
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'tachyons';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            role: "75",
            password: '',
        }
    }

    onFirstnameChange = (event) => {
        this.setState({firstname: event.target.value});
        console.log(this.state.firstname)
    }

    onLastnameChange = (event) => {
        this.setState({lastname: event.target.value});
        console.log(this.state.lastname)
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
        console.log(this.state.email)
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
         fetch('https://lshub.herokuapp.com/api/v1/auth/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                role: this.state.role,
                password: this.state.password
            }),
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(user => console.log(user) )
            /* {
            if(user.id){
                this.props.loadUser(user);
                this.props.history.push('/home');
            }
        }*/
        
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
                                 <label className="db fw6 lh-copy f6" htmlFor="firstname">First Name</label>
                                 <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="text" 
                                 name="firstname"  
                                 id="firstname"
                                 onChange={this.onFirstnameChange}
                                 />
                             </div>
                             <div className="mt3">
                                 <label className="db fw6 lh-copy f6" htmlFor="lastname">Last name</label>
                                 <input 
                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                 type="text" 
                                 name="lastname"  
                                 id="lastname"
                                 onChange={this.onLastnameChange}
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