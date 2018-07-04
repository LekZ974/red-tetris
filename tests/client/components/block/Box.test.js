import React from 'react';
import Box from '../../../../src/client/components/block/Box';
import renderer from 'react-test-renderer';

test('Box display', () => {
  const component = renderer.create(
    <Box>Hello</Box>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
