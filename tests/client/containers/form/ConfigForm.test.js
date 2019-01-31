import { expect } from 'chai'
import React from 'react'
import { shallow, mount } from 'enzyme'
import ConfigForm from '../../../../src/client/containers/form/ConfigForm'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { reduxForm } from 'redux-form'

jest.mock('react-dom')

const spy = jest.fn()
const initialStateValues = {
}
const Decorated = reduxForm({
  form: 'testForm', onSubmit: { spy }
})(ConfigForm)

const formFieldValuesMulti = {
  gameMode: 'MULTI',
}

const formFieldValuesSolo = {
  gameMode: 'SOLO',
  speed: 'HARD_MODE',
  addMalus: 'MALUS'
}

const mockStore = configureStore([
  thunk,
]);

describe('>>>>ConfigForm - REACT-REDUX (Shallow + passing the {store} directly Multi', () => {
  let wrapper;

  beforeEach(() => {
    const store = mockStore(initialStateValues)
    wrapper = shallow(
      <Decorated store={store}
        {...formFieldValuesMulti}
      />).dive()
  })
  it('renders without crashing', () => {
    expect(wrapper.length).to.equal(1)
  })
})
describe('>>>>ConfigForm - REACT-REDUX (Shallow + passing the {store} directly Solo', () => {
  let wrapper;

  beforeEach(() => {
    const store = mockStore(initialStateValues)
    wrapper = shallow(
      <Decorated store={store}
                 {...formFieldValuesSolo}
      />).dive()
  })
  it('renders without crashing', () => {
    expect(wrapper.length).to.equal(1)
  })
})
