import React from 'react';
import Link from '../../../../src/client/components/block/Link';
import renderer from 'react-test-renderer';

test('Link is display', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
