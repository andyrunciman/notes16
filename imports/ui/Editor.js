import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Notes} from '../api/notes';

export class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title:'',
      body:''
    }
  }
  componentDidUpdate(prevProps,prevState){
    const currentNoteId = this.props.note ? this.props.note._id: undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId){
      this.setState({
        body:this.props.note.body,
        title:this.props.note.title
      });
    }

  }

  handleBodyChange(e){
    this.setState({body:e.target.value});
    this.props.call('notes.update',this.props.selectedNoteId,{
      body:e.target.value
    });
  }
  handleTitleChange(e){
    this.setState({title:e.target.value});
    this.props.call('notes.update',this.props.selectedNoteId,{
      title:e.target.value
    });
  }
  handleDeleteNote(e){
    this.props.call('notes.remove',this.props.selectedNoteId);
    this.props.history.replace(`/dashboard`);
  }
  render(){
    if(this.props.note){
      return(
        <div>
          <input  type="text"
                  value={this.state.title}
                  placeholder="Untitled"
                  onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.state.body}
                    placeholder="Your note here"
                    onChange={this.handleBodyChange.bind(this)}>
          </textarea>
          <button onClick={this.handleDeleteNote.bind(this)}>Delete Note</button>
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
