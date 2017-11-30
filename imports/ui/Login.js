import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        error:''
    };
  }

  onSubmit(e){
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    Accounts.loginWithPassword({email},password,(err)=>{
      if(err){
        this.setState({error:err.reason});
      }else{
        this.setState({error:''});
      }
    });
  }
  render(){
    return(
      <div>
        <form onSubmit={this.onSubmit.bind(this)}
              noValidate>

          <h2>Login</h2>

          {this.state.error?<p>{this.state.error}</p>:undefined}

          <input
            type="email"
            placeholder="Email Address"
            ref={(input)=> {this.email = input}}
          />
          <input
            type="password"
            placeholder="Password"
            ref={(input)=>{this.password = input}}
          />
          <button>Login</button>
          <Link to="/">Need an account?</Link>
        </form>
      </div>
    );
  };
};
