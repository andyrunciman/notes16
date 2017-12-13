import { Meteor } from 'meteor/meteor';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import expect from 'expect';
Enzyme.configure({ adapter: new Adapter() });

import {Editor} from './Editor';
import {notes} from '../fixtures/fixtures';

if(Meteor.isClient){
  describe("Editor",function(){
    let history;
    let call;
    beforeEach(function(){
      call = expect.createSpy();
      history = {replace:expect.createSpy()}
    });

    it('should display note not found if there is no note but there is a note id',function(){
      const wrapper = shallow(<Editor history={history} call={call} selectedNoteId={"abcd"}/>);
      expect(wrapper.find('p').text()).toBe("Note not found");
    });

    it('should display select a note to get started if no note amd no id',function(){
      const wrapper = shallow(<Editor history={history} call={call}/>);
      expect(wrapper.find('p').text()).toBe("Pick or create a note to get started");
    });

    it('should remove note',function(){
      const wrapper = shallow(<Editor history={history} call={call} note={notes[0]} selectedNoteId={notes[0]._id}/>);
      wrapper.find("button").simulate('click');
      expect(call).toHaveBeenCalledWith('notes.remove',notes[0]._id);
      expect(history.replace).toHaveBeenCalledWith('/dashboard');

    });

    it('should update the note body on text area changed',function(){
      const newBody = "This is the new body text";
      const wrapper = shallow(<Editor history={history} call={call} note={notes[0]} selectedNoteId={notes[0]._id}/>);
      wrapper.find("textarea").simulate('change',{
        target:{
          value:newBody
        }
      });
      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update',notes[0]._id,{body:newBody});
    });

    it('should set state for a new note',function(){
      const wrapper = shallow(<Editor history={history} call={call}/>);
      wrapper.setProps({
        selectedNoteId:notes[0]._id,
        note:notes[0]
      });
      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);

    });

    it('should note set state if note prop not provided',function(){
      const wrapper = shallow(<Editor history={history} call={call}/>);
      wrapper.setProps({
        selectedNoteId:notes[0]._id,
      });
      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');

    });


  });
}
