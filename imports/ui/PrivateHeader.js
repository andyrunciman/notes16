import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import {withTracker} from 'meteor/react-meteor-data';


export const PrivateHeader = (props) => {
  return(
    <div>
      <h1>{props.title}</h1>
      <button onClick={()=>{props.handleLogout()}}>Logout</button>
    </div>
  );
};

export default withTracker(()=>{
  return{
    handleLogout:Meteor.logout
  }
})(PrivateHeader);
