import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'

import Home from '../../../../src/client/containers/view/Home'
import HomeForm from '../../../../src/client/containers/form/HomeForm'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const store = configureStore([
  thunk,
])();

describe('<Home />', () => {
  it('renders without crashing', () => {
    // const wrapper = shallow(<Home store={store}/>).dive()
  })
  it('contains a home form', () => {
    // const wrapper = shallow(<Home />)
    //
    // expect(wrapper).to.contain(<HomeForm/>)
  })
})
