import React from 'react';
import App from './App';

import Enzyme,{shallow, mount, render} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe('Test the App component',()=>{
  test('Ensure the container is rendered',()=>{
    expect(shallow(<App/>).find('div').text()).toBe('Setup complete!');
  });
});
