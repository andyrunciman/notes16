import { Meteor } from 'meteor/meteor';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NoteListItem from './NoteListItem';
import expect from 'expect';
Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient){
  describe("NotesListItem",function(){

    const note = {
      title:'',
      body:'some text',
      updatedAt:1512562003393,
    }

    it("should display untitled note if none supplied",function(){
      const wrapper = shallow(<NoteListItem note={note}/>);
      expect(wrapper.find('h5').text()).toBe("Untitled note");
    });
    it("should format the date in dd/mm/yy format",function(){
      const wrapper = shallow(<NoteListItem note={note}/>);
      expect(wrapper.find('.note-list-item__date').text()).toBe("06/12/17");
    });
  });
}
