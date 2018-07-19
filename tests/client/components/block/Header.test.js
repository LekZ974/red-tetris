import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../../../src/client/components/block/Header'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([
  thunk,
]);

const user = {
  userName: 'USERNAME',
  gameName: 'GAMENAME',
  role: 'RoleOfUser',
}

const history = {
  location: {
    pathname: "A/PATH/NAME"
  }
}

const initialState = {
  user,
  history
}


describe('>>>>HEADER - REACT-REDUX (Shallow + passing the {store} directly', () => {
  let wrapper;
  beforeEach(() => {
    const store = mockStore(initialState)
    wrapper = shallow(<Header store={store}/>)
  })
  it('renders without crashing', () => {
    expect(wrapper.length).to.equal(1)
  })
})
