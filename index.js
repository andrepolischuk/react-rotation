import Indicator from './components/indicator';
import React from 'react';
import Rotation from 'react-rotation';
import store from './components/store';

const data = [
  'images/00.jpg',
  'images/01.jpg',
  'images/02.jpg',
  'images/03.jpg',
  'images/04.jpg',
  'images/05.jpg',
  'images/06.jpg',
  'images/07.jpg',
  'images/08.jpg',
  'images/09.jpg',
  'images/10.jpg',
  'images/11.jpg',
  'images/12.jpg',
  'images/13.jpg',
  'images/14.jpg',
  'images/15.jpg'
];

React.render(
  <div>
    <Rotation
      cycle={true}
      data={data}
      onChange={store.emit.bind(store, 'change')}
    />
    <Indicator />
  </div>,
  document.querySelector('.rotation')
);
