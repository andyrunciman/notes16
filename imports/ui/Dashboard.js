import React from 'react';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default class Dashboard extends React.Component{

  constructor(props){
    super(props);
    this.selectedNoteId = undefined; //should this be a state variable?
  }
  componentWillMount(){
    //OK to set the state as it doesnt cause a re-render
    //if we have an id keep hold of it
    if(this.props.match.params.id){
      this.selectedNoteId = this.props.match.params.id;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      if(nextProps.match.params.id){
        this.selectedNoteId = nextProps.match.params.id;
      }
    }
  }

  handleSelectedNote(selectedNoteId){
    this.props.history.replace(`/dashboard/${selectedNoteId}`)
  }

  render(){
    return(
      <div>
        <PrivateHeader title="Notes App"/>
        <NoteList selectedNoteId={this.selectedNoteId} handleSelectedNote={this.handleSelectedNote.bind(this)}/>
        <Editor selectedNoteId={this.selectedNoteId}/>
      </div>
    )
  }
}
