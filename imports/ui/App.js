import React from 'react';

import Signup from './Signup';
import Login from './Login';
import NoteList from './NoteList';

import PrivateHeader from './PrivateHeader';

import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';


export default class App extends React.Component{
  render(){
    return(
        <Router>
          <Switch>
            <Route exact path="/" render={()=><PrivateHeader title="Notes"/>}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/note" component={NoteList}/>
          </Switch>
        </Router>
    );
  }
}
