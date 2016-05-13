import test from 'ava';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Rotation from './index.es5';
const shallowRenderer = TestUtils.createRenderer();

shallowRenderer.render(
  <Rotation className='rotation'>
    <img src='0.jpg' />
    <img src='1.jpg' />
    <img src='2.jpg' />
  </Rotation>
);

const rotation = shallowRenderer.getRenderOutput();

test(t => {
  t.true(rotation.props.className === 'rotation');
  t.true(rotation.props.children.length === 3);

  rotation.props.children.forEach((child, i) => {
    t.true(child.type === 'img');
    t.true(child.props.src === `${i}.jpg`.toString());
  });
});
