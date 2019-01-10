import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedRoomInfo, {RoomInfo} from '../../../../src/client/components/Room/RoomInfo'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([
  thunk,
]);

const game = {
  items: ['something', "an other thing"],
  start: true
}

const user = {
  userName: "USER",
  gameName: "GAME"
}

const initialState = {
  game
}


describe('>>>>PLAYGROUND - REACT-REDUX (Shallow + passing the {store} directly', () => {
  let wrapper;
  beforeEach(() => {
    const store = mockStore(initialState)
    wrapper = shallow(<ConnectedRoomInfo user={user} game={game} store={store}/>)
  })
  it('renders without crashing', () => {
    expect(wrapper.length).to.equal(1)
  })
})
