import React from 'react';

import Signup from './Signup';
import Login from './Login';

import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';


export default class App extends React.Component{
  render(){
    return(
        <Router>
          <Switch>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
          </Switch>

        </Router>
    );
  }
}
