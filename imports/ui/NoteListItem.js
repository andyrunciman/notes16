import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const NoteListItem = ({note}) => {
  return(
    <div>
      <h5>{note.title || "Untitled note"}</h5>
      <p>{note.body}</p>
      <p className="note-list-item__date">{moment(note.updatedAt).format('DD/MM/YY')}</p>
    </div>
  )
};

NoteListItem.propTypes = {
  note:PropTypes.object.isRequired
}

export default NoteListItem
