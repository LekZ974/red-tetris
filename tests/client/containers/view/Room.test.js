import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'

import Room from '../../../../src/client/containers/view/Room'

describe('<Room />', () => {
  it('renders without crashing', () => {
    const match = {
      path:'/path',
      params: {
        name: 'a name'
      }
    }
    const wrapper = shallow(<Room match />)
  })
})
