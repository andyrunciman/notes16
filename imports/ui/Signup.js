import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import {withTracker} from 'meteor/react-meteor-data';


export class Signup extends React.Component{
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
    this.props.createUser({email,password},(err)=>{
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
          <h2>Signup</h2>
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
          <button>Signup</button>
          <Link to="/">Already have an account?</Link>
        </form>
      </div>
    );
  };
};

export default withTracker(()=>{
  return{
    createUser:Accounts.createUser
  }
})(Signup)
