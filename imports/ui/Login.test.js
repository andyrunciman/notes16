import { Meteor } from 'meteor/meteor';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {Login} from './Login';
import expect from 'expect';
Enzyme.configure({ adapter: new Adapter() });

describe("Login",function(){
  it('should display error message if no password provided',function(){
    const email = "ap@me.com";
    const password ="password123"
    const spy = expect.createSpy();
    const wrapper = shallow(<Login loginWithPassword={spy}/>);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.email = {value:email}
    wrapperInstance.password = {value:password}
    const stub = {
      preventDefault:()=>{return}
    }
    wrapper.find('form').simulate('submit',stub);
    expect(spy).toHaveBeenCalled();

  });
  it('should show error messages',function(){
    const error = "this is not working";
    const wrapper = shallow(<Login loginWithPassword={()=>{}}/>);
    wrapper.setState({error});
    expect(wrapper.find('p').text()).toBe(error);

  });
  it('should call loginWithPassword with the form data',function(){
    const email = "ap@me.com";
    const password ="password123";
    const spy = expect.createSpy();
    const wrapper = shallow(<Login loginWithPassword={spy}/>);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.email = {value:email}
    wrapperInstance.password = {value:password}
    const stub = {
      preventDefault:()=>{return}
    }
    wrapper.find('form').simulate('submit',stub);
    //expect(spy.calls[0].arguments[0].email).toBe(email);
    expect(spy.calls[0].arguments[0]).toEqual({email});
    expect(spy.calls[0].arguments[1]).toBe(password);
  });

  it('should set the loginWithPassword callback errors',function(){
    const email = "ap@me.com";
    const password ="password123";
    const spy = expect.createSpy();
    const wrapper = shallow(<Login loginWithPassword={spy}/>);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.email = {value:email}
    wrapperInstance.password = {value:password}
    const stub = {
      preventDefault:()=>{return}
    }
    wrapper.find('form').simulate('submit',stub);
    //expect(spy.calls[0].arguments[0].email).toBe(email);
    spy.calls[0].arguments[2]({reason:"boom"});

    expect(wrapper.state('error')).toBe("boom");

  });

});
