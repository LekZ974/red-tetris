import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../../src/client/containers/view/Home';
import Room from '../../../src/client/containers/view/Room';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../../../src/client/containers/app';

const store = configureStore([
  thunk,
])();

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App store={store}/>).dive()
  })
})
