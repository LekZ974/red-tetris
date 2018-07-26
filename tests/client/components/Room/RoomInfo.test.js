import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import RoomInfo from '../../../../src/client/components/Room/RoomInfo'

describe('>>>>ROOMINFO', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RoomInfo/>)
  })
  it('RoomInfo display', () => {
    const component = renderer.create(
      <RoomInfo/>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
