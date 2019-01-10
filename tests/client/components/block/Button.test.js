import React from 'react';
import Button from '../../../../src/client/components/block/Button';
import renderer from 'react-test-renderer';
import { expect } from "chai";
import {shallow} from "enzyme/build/index";

describe('<Button />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Button />)
  })
  it('Button display', () => {
    const component = renderer.create(
      <Button>Hello</Button>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
