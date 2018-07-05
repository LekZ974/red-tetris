import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'

import Home from '../../../../src/client/containers/view/Home'
import HomeForm from '../../../../src/client/containers/form/HomeForm'

describe('<Home />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Home />)
  })
  it('contains a home form', () => {
    const wrapper = shallow(<Home />)

    expect(wrapper).to.contain(<HomeForm/>)
  })
})
