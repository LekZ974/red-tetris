import React from 'react';
import Link from '../../../../src/client/components/block/Link';
import renderer from 'react-test-renderer';
import {expect} from "chai";
import {shallow} from "enzyme/build/index";

describe('<Link />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Link />)
  })
  it('Link is display', () => {
    const component = renderer.create(
      <Link page="http://www.facebook.com">Facebook</Link>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})


