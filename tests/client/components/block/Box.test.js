import React from 'react';
import Box from '../../../../src/client/components/block/Box';
import renderer from 'react-test-renderer';
import { expect } from "chai";
import {shallow} from "enzyme/build/index";

describe('<Box />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Box />)
  })
  it('Box display', () => {
    const component = renderer.create(
      <Box>Hello</Box>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
