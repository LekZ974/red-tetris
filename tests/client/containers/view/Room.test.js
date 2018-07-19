import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedRoom, {Room} from '../../../../src/client/containers/view/Room'
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

const initialState = {
  user,
}


describe('>>>>ROOM - REACT-REDUX (Shallow + passing the {store} directly', () => {
  let wrapper;
  beforeEach(() => {
    const store = mockStore(initialState)
    const match = {
      path:'/path',
      params: {
        name: 'a name'
      }
    }
    wrapper = shallow(<ConnectedRoom store={store} match={match} />).dive()
  })
  it('renders without crashing', () => {
    expect(wrapper.length).to.equal(1)
  })
})
