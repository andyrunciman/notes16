import {withTracker} from 'meteor/react-meteor-data';
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';

export const UnauthenticatedRoute = ({component:Component,userId,...rest}) => {
    return (<Route {...rest} render={props => (
      userId
      ?(<Redirect to={{
          pathname: '/dashboard',
          state:{from:props.location}}}/>)
      :(<Component {...props}/>)
    )}/>);
    }
export default withTracker(()=>{
  //tracks this so that it can redirect on a change
  const userId = Meteor.userId();
  return{
    userId
  }
})(UnauthenticatedRoute);
