import { Meteor } from 'meteor/meteor';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {Signup} from './Signup';
import expect from 'expect';
Enzyme.configure({ adapter: new Adapter() });

describe("Signup",function(){
  it('should show error messages',function(){
    const error = "this is not working";
    const wrapper = shallow(<Signup createUser={()=>{}}/>);
    wrapper.setState({error});
    expect(wrapper.find('p').text()).toBe(error);

  });
  it('should call createUser with the form data',function(){
    const email = "ap@me.com";
    const password ="password123";
    const spy = expect.createSpy();
    const wrapper = shallow(<Signup createUser={spy}/>);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.email = {value:email}
    wrapperInstance.password = {value:password}
    const stub = {
      preventDefault:()=>{return}
    }
    wrapper.find('form').simulate('submit',stub);
    //expect(spy.calls[0].arguments[0].email).toBe(email);
    expect(spy.calls[0].arguments[0]).toEqual({email,password});
  });

  it('should set the createUser callback errors',function(){
    const email = "ap@me.com";
    const password ="password123";

    const spy = expect.createSpy();

    const wrapper = shallow(<Signup createUser={spy}/>);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.email = {value:email}
    wrapperInstance.password = {value:password}

    const stub = {
      preventDefault:()=>{return}
    }
    wrapper.find('form').simulate('submit',stub);
    spy.calls[0].arguments[1]({reason:"boom"});
    expect(wrapper.state('error')).toBe("boom");

    wrapper.find('form').simulate('submit',stub);
    spy.calls[1].arguments[1]();
    expect(wrapper.state('error')).toBe("");

  });

})
