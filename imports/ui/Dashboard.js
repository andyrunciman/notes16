import React from 'react';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default class Dashboard extends React.Component{

  constructor(props){
    super(props);
    this.selectedNoteId = this.props.match.params.id || undefined; //should this be a state variable?
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      if(nextProps.match.params.id){
        this.selectedNoteId = nextProps.match.params.id;
      }
    }
  }

  // handleSelectedNote(selectedNoteId){
  //   this.props.history.replace(`/dashboard/${selectedNoteId}`)
  // }

  render(){
    return(
      <div>
        <PrivateHeader title="Notes App"/>
        <NoteList selectedNoteId={this.selectedNoteId} history={this.props.history}/>
        <Editor selectedNoteId={this.selectedNoteId} history={this.props.history}/>
      </div>
    )
  }
}
