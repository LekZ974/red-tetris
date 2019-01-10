import { expect } from 'chai'
import React from 'react'
import { shallow, mount } from 'enzyme'
import HomeForm from '../../../../src/client/containers/form/HomeForm'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { reduxForm } from 'redux-form'

jest.mock('react-dom')

const spy = jest.fn()
const initialStateValues = {
}
const Decorated = reduxForm({
  form: 'testForm', onSubmit: { spy }
})(HomeForm)

const formFieldValues = {
  userName: 'Toto',
  gameName: 'GameDeToto'
}

const mockStore = configureStore([
  thunk,
]);

describe('>>>>HOMEFORM - REACT-REDUX (Shallow + passing the {store} directly', () => {
  let wrapper;

  beforeEach(() => {
    const store = mockStore(initialStateValues)
    wrapper = shallow(
      <Decorated store={store}
        {...formFieldValues}
      />).dive()
  })
  it('renders without crashing', () => {
    expect(wrapper.length).to.equal(1)
  })
})
