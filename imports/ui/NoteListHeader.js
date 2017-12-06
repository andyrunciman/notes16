import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

export const NoteListHeader = (props) => {
  return (
    <div>
      <button onClick={()=>{props.meteorCall('notes.insert')}}>Add Note</button>
    </div>
  );
};

NoteListHeader.propTypes = {
  meteorCall:PropTypes.object.isRequired
}

export default withTracker(()=>{
  return{
    meteorCall:Meteor.call
  }

})(NoteListHeader);
