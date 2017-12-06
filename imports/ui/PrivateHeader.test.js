import { Meteor } from 'meteor/meteor';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {PrivateHeader} from './PrivateHeader';
import expect from 'expect';
Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient){
  describe('Private Header',function(){
    it('should set button text to logout',function(){
      const wrapper = shallow(<PrivateHeader title="Notes" handleLogout={()=>{}}/>);
      expect(wrapper.find('button').text()).toBe("Logout");
    });
    it('should call the logout function',function(){
      const spy = expect.createSpy();
      const wrapper = shallow(<PrivateHeader title="Notes" handleLogout={spy}/>);
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
}
