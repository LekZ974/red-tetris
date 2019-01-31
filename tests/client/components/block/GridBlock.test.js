import React from 'react';
import GridBlock from '../../../../src/client/components/block/GridBlock';
import renderer from 'react-test-renderer';
import {expect} from "chai";
import {shallow} from "enzyme/build/index";

const props = {
  width: '1px',
  height: '1px',
}

describe('<GridBlock />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<GridBlock />)
  })
  it('GridBlock display', () => {
    const component = renderer.create(
      <GridBlock {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('GridBlock case 1', () => {
    const component = renderer.create(
      <GridBlock blockId={1} {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('GridBlock case 2', () => {
    const component = renderer.create(
      <GridBlock blockId={2} {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('GridBlock case 3', () => {
    const component = renderer.create(
      <GridBlock blockId={3} {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('GridBlock case 4', () => {
    const component = renderer.create(
      <GridBlock blockId={4} {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('GridBlock case 5', () => {
    const component = renderer.create(
      <GridBlock blockId={5} {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('GridBlock case 6', () => {
    const component = renderer.create(
      <GridBlock blockId={6} {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('GridBlock case 7', () => {
    const component = renderer.create(
      <GridBlock blockId={7} {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('GridBlock case 8', () => {
    const component = renderer.create(
      <GridBlock blockId={8} {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
  it('GridBlock case -1', () => {
    const component = renderer.create(
      <GridBlock blockId={-1} {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).to.matchSnapshot();
  });
})

