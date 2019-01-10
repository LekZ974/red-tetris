import React from 'react';
import Card from '../../../../src/client/components/block/Card';
import renderer from 'react-test-renderer';
import { expect } from "chai";
import {shallow} from "enzyme/build/index";

describe('<Card />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Card />)
  })
  it('Box display', () => {
    const component = renderer.create(
      <Card>Hello</Card>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
