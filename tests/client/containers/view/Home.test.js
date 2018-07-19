import { expect } from 'chai'
import React from 'react'
import { shallow, mount } from 'enzyme'
import ConnectedHome, {Home} from '../../../../src/client/containers/view/Home'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([
  thunk,
]);

const user = {
  userName: 'USERNAME',
  gameName: 'GAMENAME',
  role: 'RoleOfUser'
}
const games = {
  items: [],
  isLoading: false
}

const initialState = {
  user,
  games
}


describe('>>>>HOME - REACT-REDUX (Shallow + passing the {store} directly', () => {
  let wrapper;
  beforeEach(() => {
    const store = mockStore(initialState)
    wrapper = shallow(<ConnectedHome store={store}/>).dive()
  })
  it('renders without crashing', () => {
    expect(wrapper.length).to.equal(1)
  })
})
