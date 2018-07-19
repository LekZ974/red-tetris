import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import PlayGround from '../../../../src/client/components/Room/PlayGround'

describe('>>>>PLAYGROUND', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<PlayGround/>)
  })
  it('PlayGround display', () => {
    const component = renderer.create(
      <PlayGround/>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
