import React from 'react';
import LoadingContainer from '../../../../src/client/components/block/LoadingContainer';
import renderer from 'react-test-renderer';
import { expect } from "chai";
import {shallow} from "enzyme";

describe('>>>>LOADINGCONTAINER', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LoadingContainer />)
  })
  it('LoadingContainer display', () => {
    const component = renderer.create(
      <LoadingContainer>Hello</LoadingContainer>,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})
