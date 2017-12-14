import { Meteor } from 'meteor/meteor';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import expect from 'expect';
Enzyme.configure({ adapter: new Adapter() });

import {NoteListHeader} from './NoteListHeader';
import {notes} from '../fixtures/fixtures';

if(Meteor.isClient){
  describe("NoteListHeader",function(){
    let call;
    let history;

    beforeEach(function(){
      call = expect.createSpy();
      history = {
        push:expect.createSpy(),
        replace:expect.createSpy()
      }
    });

    it('should insert a new note and set the history',function(){
      const wrapper = shallow(<NoteListHeader call={call} history={history}/>);
      wrapper.find("button").simulate("click")
      call.calls[0].arguments[1](undefined,notes[0]._id);
      expect(call.calls[0].arguments[0]).toBe('notes.insert');
      expect(history.replace).toHaveBeenCalledWith(`/dashboard/${notes[0]._id}`);
    });

    it('should not insert set history if update failed',function(){
      const wrapper = shallow(<NoteListHeader call={call} history={history}/>);
      wrapper.find("button").simulate("click")
      call.calls[0].arguments[1]({},undefined);
      expect(call.calls[0].arguments[0]).toBe('notes.insert');
      expect(history.replace).toNotHaveBeenCalled();
    });

  });
}
