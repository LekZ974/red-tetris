import React from 'react';
import Text from '../../../../src/client/components/block/Text';
import renderer from 'react-test-renderer';
import {expect} from "chai";
import {shallow} from "enzyme/build/index";

describe('<Text />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Text />)
  })
  it('Text display', () => {
    const component = renderer.create(
      <Text>Hello</Text>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('Text bold display', () => {
    const component = renderer.create(
      <Text bold>Hello</Text>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('Text regular display', () => {
    const component = renderer.create(
      <Text regular>Hello</Text>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('Text uppercase display', () => {
    const component = renderer.create(
      <Text caps>Hello</Text>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('Text italic display', () => {
    const component = renderer.create(
      <Text italic>Hello</Text>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('Text with wrong props display', () => {
    const component = renderer.create(
      <Text wrongprops>Hello</Text>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('Text with multiple props display', () => {
    const component = renderer.create(
      <Text italic bold caps regular>Hello</Text>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})

