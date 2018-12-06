import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedGrid, {Grid} from '../../../../src/client/components/Room/Grid'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([
  thunk,
]);

const game = {
  items: ['something', "an other thing"],
  start: true
}

const tetrimino = {
  pieceInfo: "a piece"
}

const user = {
  role: 'a role',
  name: 'A name',
  grid: [],
}

const initialState = {
  game,
  tetrimino,
  user
}


describe('>>>>GRID - REACT-REDUX (Shallow + passing the {store} directly', () => {
  let wrapper;
  beforeEach(() => {
    const store = mockStore(initialState)
    wrapper = shallow(<Grid store={store}/>)
  })
  it('renders without crashing', () => {
    expect(wrapper.length).to.equal(1)
  })
})
