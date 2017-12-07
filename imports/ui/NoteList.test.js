import { Meteor } from 'meteor/meteor';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {NoteList} from './NoteList';
import expect from 'expect';
Enzyme.configure({ adapter: new Adapter() });
import {notes} from '../fixtures/fixtures';


if(Meteor.isClient){
  describe("NoteList",function(){
    it('should render NoteListItem for each note',function(){
      const wrapper = shallow(<NoteList notes={notes}/>);
      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });
    it('should render NoteListEmptyItem if no notes',function(){
      const wrapper = shallow(<NoteList notes={[]}/>);
      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });
}
