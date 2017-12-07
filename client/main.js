import React from 'react';
import ReactDOM from 'react-dom';
import App from '../imports/ui/App';
import {Session} from 'meteor/session';

Meteor.startup(()=>{
  Session.set('selectedNoteId',undefined)
  ReactDOM.render(<App/>,document.getElementById("app"));
});
