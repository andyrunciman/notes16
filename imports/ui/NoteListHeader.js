import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

export const NoteListHeader = (props) => {
  return (
    <div>
      <button onClick={()=>{
        props.call('notes.insert',(err,res) => {
          if(res){
            props.history.replace(`/dashboard/${res}`);
          };

        });
        }}>Add Note</button>
    </div>
  );
};

NoteListHeader.propTypes = {
  call:PropTypes.func.isRequired
}

export default withTracker(()=>{
  return{
    call:Meteor.call
  }

})(NoteListHeader);
