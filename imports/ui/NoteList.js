import React from 'react';
import {Session} from 'meteor/session';

import {withTracker} from 'meteor/react-meteor-data';
import {Notes} from '../api/notes';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {
  return(
    <div className="note-list">
      <NoteListHeader history={props.history}/>
        {props.notes.length===0?<NoteListEmptyItem/>:undefined}

        {props.notes.map((note)=>{
          return(
            <NoteListItem key={note._id} note={note} selectedNoteId={props.selectedNoteId} history={props.history}/>
          )})
        }
    </div>
  );
};

NoteList.propTypes = {
  notes:PropTypes.array.isRequired
};
export default withTracker(()=>{
  Meteor.subscribe('notes');
  return{
    notes:Notes.find({},{sort:{updatedAt:-1}}).fetch()
  }
})(NoteList);
