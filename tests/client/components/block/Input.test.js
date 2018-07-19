import React from 'react';
import Input from '../../../../src/client/components/block/Input';
import Help from '../../../../src/client/components/block/Help';
import Box from '../../../../src/client/components/block/Box';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import { expect } from "chai";

describe('<Input />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Input />)
  })
  it('contains a box with Help text', () => {
    const wrapper = shallow(<Input help />)

    expect(wrapper).to.contain(<Help text={true} />)
  })
  it('Input display', () => {
    const component = renderer.create(
      <Input/>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('Input with border display', () => {
    const component = renderer.create(
      <Input borders color={'black'}/>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('Input with help display', () => {
    const component = renderer.create(
      <Input/>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
