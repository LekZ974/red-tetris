import React from 'react';
import Error from '../../../../src/client/components/block/Error';
import renderer from 'react-test-renderer';
import { expect } from "chai";
import {shallow} from "enzyme/build/index";

describe('<Error />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Error />)
  })
  it('Box display', () => {
    const component = renderer.create(
      <Error>Hello</Error>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
