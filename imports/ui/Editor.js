import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Notes} from '../api/notes';

export class Editor extends React.Component{
  handleBodyChange(e){
    this.props.call('notes.update',this.props.selectedNoteId,{
      body:e.target.value
    });
  }
  handleTitleChange(e){
    this.props.call('notes.update',this.props.selectedNoteId,{
      title:e.target.value
    });
  }
  render(){
    if(this.props.note){
      return(
        <div>
          <input  type="text"
                  value={this.props.note.title}
                  placeholder="Untitled"
                  onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.props.note.body}
                    placeholder="Your note here"
                    onChange={this.handleBodyChange.bind(this)}>
          </textarea>
          <button>Delete Note</button>
        </div>
      );
    }else{
      return(
        <p>{this.props.selectedNoteId ? 'Note not found':'Pick or create a note to get started'}</p>
      );
    }
  }
}

export default withTracker((props)=>{
  Meteor.subscribe('notes');
  return{
    note:Notes.findOne(props.selectedNoteId),
    call:Meteor.call
  }
})(Editor);
