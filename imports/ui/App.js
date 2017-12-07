import React from 'react';

import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import NotFound from './NotFound';


import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';

export default class App extends React.Component{
  render(){
    return(
        <Router>
          <Switch>
            <UnauthenticatedRoute exact path="/" component={Login}/>
            <UnauthenticatedRoute exact path="/signup" component={Signup}/>
            <AuthenticatedRoute exact path="/dashboard" component={Dashboard}/>
            <AuthenticatedRoute exact path="/dashboard/:id" component={Dashboard}/>
            <Route component={NotFound}/>

          </Switch>
        </Router>
    );
  }
}
