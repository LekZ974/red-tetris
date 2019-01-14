import React from 'react';
import Modal from '../../../../src/client/components/block/Modal';
import renderer from 'react-test-renderer';
import { expect } from "chai";
import {shallow} from "enzyme/build/index";

describe('<Modal />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Modal />)
  })
  it('Modal display', () => {
    const component = renderer.create(
      <Modal open={true} onClose={false}>Hello</Modal>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
