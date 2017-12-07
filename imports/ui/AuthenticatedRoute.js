import {withTracker} from 'meteor/react-meteor-data';
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';

export const AuthenticatedRoute = ({component:Component,userId,...rest}) => {
    return (<Route {...rest} render={props => (
      userId?(<Component {...props}/>):(
        <Redirect to={{
          pathname:'/',
          state:{from:props.location}
        }}/>
      ))}/>);
    }

export default withTracker(()=>{
  //tracks this so that it can redirect on a change
  const userId = Meteor.userId();
  return{
    userId
  }
})(AuthenticatedRoute);
