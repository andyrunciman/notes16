import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {withTracker} from 'meteor/react-meteor-data'

export default NoteListItem = (props) => {
  //props.history.replace(`/dashboard/${props.note._id}`)
  //trying a callback as there is no need for this to
  //worry about routing...
  return(
    <div onClick={()=>{
        props.history.replace(`/dashboard/${props.note._id}`);
      }}>
      <h5>{props.note.title || "Untitled note"}</h5>
      {props.selectedNoteId===props.note._id?'selected':undefined}
      <p className="note-list-item__date">{moment(props.note.updatedAt).format('DD/MM/YY')}</p>
    </div>
  )
};

NoteListItem.propTypes = {
  note:PropTypes.object.isRequired
}
