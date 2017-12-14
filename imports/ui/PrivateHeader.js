import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';


export const PrivateHeader = (props) => {
  return(
    <div className="header">
      <div className="header__content">
        <i onClick={()=>{Session.set('toggleMenu',!Session.get('toggleMenu'))}} className="header__showmenu ion-navicon-round"></i>
        <h1 className="header__title">{props.title}</h1>
        <button className="btn btn--header" onClick={()=>{props.handleLogout()}}>Logout</button>
      </div>
    </div>
  );
};

export default withTracker(()=>{
  return{
    handleLogout:Meteor.logout
  }
})(PrivateHeader);
