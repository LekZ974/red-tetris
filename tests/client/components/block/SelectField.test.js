import React from 'react';
import SelectField from '../../../../src/client/components/block/SelectField';
import renderer from 'react-test-renderer';
import {expect} from "chai";
import {shallow} from "enzyme/build/index";


const input = {
  name: 'toto',
  value: 'A TOTO VALUE'
}

describe('<SelectField />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SelectField input/>)
  })
  it('SelectField display', () => {
    const component = renderer.create(
      <SelectField input>Hello</SelectField>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})

