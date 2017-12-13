import { Meteor } from 'meteor/meteor';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {NoteListHeader} from './NoteListHeader';
import expect from 'expect';
Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient){
  describe("NoteListHeader",function(){
    it('should call notes-insert when button is clicked',function(){
      const spy = expect.createSpy();
      const wrapper = shallow(<NoteListHeader call={spy}/>);
      wrapper.find("button").simulate("click");
      expect(spy).toHaveBeenCalled();
    })
  });
}
