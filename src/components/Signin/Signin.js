import React from 'react';
import { withRouter } from 'react-router-dom';

class  Signin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signinEmail:'',
            signinPassword:'',
            errMessage: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signinEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signinPassword: event.target.value});
    }

    onSubmitSignIn = () => {
       // fetch('https://pacific-hollows-12017.herokuapp.com/signin',{
        fetch('https://lshub.herokuapp.com/api/v1/auth/login',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.signinPassword
            })
        })
        .then(response => response.json())
        //.then(user => console.log(user))
        .then(user => {
            console.log(user);
            if(user.data.id){
                switch(user.data.role.name){
                    case 'subscriber':
                            this.setState({errMessage: 'Please login on the mobile app'});
                    break;
                    default:
                        const userData = JSON.stringify(user.data);
                        localStorage.setItem('user', userData);
                        localStorage.setItem('Auth', user.token);
                        //this.props.loadUser(user.data);
                        this.props.history.push('/dashboard');
                    break;
                }
             
            }else{
                this.setState({errMessage: 'user not found'});
            }
          })
         
    }

    render(){
        const {errMessage} = this.state;
        return(
            
            <article className ="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center"  style={{backgroundColor: 'rgba(150, 150, 150, 1)'}}>
                <main className = "pa4 black-80">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw76 ph0 mh0">Sign In</legend>
                            <p className="db fw6 lh-copy f6 text-green" >{errMessage}</p>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email"  
                                    id="email-address" 
                                    onChange = {this.onEmailChange}
                                />
                            </div>     
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange = {this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input  onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign In"/>
                        </div>
                </main>
            </article>    
        );
    }   
}

export default withRouter(Signin);