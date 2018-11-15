import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import ConnectedHome, {Home} from '../../../../src/client/containers/view/Home'
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
const games = {
  items: [
    {
      id: 1,
      name: 'Game1'
    },
    {
      id: 2,
      name: 'Game2'
    },
  ],
  isLoading: false
}
const form = {
  HomeForm: "A form"
}

const initialState = {
  user,
  games,
  form,
}


describe('>>>>HOME - REACT-REDUX (Shallow + passing the {store} directly', () => {
  let wrapper;
  beforeEach(() => {
    const store = mockStore(initialState)
    wrapper = shallow(<ConnectedHome store={store}/>)
  })
  it('renders without crashing', () => {
    expect(wrapper.length).to.equal(1)
  })
})
