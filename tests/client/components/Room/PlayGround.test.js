import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedPlayground, {PlayGround} from '../../../../src/client/components/Room/PlayGround'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([
  thunk,
]);

const game = {
  items: ['something', "an other thing"],
  start: true
}

const initialState = {
}


describe('>>>>PLAYGROUND - REACT-REDUX (Shallow + passing the {store} directly', () => {
  let wrapper;
  beforeEach(() => {
    const store = mockStore(initialState)
    wrapper = shallow(<ConnectedPlayground game={game} store={store}/>).dive()
  })
  it('renders without crashing', () => {
    expect(wrapper.length).to.equal(1)
  })
})
