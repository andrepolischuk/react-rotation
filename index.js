import React from 'react';
import {render} from 'react-dom';
import Rotation from 'react-rotation';
import Indicator from './components/indicator';
import store from './components/store';

render(
  <div>
    <Rotation cycle={true} onChange={store.emit.bind(store, 'change')}>
      <img src='images/00.jpg' />
      <img src='images/01.jpg' />
      <img src='images/02.jpg' />
      <img src='images/03.jpg' />
      <img src='images/04.jpg' />
      <img src='images/05.jpg' />
      <img src='images/06.jpg' />
      <img src='images/07.jpg' />
      <img src='images/08.jpg' />
      <img src='images/09.jpg' />
      <img src='images/10.jpg' />
      <img src='images/11.jpg' />
      <img src='images/12.jpg' />
      <img src='images/13.jpg' />
      <img src='images/14.jpg' />
      <img src='images/15.jpg' />
    </Rotation>
    <Indicator />
  </div>,
  document.querySelector('.rotation')
);
