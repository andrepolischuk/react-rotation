import test from 'ava';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Rotation from './index';
const shallowRenderer = TestUtils.createRenderer();

shallowRenderer.render(
  <Rotation className='rotation'>
    <img src='0' />
    <img src='1' />
    <img src='2' />
  </Rotation>
);

const rotation = shallowRenderer.getRenderOutput();

test('should be a Rotation', t => {
  t.plan(8);
  t.true(rotation.props.className === 'rotation');
  t.true(rotation.props.children.length === 3);

  rotation.props.children.forEach((child, i) => {
    t.true(child.type === 'img');
    t.true(child.props.src === i.toString());
  });
});
