import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Rotation from './index';

const rotation = shallow(
  <Rotation className='rotation'>
    <img src='0.jpg' alt='' />
    <img src='1.jpg' alt='' />
    <img src='2.jpg' alt='' />
  </Rotation>
);

test(t => {
  t.true(rotation.hasClass('rotation'));
  t.is(rotation.children().length, 3);

  rotation.children().forEach((child, i) => {
    t.is(child.type(), 'img');
    t.is(child.prop('src'), `${i}.jpg`);
  });
});
