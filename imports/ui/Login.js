import React from 'react';
import {Link} from 'react-router-dom';
import { Meteor } from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base';
import {withTracker} from 'meteor/react-meteor-data';
export class Login extends React.Component{
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
    this.props.loginWithPassword({email},password,(err)=>{
      if(err){
        this.setState({error:err.reason});
      }else{
        this.setState({error:''});
      }
    });
  }
  render(){
    return(
      <div className='box__wrapper'>
        <div className='box__component'>
          <form onSubmit={this.onSubmit.bind(this)}
                noValidate>
            <h2 className="box__title">Login</h2>
            {this.state.error?<p className="box__error">{this.state.error}</p>:undefined}
            <input
              type="email"
              placeholder="Email Address"
              ref={(input)=> {this.email = input}}
              className="box__input"
            />
            <input
              type="password"
              placeholder="Password"
              ref={(input)=>{this.password = input}}
              className="box__input"
            />
            <div className="u-center-text">
              <button className="btn">Login</button>

            </div>
            <div className="u-center-text">
              <Link className="btn btn--link" to="/signup">Need an account?</Link>

            </div>




          </form>
        </div>
      </div>
    );
  };
};

export default withTracker(()=>{
  return{
    loginWithPassword:Meteor.loginWithPassword
  }

})(Login);
