import React from 'react';
import Help from '../../../../src/client/components/block/Help';
import renderer from 'react-test-renderer';
import { expect } from "chai";
import {shallow} from "enzyme/build/index";

describe('<Help />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Help />)
  })
  it('Box display', () => {
    const component = renderer.create(
      <Help>Hello</Help>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
