import React from 'react';
import Text from '../../../../src/client/components/block/Text';
import renderer from 'react-test-renderer';

test('Text display', () => {
  const component = renderer.create(
    <Text>Hello</Text>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Text bold display', () => {
  const component = renderer.create(
    <Text bold>Hello</Text>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Text regular display', () => {
  const component = renderer.create(
    <Text regular>Hello</Text>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Text uppercase display', () => {
  const component = renderer.create(
    <Text caps>Hello</Text>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Text italic display', () => {
  const component = renderer.create(
    <Text italic>Hello</Text>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Text with wrong props display', () => {
  const component = renderer.create(
    <Text wrongprops>Hello</Text>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Text with multiple props display', () => {
  const component = renderer.create(
    <Text italic bold caps regular>Hello</Text>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
